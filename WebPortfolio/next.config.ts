import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: [
      "ap-south-1.graphassets.com",
      "media.graphassets.com",
      "res.cloudinary.com",
      "your-api-domain.com",
    ],
  },
};

export default nextConfig;
