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
    // Minification optimisée uniquement en production
    minify: mode === 'production' ? 'esbuild' : false,
    // CSS inline pour éviter les problèmes de chargement
    cssCodeSplit: false,
    // Code splitting optimisé
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
          'vendor-icons': ['lucide-react'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-charts': ['recharts'],
          'vendor-utils': ['clsx', 'tailwind-merge', 'date-fns'],
          
          // Feature chunks
          'tools-analysis': [
            './src/pages/tools/RankChecker.tsx',
            './src/pages/tools/KeywordGenerator.tsx',
            './src/pages/tools/CompetitorKeywords.tsx',
            './src/pages/tools/SERPComparator.tsx',
            './src/pages/tools/KeywordCombinations.tsx'
          ],
          'tools-technical': [
            './src/pages/tools/BulkStatusChecker.tsx',
            './src/pages/tools/CriticalCSSGenerator.tsx',
            './src/pages/tools/ImageCompressor.tsx',
            './src/pages/tools/PageSpeedAnalyzer.tsx',
            './src/pages/tools/SitemapExtractor.tsx',
            './src/pages/tools/CSVConverter.tsx'
          ],
          'tools-semantic': [
            './src/pages/tools/SemanticCocoonV1.tsx',
            './src/pages/tools/SemanticCocoonV2.tsx',
            './src/pages/tools/InternalLinking.tsx'
          ],
          'tools-backlinks': [
            './src/pages/tools/BacklinkProfiler.tsx',
            './src/pages/tools/BacklinkOpportunities.tsx',
            './src/pages/tools/WebsiteBacklinkAnalyzer.tsx'
          ],
          'tools-integrations': [
            './src/pages/tools/GSCIntegration.tsx',
            './src/pages/tools/GAIntegration.tsx',
            './src/pages/tools/SchemaValidator.tsx',
            './src/pages/tools/PositionedKeywords.tsx'
          ]
        },
        // Optimisation des noms de chunks
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId 
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace(/\.(tsx?|jsx?)$/, '') 
            : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Optimisation de la taille des chunks
    chunkSizeWarningLimit: 1000,
    // Source maps en production pour debugging (peut être désactivé pour plus de performance)
    sourcemap: mode === 'development',
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
