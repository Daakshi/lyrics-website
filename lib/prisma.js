import { PrismaClient } from "@prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis;

const DB_URL =
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_9dJNOv3uSbcl@ep-snowy-surf-ao8p2ev4.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

function createPrismaClient() {
    // PrismaNeon takes the Pool config directly (Prisma 7 API)
    const adapter = new PrismaNeon({ connectionString: DB_URL });
    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}