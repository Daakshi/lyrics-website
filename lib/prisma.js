import { PrismaClient } from "@prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis;

let prisma;

function createPrismaClient() {
    const DB_URL = process.env.DATABASE_URL;

    if (!DB_URL) {
        throw new Error("DATABASE_URL is not set");
    }

    const adapter = new PrismaNeon({ connectionString: DB_URL });
    return new PrismaClient({ adapter });
}

// ✅ Lazy initialization (fixes Vercel build crash)
export function getPrisma() {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = createPrismaClient();
    }
    return globalForPrisma.prisma;
}