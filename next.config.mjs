import { readFileSync } from 'fs';

let userConfig = {};
try {
  userConfig = (await import('./v0-user-next.config.js')).default;
} catch (e) {
  console.log('No user config found, using defaults');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ===== Vercel Deployment Essentials ===== */
  output: process.env.VERCEL ? 'standalone' : undefined,
  distDir: process.env.VERCEL ? '.next' : 'build',
  
  /* ===== Build Optimizations ===== */
  experimental: {
    webpackBuildWorker: true,
    parallelServerCompiles: true,
    optimizeCss: true,
    instrumentationHook: true,
  },

  /* ===== Error Handling ===== */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  /* ===== Image Handling ===== */
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
    domains: [
      'localhost',
      'vercel.app',
      // Add other domains as needed
    ],
  },

  /* ===== Webpack Customization ===== */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { 
        ...config.resolve.fallback,
        fs: false 
      };
    }
    return config;
  },
};

// Deep merge function for configs
function mergeConfigs(defaultConfig, customConfig) {
  const result = { ...defaultConfig };
  
  for (const key in customConfig) {
    if (typeof customConfig[key] === 'object' && !Array.isArray(customConfig[key])) {
      result[key] = {
        ...(result[key] || {}),
        ...customConfig[key],
      };
    } else {
      result[key] = customConfig[key];
    }
  }
  
  return result;
}

export default mergeConfigs(nextConfig, userConfig);