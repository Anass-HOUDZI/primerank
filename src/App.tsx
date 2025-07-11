import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { PWAInstall } from "@/components/PWAInstall";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Pages de catégories
import AnalyseMots from "./pages/categories/AnalyseMots";
import AnalyseTechnique from "./pages/categories/AnalyseTechnique";
import ArchitectureSemantique from "./pages/categories/ArchitectureSemantique";
import AnalyseBacklinks from "./pages/categories/AnalyseBacklinks";
import IntegrationsAPIs from "./pages/categories/IntegrationsAPIs";

// Outils existants
import PageSpeedAnalyzer from "./pages/tools/PageSpeedAnalyzer";
import RankChecker from "./pages/tools/RankChecker";
import KeywordGenerator from "./pages/tools/KeywordGenerator";
import BulkStatusChecker from "./pages/tools/BulkStatusChecker";
import BacklinkProfiler from "./pages/tools/BacklinkProfiler";
import KeywordDensityAnalyzer from "./pages/tools/KeywordDensityAnalyzer";
import MetaDescriptionGenerator from "./pages/tools/MetaDescriptionGenerator";
import SERPComparator from "./pages/tools/SERPComparator";
import MobileFirstAudit from "./pages/tools/MobileFirstAudit";

// Nouveaux outils à créer
import CriticalCSSGenerator from "./pages/tools/CriticalCSSGenerator";
import ImageCompressor from "./pages/tools/ImageCompressor";
import KeywordCombinations from "./pages/tools/KeywordCombinations";
import CompetitorKeywords from "./pages/tools/CompetitorKeywords";
import SemanticCocoonV1 from "./pages/tools/SemanticCocoonV1";
import SemanticCocoonV2 from "./pages/tools/SemanticCocoonV2";
import InternalLinking from "./pages/tools/InternalLinking";
import SitemapExtractor from "./pages/tools/SitemapExtractor";
import CSVConverter from "./pages/tools/CSVConverter";
import BacklinkOpportunities from "./pages/tools/BacklinkOpportunities";
import WebsiteBacklinkAnalyzer from "./pages/tools/WebsiteBacklinkAnalyzer";
import GSCIntegration from "./pages/tools/GSCIntegration";
import GAIntegration from "./pages/tools/GAIntegration";
import SchemaValidator from "./pages/tools/SchemaValidator";
import PositionedKeywords from "./pages/tools/PositionedKeywords";

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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Pages de catégories */}
        <Route path="/category/analyse-mots-cles" element={<AnalyseMots />} />
        <Route path="/category/analyse-technique" element={<AnalyseTechnique />} />
        <Route path="/category/architecture-semantique" element={<ArchitectureSemantique />} />
        <Route path="/category/analyse-backlinks" element={<AnalyseBacklinks />} />
        <Route path="/category/integrations-apis" element={<IntegrationsAPIs />} />
        
        {/* Outils d'analyse technique */}
        <Route path="/tools/rank-checker" element={<RankChecker />} />
        <Route path="/tools/bulk-status-checker" element={<BulkStatusChecker />} />
        <Route path="/tools/pagespeed-analyzer" element={<PageSpeedAnalyzer />} />
        <Route path="/tools/mobile-first-audit" element={<MobileFirstAudit />} />
        <Route path="/tools/critical-css-generator" element={<CriticalCSSGenerator />} />
        <Route path="/tools/image-compressor" element={<ImageCompressor />} />

        {/* Outils de recherche mots-clés */}
        <Route path="/tools/keyword-generator" element={<KeywordGenerator />} />
        <Route path="/tools/keyword-density" element={<KeywordDensityAnalyzer />} />
        <Route path="/tools/serp-comparator" element={<SERPComparator />} />
        <Route path="/tools/keyword-combinations" element={<KeywordCombinations />} />
        <Route path="/tools/competitor-keywords" element={<CompetitorKeywords />} />

        {/* Outils d'architecture sémantique */}
        <Route path="/tools/semantic-cocoon-v1" element={<SemanticCocoonV1 />} />
        <Route path="/tools/semantic-cocoon-v2" element={<SemanticCocoonV2 />} />
        <Route path="/tools/internal-linking" element={<InternalLinking />} />

        {/* Outils d'optimisation contenu */}
        <Route path="/tools/meta-generator" element={<MetaDescriptionGenerator />} />
        <Route path="/tools/sitemap-extractor" element={<SitemapExtractor />} />
        <Route path="/tools/csv-converter" element={<CSVConverter />} />

        {/* Outils d'analyse de backlinks */}
        <Route path="/tools/backlink-profiler" element={<BacklinkProfiler />} />
        <Route path="/tools/backlink-opportunities" element={<BacklinkOpportunities />} />
        <Route path="/tools/website-backlink-analyzer" element={<WebsiteBacklinkAnalyzer />} />

        {/* Intégrations APIs */}
        <Route path="/tools/gsc-integration" element={<GSCIntegration />} />
        <Route path="/tools/ga-integration" element={<GAIntegration />} />
        <Route path="/tools/schema-validator" element={<SchemaValidator />} />
        <Route path="/tools/positioned-keywords" element={<PositionedKeywords />} />
        
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
