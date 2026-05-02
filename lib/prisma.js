import { PrismaClient } from "@prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis;

function createPrismaClient() {
    // ✅ Validate at runtime only — not at build time — so Vercel builds succeed
    const DB_URL = process.env.DATABASE_URL;
    if (!DB_URL) {
        throw new Error("DATABASE_URL is not set in environment variables");
    }
    const adapter = new PrismaNeon({ connectionString: DB_URL });
    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}