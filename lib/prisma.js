// Import from the custom output path so Vercel's bundler includes the generated
// client in the serverless function (the default .prisma/ dotfolder is skipped).
import { PrismaClient } from "@/app/generated/prisma";
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

// Singleton: reuse across hot-reloads in dev, one instance in prod
if (!globalForPrisma.__prisma) {
  globalForPrisma.__prisma = createPrismaClient();
}

export const prisma = globalForPrisma.__prisma;