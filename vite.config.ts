import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimisation pour la production
    minify: mode === 'production' ? 'esbuild' : false,
    // CSS séparé pour éviter les problèmes de chargement
    cssCodeSplit: true,
    // Limite d'inline réduite pour la stabilité
    assetsInlineLimit: 4096,
    // Source maps en production désactivées pour les performances
    sourcemap: false,
    // Code splitting optimisé
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks essentiels
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
          'vendor-icons': ['lucide-react'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-utils': ['clsx', 'tailwind-merge'],
        },
        // Optimisation des noms de chunks
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Optimisation de la taille des chunks
    chunkSizeWarningLimit: 1000,
  },
  // Optimisations CSS
  css: {
    devSourcemap: mode === 'development',
    // CSS minification enabled for production
    ...(mode === 'production' && {
      postcss: {
        plugins: [],
      },
    }),
  },
  // Pre-bundling optimisé
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react',
      'recharts',
      'clsx',
      'tailwind-merge'
    ],
    exclude: ['@vite/client', '@vite/env'],
  },
  // Performance et développement
  define: {
    __DEV__: mode === 'development',
  },
}));
