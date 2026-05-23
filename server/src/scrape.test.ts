import { hasProductChanged, getChangedFields } from './scrape';

const base = {
  model:       'AD7100',
  tagline:     'Fast scanner',
  description: 'A great scanner',
  category:    'Document Scanner',
  series:      'AD7100 Series',
  url:         'https://www.avision.com/en/shop/document-scanner/ad7100-series/ad7100/',
  imageUrl:    'https://www.avision.com/img/ad7100.jpg',
  scrapedAt:   new Date(),
  features:    [{ title: 'Speed', description: '100 ppm' }],
  specs:       { 'Scan Speed': '100 ppm', Resolution: '600 dpi' },
  downloads:   {
    drivers:       [{ name: 'AVxxx Driver', version: '2.0', url: 'https://dropbox.com/driver' }],
    manuals:       [],
    brochures:     [],
    quickGuides:   [],
    productPhotos: [],
    software:      [],
  },
  supplies:    [{ name: 'Roller Kit', description: 'Replacement rollers', url: 'https://www.avision.com/en/shop/supplies/roller-kit/' }],
  faq:         [{ title: 'How to clean?', steps: ['Step 1', 'Step 2'] }],
};

function dbRow(overrides: Partial<typeof base> = {}) {
  const merged = { ...base, ...overrides };
  return {
    model:       merged.model,
    tagline:     merged.tagline,
    description: merged.description,
    category:    merged.category,
    series:      merged.series,
    imageUrl:    merged.imageUrl,
    features:    JSON.parse(JSON.stringify(merged.features)),
    specs:       JSON.parse(JSON.stringify(merged.specs)),
    downloads:   JSON.parse(JSON.stringify(merged.downloads)),
    supplies:    JSON.parse(JSON.stringify(merged.supplies)),
    faq:         JSON.parse(JSON.stringify(merged.faq)),
  };
}

let passed = 0, failed = 0;

function assert(label: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) { console.log(`  ✓ ${label}`); passed++; }
  else    { console.error(`  ✗ ${label}\n    expected: ${JSON.stringify(expected)}\n    got:      ${JSON.stringify(actual)}`); failed++; }
}

console.log('\nhasProductChanged tests\n');

assert('identical data → false',          hasProductChanged(dbRow(), base), false);
assert('only scrapedAt differs → false',  hasProductChanged(dbRow(), { ...base, scrapedAt: new Date(0) }), false);
assert('model changed → true',            hasProductChanged(dbRow({ model: 'OLD' }), base), true);
assert('tagline changed → true',          hasProductChanged(dbRow({ tagline: 'Old' }), base), true);
assert('description changed → true',      hasProductChanged(dbRow({ description: 'Old' }), base), true);
assert('category changed → true',         hasProductChanged(dbRow({ category: 'Flatbed' }), base), true);
assert('series changed → true',           hasProductChanged(dbRow({ series: 'Old Series' }), base), true);
assert('imageUrl changed → true',         hasProductChanged(dbRow({ imageUrl: 'https://old.jpg' }), base), true);
assert('specs changed → true',            hasProductChanged(dbRow({ specs: { 'Scan Speed': '50 ppm' } }), base), true);
assert('features changed → true',         hasProductChanged(dbRow({ features: [{ title: 'Speed', description: 'old' }] }), base), true);
assert('driver version changed → true',   hasProductChanged(dbRow({ downloads: { ...base.downloads, drivers: [{ name: 'AVxxx Driver', version: '1.0', url: 'https://dropbox.com/driver' }] } }), base), true);
assert('manual added → true',             hasProductChanged(dbRow({ downloads: { ...base.downloads, manuals: [{ language: 'English', url: 'https://dropbox.com/manual' }] } }), base), true);
assert('supply removed → true',           hasProductChanged(dbRow({ supplies: [] }), base), true);
assert('faq step changed → true',         hasProductChanged(dbRow({ faq: [{ title: 'How to clean?', steps: ['Different'] }] }), base), true);
assert('tagline null→string → true',      hasProductChanged(dbRow({ tagline: null }), base), true);
assert('tagline string→null → true',      hasProductChanged(dbRow(), { ...base, tagline: null }), true);
assert('both tagline null → false',       hasProductChanged(dbRow({ tagline: null }), { ...base, tagline: null }), false);

console.log('\ngetChangedFields tests\n');

assert('no change → []',                  getChangedFields(dbRow(), base), []);
assert('model changed → [model]',         getChangedFields(dbRow({ model: 'OLD' }), base), ['model']);
assert('tagline changed → [tagline]',     getChangedFields(dbRow({ tagline: 'Old' }), base), ['tagline']);
assert('description changed',             getChangedFields(dbRow({ description: 'Old' }), base), ['description']);
assert('category changed',                getChangedFields(dbRow({ category: 'Flatbed' }), base), ['category']);
assert('series changed',                  getChangedFields(dbRow({ series: 'Old' }), base), ['series']);
assert('imageUrl changed → [image]',      getChangedFields(dbRow({ imageUrl: 'x' }), base), ['image']);
assert('specs changed → [specs]',         getChangedFields(dbRow({ specs: {} }), base), ['specs']);
assert('features changed → [features]',   getChangedFields(dbRow({ features: [] }), base), ['features']);
assert('downloads changed → [downloads]', getChangedFields(dbRow({ downloads: { ...base.downloads, drivers: [] } }), base), ['downloads']);
assert('supplies changed → [supplies]',   getChangedFields(dbRow({ supplies: [] }), base), ['supplies']);
assert('faq changed → [faq]',             getChangedFields(dbRow({ faq: [] }), base), ['faq']);

assert(
  'multiple fields changed → correct list',
  getChangedFields(dbRow({ model: 'OLD', specs: {} }), base),
  ['model', 'specs'],
);

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
