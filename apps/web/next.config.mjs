/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', "@repo/server", "@repo/schemas", "@repo/typescript-config"]
}

export default nextConfig
