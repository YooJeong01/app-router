import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // pnpm, npm 둘 다 깔린경우 루트 경로 에러 해결용
  // turbopack: {
  //   root: __dirname
  // },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'fastly.picsum.photos', pathname: '/**' }
    ]
  }
};

export default nextConfig;
