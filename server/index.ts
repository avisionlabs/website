import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const app = express()

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  }),
})

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/printers', async (req, res) => {
  const { color, category } = req.query

  const printers = await prisma.printer.findMany({
    where: {
      inStock: true,
      ...(color ? { color: String(color) } : {}),
      ...(category ? { category: String(category) } : {}),
    },
  })

  res.json(printers)
})

app.listen(3000, () => console.log('Server running on :3000'))