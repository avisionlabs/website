import { pgTable, serial, text, boolean, integer } from 'drizzle-orm/pg-core';

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