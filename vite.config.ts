import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // React core — small, stable, cached long-term.
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            // Framer Motion — large but shared across every page.
            'vendor-motion': ['motion', 'motion/react'],
            // Physics engine — only downloaded when SkillsPlayground lazy-loads.
            'vendor-physics': ['matter-js', 'poly-decomp', 'svg-path-commander'],
          },
        },
      },
    },
  };
});
