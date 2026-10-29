/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Local images live in /public (e.g. /images/hero.jpg) and are optimized
    // automatically. Remote hosts must be allow-listed here (remotePatterns).
    // Next 16 rejects optimized-image requests whose quality isn't listed.
    formats: ["image/webp"],
    qualities: [75, 80, 90],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
