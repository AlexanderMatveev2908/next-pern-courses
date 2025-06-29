import { PrismaClient } from "@prisma/client";
import { readCA } from "src/lib/system/index.js";

const db = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DB_URI}?sslmode=verify-full&sslrootcert=${readCA()}`,
    },
  },
});

export default db;
