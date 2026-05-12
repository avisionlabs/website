# Avision Labs

Product catalog and search site for Avision scanners and printers.

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React + Vite + TypeScript, Tailwind CSS, Headless UI, Heroicons, React Router |
| Backend | Express, Drizzle ORM, PostgreSQL (Neon) |
| Scraper | Cheerio, native fetch |
| Automation | GitHub Actions |

## Project Structure

```
client/   React frontend
server/   Express API + scraper
  src/
    index.ts       API server
    scrape.ts      Avision.com product scraper
    db/
      schema.ts    Drizzle table definitions
      seed.ts      Manual product seed data
      index.ts     DB client (Neon serverless)
```

## Setup

### Prerequisites
- Node.js 20+
- A [Neon](https://neon.tech) Postgres database

### Environment

Create `server/.env`:
```
DATABASE_URL=postgres://...
```

### Install & run

```bash
# Install all dependencies
npm install
cd client && npm intall
cd server && npm install

# Push schema to database
cd server && npm run db:push

# Start backend server (port 3000)
cd server && npm run dev

# Start frontend (port 5173)
cd client && npm run dev

# Start Both
cd main folder && npm run dev
```

## Scraper

Crawls all product pages on avision.com and stores structured data in the `avision_products` table. Extracts features, specs, drivers, manuals, brochures, quick guides, product photos, and FAQ.

```bash
cd server && npm run scrape
```

Runs automatically every Sunday at 3 AM UTC via GitHub Actions. Can also be triggered manually from the **Actions** tab.


## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/products` | All products (supports `?category=` `?subcategory=`) |
| GET | `/api/products/:model` | Single product by model |
| GET | `/api/products/:model/specs` | Specs for a product |
| GET | `/api/categories` | All categories |
| GET | `/api/subcategories` | All subcategories (supports `?category=`) |
| GET | `/api/avision/search?q=` | Full-text search across scraped products |
