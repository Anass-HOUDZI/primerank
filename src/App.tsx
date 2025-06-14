
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { PWAInstall } from "@/components/PWAInstall";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PageSpeedAnalyzer from "./pages/tools/PageSpeedAnalyzer";
import RankChecker from "./pages/tools/RankChecker";
import KeywordGenerator from "./pages/tools/KeywordGenerator";
import BulkStatusChecker from "./pages/tools/BulkStatusChecker";
import BacklinkProfiler from "./pages/tools/BacklinkProfiler";
import KeywordDensityAnalyzer from "./pages/tools/KeywordDensityAnalyzer";
import MetaDescriptionGenerator from "./pages/tools/MetaDescriptionGenerator";
import SERPComparator from "./pages/tools/SERPComparator";
import MobileFirstAudit from "./pages/tools/MobileFirstAudit";

// Configuration optimisée pour PWA
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (anciennement cacheTime)
      retry: (failureCount, error: any) => {
        // Ne pas réessayer si hors ligne
        if (!navigator.onLine) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* Outils SEO existants */}
        <Route path="/tools/pagespeed-analyzer" element={<PageSpeedAnalyzer />} />
        <Route path="/tools/rank-checker" element={<RankChecker />} />
        <Route path="/tools/keyword-generator" element={<KeywordGenerator />} />
        <Route path="/tools/bulk-status-checker" element={<BulkStatusChecker />} />
        <Route path="/tools/backlink-profiler" element={<BacklinkProfiler />} />
        
        {/* Nouveaux outils côté client */}
        <Route path="/tools/keyword-density-analyzer" element={<KeywordDensityAnalyzer />} />
        <Route path="/tools/meta-description-generator" element={<MetaDescriptionGenerator />} />
        
        {/* Nouveaux outils avancés */}
        <Route path="/tools/serp-comparator" element={<SERPComparator />} />
        <Route path="/tools/mobile-first-audit" element={<MobileFirstAudit />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Composants PWA */}
      <OfflineIndicator />
      <PWAInstall />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
