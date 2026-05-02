import { PrismaClient } from "@prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

// ✅ ONLY use env variable (no fallback)
const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
    throw new Error("DATABASE_URL is not set in environment variables");
}
async function main() {
  const adapter = new PrismaNeon({ connectionString: DB_URL });
  const prisma = new PrismaClient({ adapter });

  const admin = await prisma.admin.findFirst();
  console.log("Admin credentials:", admin);

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
