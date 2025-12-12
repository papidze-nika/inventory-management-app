import dotenv from "dotenv";
dotenv.config();

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Use ts-node to run the TypeScript seed script
    seed: "ts-node prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});

