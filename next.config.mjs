/** @type {import('next').NextConfig} */
const nextConfig = {
  // This project lives inside the legacy CRA repo, which has its own
  // package-lock.json. Pin the workspace root so Next/Turbopack doesn't
  // infer the parent directory.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
