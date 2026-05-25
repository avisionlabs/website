import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { db } from './db';
import { avisionProducts } from './db/schema';
import { eq, and, ne, ilike, or, sql } from 'drizzle-orm';

const app = express();
app.use(cors());
app.use(express.json());

function httpCache(maxAgeSeconds = 600) {
  return (_req: Request, res: Response, next: NextFunction) => {
    res.set('Cache-Control', `public, max-age=${maxAgeSeconds}`);
    next();
  };
}

const SCANNER_CATEGORIES = [
  'DocumentScanner',
  'Flatbed Scanner',
  'Network Scanner',
  'Mobile Scanner',
  'PaperAir Series',
] as const;

function isScanner(category: string): boolean {
  return (SCANNER_CATEGORIES as readonly string[]).includes(category);
}


app.get('/api/products', httpCache(), async (req, res) => {
  try {
    const { category, subcategory } = req.query;

    let query = db
      .select({
        id: avisionProducts.id,
        model: avisionProducts.model,
        imageUrl: avisionProducts.imageUrl,
        inStock: avisionProducts.inStock,
        avCategory: avisionProducts.category,
      })
      .from(avisionProducts)
      .$dynamic();

    const conditions = [];

    if (subcategory) {
      conditions.push(eq(avisionProducts.category, subcategory as string));
    } else if (category === 'Scanners') {
      conditions.push(or(...SCANNER_CATEGORIES.map(c => eq(avisionProducts.category, c)))!);
    } else if (category === 'Printers and MFPs') {
      conditions.push(and(...SCANNER_CATEGORIES.map(c => ne(avisionProducts.category, c)))!);
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const rows = await query;
    const result = rows.map(r => ({
      id: r.id,
      model: r.model,
      imageUrl: r.imageUrl,
      inStock: r.inStock,
      category: isScanner(r.avCategory) ? 'Scanners' : 'Printers and MFPs',
      subcategory: r.avCategory,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


app.get('/api/products/:model/specs', httpCache(), async (req, res) => {
  try {
    const model = req.params.model;

    const rows = await db
      .select({ id: avisionProducts.id, specs: avisionProducts.specs })
      .from(avisionProducts)
      .where(eq(avisionProducts.model, model as string));

    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });

    const { id, specs } = rows[0];
    if (!specs || typeof specs !== 'object') return res.json([]);

    const result = Object.entries(specs as Record<string, string>).map(([key, value]) => {
      const sep = key.indexOf(' / ');
      return {
        productId: id,
        specCategory: sep !== -1 ? key.slice(0, sep) : '',
        specName: sep !== -1 ? key.slice(sep + 3) : key,
        specValue: value,
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch specs', detail: String(err) });
  }
});

app.get('/api/products/:model/features', httpCache(), async (req, res) => {
  try {
    const model = req.params.model;
    const rows = await db
      .select({ features: avisionProducts.features })
      .from(avisionProducts)
      .where(eq(avisionProducts.model, model as string));

    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });

    const { features } = rows[0];
    res.json(Array.isArray(features) ? features : []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch features' });
  }
});


app.get('/api/products/:model/downloads', httpCache(), async (req, res) => {
  try {
    const rows = await db
      .select({ downloads: avisionProducts.downloads })
      .from(avisionProducts)
      .where(eq(avisionProducts.model, req.params.model as string));

    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0].downloads ?? {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch downloads' });
  }
});

app.get('/api/products/:model', httpCache(), async (req, res) => {
  try {
    const model = req.params.model;

    const rows = await db
      .select({
        id: avisionProducts.id,
        model: avisionProducts.model,
        description: avisionProducts.description,
        imageUrl: avisionProducts.imageUrl,
        inStock: avisionProducts.inStock,
        avCategory: avisionProducts.category,
      })
      .from(avisionProducts)
      .where(eq(avisionProducts.model, model as string));

    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });

    const r = rows[0];
    res.json({
      id: r.id,
      model: r.model,
      description: r.description,
      imageUrl: r.imageUrl,
      inStock: r.inStock,
      category: isScanner(r.avCategory) ? 'Scanners' : 'Printers and MFPs',
      subcategory: r.avCategory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});


app.get('/api/categories', httpCache(), async (_req, res) => {
  res.json([
    { id: 1, name: 'Scanners' },
    { id: 2, name: 'Printers and MFPs' },
  ]);
});


app.get('/api/subcategories', httpCache(), async (req, res) => {
  try {
    const { category } = req.query;

    const rows = await db
      .selectDistinct({ name: avisionProducts.category })
      .from(avisionProducts);

    let names = rows.map(r => r.name);

    if (category === 'Scanners') {
      names = names.filter(isScanner);
    } else if (category === 'Printers and MFPs') {
      names = names.filter(n => !isScanner(n));
    }

    res.json(names.map((name, i) => ({ id: i + 1, name, category: category ?? null })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
});


app.get('/api/avision/search', httpCache(), async (req, res) => {
  try {
    const q = ((req.query.q as string) ?? '').trim();
    if (!q) return res.json([]);

    const result = await db
      .select()
      .from(avisionProducts)
      .where(or(
        ilike(avisionProducts.model,    `%${q}%`),
        ilike(avisionProducts.category, `%${q}%`),
        ilike(avisionProducts.series,   `%${q}%`),
sql`cast(${avisionProducts.specs} as text) ilike ${'%' + q + '%'}`,
      ));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed' });
  }
});


app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
