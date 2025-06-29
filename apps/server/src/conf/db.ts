import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DB_URI,
    },
  },
});

export default db;
