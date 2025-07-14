import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DB_URI,
    },
  },
  // log: ["query", "error", "warn", "info"],
});

export default db;
