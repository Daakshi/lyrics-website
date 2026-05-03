import { PrismaClient } from "@prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

// Required for Neon serverless WebSocket transport
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis;

function createPrismaClient() {
  const DB_URL = process.env.DATABASE_URL;
  if (!DB_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const adapter = new PrismaNeon({ connectionString: DB_URL });
  return new PrismaClient({ adapter });
}

// Singleton: reuse client across hot-reloads in dev, one instance in prod
if (!globalForPrisma.__prisma) {
  globalForPrisma.__prisma = createPrismaClient();
}

export const prisma = globalForPrisma.__prisma;