import type { NextConfig } from "next";

// Vercel (default): no `output: "export"` and no `basePath` — served from the
// domain root with full Next.js features (SSR/ISR/Image optimization).
//
// GitHub Pages: the deploy workflow sets `GITHUB_PAGES=true`, which switches on
// static export + the `/studioOS` project sub-path. Vercel is unaffected.
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = isGithubPages
  ? {
      output: "export",
      basePath: "/studioOS",
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
