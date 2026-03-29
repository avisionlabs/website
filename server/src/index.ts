import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { db } from './db';
import { products, categories, subcategories } from './db/schema';
import { eq, and } from 'drizzle-orm';

const app = express();
app.use(cors());
app.use(express.json());


app.get('/api/products', async (req, res) => {
  try {
    const { category, subcategory } = req.query;

    let query = db
      .select({
        id: products.id,
        model: products.model,
        imageUrl: products.imageUrl,
        inStock: products.inStock,
        category: categories.name,
        subcategory: subcategories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
      .$dynamic();

    const conditions = [];

    if (category) {
      conditions.push(eq(categories.name, category as string));
    }

    if (subcategory) {
      conditions.push(eq(subcategories.name, subcategory as string));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const result = await query;
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


app.get('/api/products/:model', async (req, res) => {
  try {
    const { model } = req.params;

    const result = await db
      .select({
        id: products.id,
        model: products.model,
        description: products.description,
        imageUrl: products.imageUrl,
        inStock: products.inStock,
        category: categories.name,
        subcategory: subcategories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
      .where(eq(products.model, model));

    if (result.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});


app.get('/api/categories', async (_req, res) => {
  try {
    const result = await db.select().from(categories);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});


app.get('/api/subcategories', async (req, res) => {
  try {
    const { category } = req.query;

    let query = db
      .select({
        id: subcategories.id,
        name: subcategories.name,
        category: categories.name,
      })
      .from(subcategories)
      .leftJoin(categories, eq(subcategories.categoryId, categories.id))
      .$dynamic();

    if (category) {
      query = query.where(eq(categories.name, category as string));
    }

    const result = await query;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});