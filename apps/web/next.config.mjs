/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', "@repo/server", "@repo/schemas", "@repo/tsconfig"]
}

export default nextConfig
