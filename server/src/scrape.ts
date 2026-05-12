import 'dotenv/config';
import * as cheerio from 'cheerio';
import { db } from './db';
import { avisionProducts } from './db/schema';
import { eq } from 'drizzle-orm';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const DELAY_MS = 800;

const CATEGORY_URLS = [
  'https://www.avision.com/en/product-category/document-scanner/',
  'https://www.avision.com/en/product-category/flatbed-scanner/',
  'https://www.avision.com/en/product-category/network-scanner/',
  'https://www.avision.com/en/product-category/mobile-scanner/',
  'https://www.avision.com/en/product-category/paperair-series/',
  'https://www.avision.com/en/product-category/printer-mfp/',
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature    { title: string; description: string; }
interface DriverItem { name: string; version?: string; size?: string; os?: string; url: string; }
interface DownloadFile { language?: string; resolution?: string; size?: string; url: string; }

interface Downloads {
  drivers:       DriverItem[];
  manuals:       DownloadFile[];
  brochures:     DownloadFile[];
  quickGuides:   DownloadFile[];
  productPhotos: DownloadFile[];
  software:      DriverItem[];
}

interface SupplyItem { name: string; description: string; url: string; }
interface FaqItem    { title: string; steps: string[]; }

interface ProductData {
  model:       string;
  tagline:     string | null;
  description: string | null;
  category:    string;
  series:      string;
  url:         string;
  imageUrl:    string | null;
  scrapedAt:   Date;
  features:    Feature[];
  specs:       Record<string, string>;
  downloads:   Downloads;
  supplies:    SupplyItem[];
  faq:         FaqItem[];
}

// ─── Network helpers ──────────────────────────────────────────────────────────

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) { console.error(`  ✗ HTTP ${res.status}: ${url}`); return null; }
    return await res.text();
  } catch (err) {
    console.error(`  ✗ Fetch error ${url}:`, String(err));
    return null;
  }
}

function normalizeUrl(raw: string, base: string): string {
  if (!raw || /^(javascript|mailto|tel):/i.test(raw) || raw.startsWith('#')) return '';
  try {
    const u = new URL(raw, base);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return '';
    let path = u.pathname;
    if (!path.endsWith('/')) path += '/';
    return `${u.origin}${path}`;
  } catch { return ''; }
}

function isProductUrl(url: string): boolean {
  return /\/en\/shop\/[^/]+\/[^/]+\/[^/]+\/?$/.test(new URL(url).pathname);
}

function isSeriesUrl(url: string, categoryUrl: string): boolean {
  const catPath = new URL(categoryUrl).pathname;
  const urlPath = new URL(url).pathname;
  return (
    urlPath.startsWith(catPath) &&
    urlPath !== catPath &&
    !urlPath.includes('/en/shop/') &&
    urlPath.split('/').filter(Boolean).length > catPath.split('/').filter(Boolean).length
  );
}

// ─── Discovery ────────────────────────────────────────────────────────────────

async function discoverProductUrls(): Promise<Set<string>> {
  const productUrls = new Set<string>();

  for (const categoryUrl of CATEGORY_URLS) {
    console.log(`\nCategory: ${categoryUrl}`);
    const html = await fetchHtml(categoryUrl);
    if (!html) continue;
    await sleep(DELAY_MS);

    const $ = cheerio.load(html);
    const seriesLinks = new Set<string>();

    $('a[href]').each((_, el) => {
      const raw = $(el).attr('href') ?? '';
      const abs = normalizeUrl(raw, categoryUrl);
      if (!abs) return;
      if (isProductUrl(abs))                  productUrls.add(abs);
      else if (isSeriesUrl(abs, categoryUrl)) seriesLinks.add(abs);
    });

    console.log(`  ${seriesLinks.size} series, ${productUrls.size} direct products so far`);

    for (const seriesUrl of seriesLinks) {
      const seriesHtml = await fetchHtml(seriesUrl);
      if (!seriesHtml) continue;
      await sleep(DELAY_MS);

      const $s = cheerio.load(seriesHtml);
      let found = 0;
      $s('a[href]').each((_, el) => {
        const raw = $s(el).attr('href') ?? '';
        const abs = normalizeUrl(raw, seriesUrl);
        if (abs && isProductUrl(abs)) { productUrls.add(abs); found++; }
      });
      console.log(`  Series ${seriesUrl.split('/').slice(-2, -1)[0]}: ${found} products`);
    }
  }

  return productUrls;
}

// ─── Section parsers ──────────────────────────────────────────────────────────

// Breadcrumb lives in <nav class="woocommerce-breadcrumb">
// Structure: Home / DocumentScanner / AD7100 Series / AD7100 (plain text, not linked)
function parseBreadcrumbs(
  $: cheerio.CheerioAPI,
  url: string,
): { category: string; series: string } {
  const links = $('nav.woocommerce-breadcrumb a')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(t => t && !/^home$/i.test(t));

  let category = links[links.length - 2] ?? '';
  let series   = links[links.length - 1] ?? '';

  if (!category || !series) {
    const parts = new URL(url).pathname.split('/').filter(Boolean);
    // ['en','shop','document-scanner','ad7100-series','ad7100-2']
    const slug = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    if (!category && parts[2]) category = slug(parts[2]);
    if (!series   && parts[3]) series   = slug(parts[3]);
  }

  return { category, series };
}

// Tagline + description live in .woocommerce-product-details__short-description
// <h3><span>Tagline</span></h3>  <p>Description text</p>
function parseTaglineAndDescription($: cheerio.CheerioAPI): {
  tagline: string | null;
  description: string | null;
} {
  const container = $('.woocommerce-product-details__short-description');
  if (!container.length) return { tagline: null, description: null };

  const tagline = container.find('h3').first().text().trim() || null;
  const description =
    container.find('p')
      .map((_, el) => $(el).text().replace(/ /g, ' ').trim())
      .get()
      .filter(Boolean)
      .join('\n\n') || null;

  return { tagline, description };
}

// Main product image has class wp-post-image
function parseImageUrl($: cheerio.CheerioAPI): string | null {
  return $('img.wp-post-image').first().attr('src') ?? null;
}

// Features live in #tab-description as <h3><span>▍Title</span></h3><p>desc</p>
function parseFeatures($: cheerio.CheerioAPI): Feature[] {
  const features: Feature[] = [];
  const tab = $('#tab-description');
  if (!tab.length) return features;

  const seen = new Set<string>();

  tab.find('h3').each((_, el) => {
    const text = $(el).text().trim();
    if (!text.includes('▍')) return;

    const title = text.replace('▍', '').trim();
    if (!title || seen.has(title)) return;
    seen.add(title);

    const descParts: string[] = [];
    $(el).nextAll().each((_, sib) => {
      // Stop at the next feature heading, section break, or horizontal rule
      if ($(sib).is('h3') && $(sib).text().includes('▍')) return false;
      if ($(sib).is('h2, hr')) return false;

      if ($(sib).is('p')) {
        const t = $(sib).text().replace(/ /g, ' ').trim();
        if (t) descParts.push(t);
      }
      if ($(sib).is('ul, ol')) {
        const items = $(sib).find('li').map((_, li) => $(li).text().trim()).get().filter(Boolean);
        if (items.length) descParts.push(items.join('; '));
      }
    });

    features.push({ title, description: descParts.join(' ') });
  });

  return features;
}

// Spec table is in #tab-additional_information
// Data rows: <th>key</th><td>value</td>
// Sub-header rows: <td colspan="2">Section Name</td>  (single cell)
function parseSpecs($: cheerio.CheerioAPI): Record<string, string> {
  const specs: Record<string, string> = {};
  const table = $('#tab-additional_information table').first();
  if (!table.length) return specs;

  let section = '';
  table.find('tr').each((_, row) => {
    const cells = $(row).find('th, td');
    if (!cells.length) return;

    if (cells.length === 1) {
      // colspan sub-header row — capture for prefixing
      section = cells.eq(0).text().trim();
      return;
    }

    const key = cells.eq(0).text().trim();
    const val = cells.eq(1).text().replace(/\s+/g, ' ').trim();
    if (!key || key === val) return;

    specs[section ? `${section} / ${key}` : key] = val;
  });

  return specs;
}

// ─── Download table parsers ───────────────────────────────────────────────────

// Download sections: each H2 with ▎ is inside a <div>, table is in a sibling <div>
// Structure: <div><H2>▎Section</H2></div> ... <div><table>...</table></div>
function findDownloadTable($: cheerio.CheerioAPI, heading: any): cheerio.Cheerio<any> {
  const parentDiv = $(heading).parent();
  let result = $();

  parentDiv.nextAll().each((_, sib) => {
    if (result.length) return false;
    // Stop at the next ▎ heading section
    if ($(sib).find('h2, H2').filter((__, h) => $(h).text().includes('▎')).length) return false;
    const t = $(sib).find('table').first();
    if (t.length) result = t;
  });

  return result;
}

// Product Photos table is TRANSPOSED: one column per photo
// Row 1: image preview (rowspan)
// Row 2: <th> resolution labels  (High / Medium / Low)
// Row 3: <td> file sizes
// Row 4: <td> download links
function parsePhotosTable($: cheerio.CheerioAPI, table: cheerio.Cheerio<any>): DownloadFile[] {
  const items: DownloadFile[] = [];
  const rows = table.find('tr').toArray();

  const headerIdx = rows.findIndex(r => $(r).find('th').length > 0);
  if (headerIdx < 0) return items;

  const headers = $(rows[headerIdx]).find('th').map((_, th) => $(th).text().trim()).get();
  const sizeRow = rows[headerIdx + 1];
  const linkRow = rows[headerIdx + 2];
  if (!linkRow) return items;

  const sizes  = $(sizeRow).find('td').map((_, td) => $(td).text().trim()).get();
  const hrefs: string[] = [];
  $(linkRow).find('td').each((_, td) => {
    hrefs.push(($(td).find('a[href*="dropbox"]').attr('href') ?? '').trim());
  });

  for (let i = 0; i < headers.length; i++) {
    if (!hrefs[i]) continue;
    const item: DownloadFile = { resolution: headers[i], url: hrefs[i] };
    if (sizes[i] && /\d/.test(sizes[i])) item.size = sizes[i];
    items.push(item);
  }

  return items;
}

// Standard 3-column download table: Version/Language | Size | Link
function parseFileTable($: cheerio.CheerioAPI, table: cheerio.Cheerio<any>) {
  const items: { label: string; size?: string; url: string }[] = [];
  const rows = table.find('tr').toArray();
  const skip = $(rows[0])?.find('th').length > 0 ? 1 : 0;

  for (const row of rows.slice(skip)) {
    const cells = $(row).find('td');
    const href  = ($(row).find('a[href*="dropbox"]').attr('href') ?? '').trim();
    if (!href || !cells.length) continue;
    const label = cells.eq(0).text().trim();
    if (!label) continue;
    const sz = cells.length > 1 ? cells.eq(1).text().trim() : '';
    const item: { label: string; size?: string; url: string } = { label, url: href };
    if (sz && /\d/.test(sz)) item.size = sz;
    items.push(item);
  }
  return items;
}

// Drivers / Software table: Name | Version | Size | OS Support | Link
function parseDriverTable($: cheerio.CheerioAPI, table: cheerio.Cheerio<any>): DriverItem[] {
  const items: DriverItem[] = [];
  const rows = table.find('tr').toArray();
  const skip = $(rows[0])?.find('th').length > 0 ? 1 : 0;

  for (const row of rows.slice(skip)) {
    const cells = $(row).find('td');
    const href  = ($(row).find('a[href*="dropbox"]').attr('href') ?? '').trim();
    if (!href || !cells.length) continue;
    const name = cells.eq(0).text().trim();
    if (!name) continue;

    const item: DriverItem = { name, url: href };
    const v = cells.eq(1).text().trim();
    const s = cells.eq(2).text().trim();
    const o = cells.eq(3).text().replace(/\s+/g, ' ').trim();
    if (v) item.version = v;
    if (s && /\d/.test(s)) item.size = s;
    if (o) item.os = o;
    items.push(item);
  }
  return items;
}

function parseDownloads($: cheerio.CheerioAPI): Downloads {
  const result: Downloads = {
    drivers: [], manuals: [], brochures: [], quickGuides: [], productPhotos: [], software: [],
  };

  const tab = $('#tab-downloads');
  if (!tab.length) return result;

  tab.find('h2, H2').each((_, heading) => {
    const text = $(heading).text().trim();
    if (!text.includes('▎')) return;

    const table = findDownloadTable($, heading);
    if (!table.length) return;

    const toManual = (r: { label: string; size?: string; url: string }): DownloadFile =>
      ({ language: r.label, ...(r.size ? { size: r.size } : {}), url: r.url });

    if (/driver/i.test(text)) {
      result.drivers = parseDriverTable($, table);
    } else if (/user\s*manual|manual/i.test(text)) {
      result.manuals = parseFileTable($, table).map(toManual);
    } else if (/brochure/i.test(text)) {
      result.brochures = parseFileTable($, table).map(toManual);
    } else if (/quick\s*guide/i.test(text)) {
      result.quickGuides = parseFileTable($, table).map(toManual);
    } else if (/photo/i.test(text)) {
      result.productPhotos = parsePhotosTable($, table);
    } else if (/software/i.test(text)) {
      result.software = parseDriverTable($, table);
    }
  });

  return result;
}

function parseSupplies($: cheerio.CheerioAPI, pageUrl: string): SupplyItem[] {
  const items: SupplyItem[] = [];
  const origin = new URL(pageUrl).origin;

  let container = $('[id*="suppli"],[id*="accessor"],[class*="suppli"],[class*="accessor"]').first();
  if (!container.length) {
    $('h2,h3,h4,p,strong').each((_, el) => {
      if (container.length) return false;
      if (!/suppli|accessor/i.test($(el).text())) return;
      container = $(el).parent();
    });
  }
  if (!container.length) return items;

  container.find('a[href]').each((_, el) => {
    const href = $(el).attr('href') ?? '';
    if (!href.includes('/shop/')) return;
    const abs = normalizeUrl(href, origin);
    if (!abs || abs === pageUrl) return;
    const name = $(el).find('h2,h3,h4,h5,strong,b').first().text().trim()
               || $(el).attr('title')?.trim() || '';
    const description = $(el).find('p').first().text().trim();
    if (name && !items.some(i => i.url === abs)) items.push({ name, description, url: abs });
  });

  return items;
}

// FAQ data is in a <script> tag: window.HELPIE_FAQS = [{collection:{},items:[...]}]
function parseFaq($: cheerio.CheerioAPI): FaqItem[] {
  const items: FaqItem[] = [];

  $('script').each((_, el) => {
    const content = $(el).html() ?? '';
    const match = content.match(/window\.HELPIE_FAQS\s*=\s*(\[[\s\S]*?\]);/);
    if (!match) return;

    let faqData: any;
    try { faqData = JSON.parse(match[1]); } catch { return; }
    if (!Array.isArray(faqData)) return;

    for (const collection of faqData) {
      if (!Array.isArray(collection?.items)) continue;
      for (const faqItem of collection.items) {
        const title    = (faqItem?.post_title ?? '').trim();
        const bodyHtml = faqItem?.post_content ?? '';
        if (!title) continue;

        const steps: string[] = [];
        const $b = cheerio.load(bodyHtml);
        $b('li, p').each((_, el) => {
          const text = $b(el).text().trim()
            .replace(/<Video Link>/gi, '')
            .replace(/\s+/g, ' ')
            .trim();
          if (text) steps.push(text);
        });

        items.push({ title, steps });
      }
    }
  });

  return items;
}

// ─── Product scraper ──────────────────────────────────────────────────────────

export async function scrapeProduct(url: string): Promise<ProductData | null> {
  const html = await fetchHtml(url);
  if (!html) return null;

  const $ = cheerio.load(html);

  const model = $('h1').first().text().trim();
  if (!model) return null;

  const { tagline, description } = parseTaglineAndDescription($);
  const { category, series }     = parseBreadcrumbs($, url);
  const imageUrl                 = parseImageUrl($);
  const features                 = parseFeatures($);
  const specs                    = parseSpecs($);
  const downloads                = parseDownloads($);
  const supplies                 = parseSupplies($, url);
  const faq                      = parseFaq($);

  return {
    model, tagline, description, category, series,
    url, imageUrl, scrapedAt: new Date(),
    features, specs, downloads, supplies, faq,
  };
}

// ─── DB upsert ────────────────────────────────────────────────────────────────

async function upsertProduct(data: ProductData): Promise<'inserted' | 'updated'> {
  const existing = await db
    .select({ url: avisionProducts.url, downloads: avisionProducts.downloads })
    .from(avisionProducts)
    .where(eq(avisionProducts.url, data.url));

  const isNew = existing.length === 0;

  if (!isNew && existing[0].downloads) {
    const oldDrivers = JSON.stringify((existing[0].downloads as any)?.drivers);
    const newDrivers = JSON.stringify(data.downloads.drivers);
    if (oldDrivers !== newDrivers) console.log(`    ↻ driver versions changed for ${data.model}`);
  }

  const row = {
    model:       data.model,
    tagline:     data.tagline,
    description: data.description,
    category:    data.category,
    series:      data.series,
    url:         data.url,
    imageUrl:    data.imageUrl,
    features:    data.features  as unknown,
    specs:       data.specs     as unknown,
    downloads:   data.downloads as unknown,
    supplies:    data.supplies  as unknown,
    faq:         data.faq       as unknown,
    scrapedAt:   data.scrapedAt,
  };

  await db
    .insert(avisionProducts)
    .values(row)
    .onConflictDoUpdate({
      target: avisionProducts.url,
      set: { ...row, updatedAt: new Date() },
    });

  return isNew ? 'inserted' : 'updated';
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Starting Avision product scrape…\n');

  const productUrls = await discoverProductUrls();
  console.log(`\nFound ${productUrls.size} product pages. Scraping…\n`);

  let inserted = 0, updated = 0, failed = 0;

  for (const url of productUrls) {
    console.log(`Scraping: ${url}`);
    const data = await scrapeProduct(url);
    await sleep(DELAY_MS);

    if (!data) { failed++; continue; }

    const outcome = await upsertProduct(data);
    if (outcome === 'inserted') inserted++;
    else updated++;
    console.log(`  ${outcome === 'inserted' ? '+' : '~'} ${data.model} (${data.category})`);
  }

  console.log('\n─── Scrape complete ───────────────────────');
  console.log(`  Inserted : ${inserted}`);
  console.log(`  Updated  : ${updated}`);
  console.log(`  Failed   : ${failed}`);
  process.exit(0);
}

if (require.main === module) {
  main().catch(err => { console.error(err); process.exit(1); });
}
