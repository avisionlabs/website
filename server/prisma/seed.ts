import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import 'dotenv/config'

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  }),
})

async function main() {
  const printers = [
    { name: 'HP LaserJet Pro M404', color: 'white', category: 'laser', inStock: true, price: 299.99 },
    { name: 'Canon Pixma TS9120', color: 'black', category: 'inkjet', inStock: true, price: 199.99 },
    { name: 'Epson EcoTank ET-4760', color: 'white', category: 'inkjet', inStock: false, price: 379.99 },
    { name: 'Brother HL-L2350DW', color: 'black', category: 'laser', inStock: true, price: 159.99 },
    { name: 'Samsung Xpress M2020', color: 'white', category: 'laser', inStock: true, price: 139.99 },
    { name: 'Lexmark MB2236adw', color: 'black', category: 'laser', inStock: false, price: 229.99 },
    { name: 'Dell E310dw', color: 'white', category: 'laser', inStock: true, price: 189.99 },
    { name: 'Canon imageCLASS MF445dw', color: 'black', category: 'laser', inStock: true, price: 249.99 },
    { name: 'Epson WorkForce WF-2830', color: 'white', category: 'inkjet', inStock: true, price: 129.99 },
    { name: 'HP OfficeJet Pro 9015', color: 'black', category: 'inkjet', inStock: false, price: 219.99 },
  ]

  for (const printer of printers) {
    await prisma.printer.create({ data: printer })
  }

  console.log('✅ 10 printers added successfully!')
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())