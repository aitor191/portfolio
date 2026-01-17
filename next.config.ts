import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita que Turbopack infiera mal el root cuando hay múltiples lockfiles
  turbopack: {
    root: process.cwd(),
  },

  // Optimizaciones de imágenes (cuando las añadas)
  images: {
    formats: ['image/avif', 'image/webp'], // Formatos modernos y optimizados
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Cache de imágenes por 60 segundos
  },

  // Optimizaciones de compresión
  compress: true, // Habilitar compresión gzip

  // Headers de seguridad y rendimiento
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },

  // Optimizaciones de bundle
  experimental: {
    optimizePackageImports: ['react-icons'], // Tree-shaking optimizado para react-icons
  },
};

export default nextConfig;