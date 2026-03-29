import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { db } from './db';
import { printers } from './db/schema';
import { eq } from 'drizzle-orm';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/printers', async (req, res) => {
  const { color, category } = req.query;
  
  let query = db.select().from(printers).$dynamic();
  if (color) query = query.where(eq(printers.color, color as string));
  if (category) query = query.where(eq(printers.category, category as string));
  
  const result = await query;
  res.json(result);
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));
