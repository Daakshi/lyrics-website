import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tell Next.js NOT to try to bundle these packages during static analysis.
  // Prisma, the Neon adapter, and ws are Node.js-only runtime packages —
  // bundling them causes "Failed to collect page data" on Vercel.
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-neon",
    "@neondatabase/serverless",
    "ws",
  ],
};

export default nextConfig;
