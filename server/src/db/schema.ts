import { pgTable, serial, text, boolean, integer, jsonb, timestamp, index } from 'drizzle-orm/pg-core';

/* scanners or printer/mfps */
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
});

/* book, document, network, production scanners */
export const subcategories = pgTable('subcategories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),

  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
});

/* model: "AD215" */
export const products = pgTable('products', {
  id: serial('id').primaryKey(),

  model: text('model').notNull().unique(),   

  description: text('description'),
  imageUrl: text('image_url'),

  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),

  subcategoryId: integer('subcategory_id')
    .references(() => subcategories.id),

  inStock: boolean('in_stock').default(true),
});

/* speed: 40 ppm, resolution: 600 dpi */
export const productSpecs = pgTable('product_specs', {
  id: serial('id').primaryKey(),
  
  productId: integer('product_id')
    .notNull()
    .references(() => products.id),

  specCategory: text('spec_category').notNull(),
  specName:     text('spec_name').notNull(),
  specValue:    text('spec_value').notNull(),
});

/* images */
export const productImages = pgTable('product_images', {
  id: serial('id').primaryKey(),

  productId: integer('product_id')
    .notNull()
    .references(() => products.id),

  url: text('url').notNull(),
});

/* scraped product data from avision.com — full product pages */
export const avisionProducts = pgTable('avision_products', {
  id:          serial('id').primaryKey(),
  model:       text('model').notNull(),
  tagline:     text('tagline'),
  description: text('description'),
  category:    text('category').notNull(),
  series:      text('series').notNull().default(''),
  url:         text('url').notNull().unique(),
  imageUrl:    text('image_url'),
  features:    jsonb('features'),
  specs:       jsonb('specs'),
  downloads:   jsonb('downloads'),
  supplies:    jsonb('supplies'),
  faq:         jsonb('faq'),
  scrapedAt:   timestamp('scraped_at', { mode: 'date' }).notNull(),
  createdAt:   timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt:   timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
}, (t) => [
  index('avision_products_model_idx').on(t.model),
]);