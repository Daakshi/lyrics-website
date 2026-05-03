import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // DATABASE_URL must NOT be listed here — the `env` block exposes vars to
  // the browser bundle. Server-only secrets must stay in process.env and be
  // accessed only inside API routes / Server Components.
};

export default nextConfig;
