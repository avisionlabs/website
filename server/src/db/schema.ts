import { pgTable, serial, text, jsonb, timestamp, boolean, index } from 'drizzle-orm/pg-core';

/* scraped product data from avision.com — full product pages */
export const avisionProducts = pgTable('avision_products', {
  id:          serial('id').primaryKey(),
  model:       text('model').notNull(),
  description: text('description'),
  category:    text('category').notNull(),
  series:      text('series').notNull().default(''),
  url:         text('url').notNull().unique(),
  imageUrl:    text('image_url'),
  features:    jsonb('features'),
  specs:       jsonb('specs'),
  downloads:   jsonb('downloads'),
  inStock:     boolean('in_stock').default(false).notNull(),
  scrapedAt:   timestamp('scraped_at', { mode: 'date' }).notNull(),
  createdAt:   timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt:   timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
}, (t) => [
  index('avision_products_model_idx').on(t.model),
]);
