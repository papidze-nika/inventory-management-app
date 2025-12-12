import { PrismaClient, Prisma } from "@prisma/client";
import dotenv from "dotenv";
import { PrismaNeon } from "@prisma/adapter-neon";

dotenv.config();

// Use the Neon adapter so Prisma connects to your Neon database
const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });

const prisma = new PrismaClient({ adapter });

async function main() {
  const demoUserId = "93f9a724-eb3e-4b56-ab99-cf8d5b2f6817";

  await prisma.product.createMany({
    data: Array.from({ length: 25 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      price: new Prisma.Decimal((Math.random() * 90 + 10).toFixed(2)),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    })),
  });

  console.log("Seed data created successfully!");
  console.log(`Created 25 products for user ID: ${demoUserId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });