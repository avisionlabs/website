import { pgTable, serial, text, real, boolean } from 'drizzle-orm/pg-core';

export const printers = pgTable('printers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: real('price').notNull(),
  imageUrl: text('image_url'),
  color: text('color'),
  category: text('category'),
  inStock: boolean('in_stock').default(true),
});
