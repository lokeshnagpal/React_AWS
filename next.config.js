/** @type {import('next').NextConfig} */
const nextConfig = {  
  // If you use next/image without a custom loader, keep this to avoid
  // relying on the default Image Optimization server during static export
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
