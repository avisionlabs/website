# Avision Labs

Product catalog and search site for Avision scanners and printers.

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React + Vite + TypeScript, Tailwind CSS, Headless UI, Heroicons, React Router |
| Backend | Express, Drizzle ORM, PostgreSQL (Neon) |
| Scraper | Cheerio, native fetch, Resend (email reports) |
| Automation | GitHub Actions |

## Project Structure

```
client/   React frontend
server/   Express API + scraper
  src/
    index.ts          API server
    scrape.ts         Avision.com product scraper
    scrape.test.ts    Scraper unit tests (change-detection logic)
    emailService.ts   Post-scrape HTML email reports via Resend
    db/
      schema.ts       Drizzle table definitions
      index.ts        DB client (Neon serverless)
```

## Setup

### Prerequisites
- Node.js 20+
- A [Neon](https://neon.tech) Postgres database

### Environment

Create `server/.env`:
```
DATABASE_URL=postgres://...

# Optional — enables post-scrape email reports via Resend
RESEND_API_KEY=re_...
REPORT_EMAIL=you@example.com
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

Crawls all product pages on avision.com and stores structured data in the `avision_products` table. Extracts features, specs, drivers, manuals, brochures, quick guides, and product photos.

After each run, a summary email is sent via Resend listing inserted, updated, unchanged, and failed products — if `RESEND_API_KEY` and `REPORT_EMAIL` are set.

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
| GET | `/api/products/:model/features` | Features for a product |
| GET | `/api/products/:model/downloads` | Downloads (drivers, manuals, etc.) for a product |
| GET | `/api/categories` | All categories |
| GET | `/api/subcategories` | All subcategories (supports `?category=`) |
| GET | `/api/avision/search?q=` | Full-text search across scraped products |
