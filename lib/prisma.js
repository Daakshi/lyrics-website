// Import from the custom output path so Vercel's bundler includes the generated
// client in the serverless function (the default .prisma/ dotfolder is skipped).
import { PrismaClient } from "@/app/generated/prisma";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

// Required for Neon serverless WebSocket transport
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis;

function getPrismaInstance() {
  if (!globalForPrisma.__prisma) {
    const DB_URL = process.env.DATABASE_URL;
    if (!DB_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    const adapter = new PrismaNeon({ connectionString: DB_URL });
    globalForPrisma.__prisma = new PrismaClient({ adapter });
  }
  return globalForPrisma.__prisma;
}

// Proxy enables true lazy init — PrismaClient is only created when a DB method
// is actually called (during a live request), NOT at module import time.
// This prevents build-time crashes on Vercel where DATABASE_URL is not yet set.
// Cast to PrismaClient so TypeScript knows the full shape of the object.
export const prisma = /** @type {PrismaClient} */ (
  new Proxy(
    /** @type {any} */ ({}),
    {
      get(_, prop) {
        return getPrismaInstance()[prop];
      },
    }
  )
);