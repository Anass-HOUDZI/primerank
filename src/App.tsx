
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PageSpeedAnalyzer from "./pages/tools/PageSpeedAnalyzer";
import RankChecker from "./pages/tools/RankChecker";
import KeywordGenerator from "./pages/tools/KeywordGenerator";
import BulkStatusChecker from "./pages/tools/BulkStatusChecker";
import BacklinkProfiler from "./pages/tools/BacklinkProfiler";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Outils SEO */}
          <Route path="/tools/pagespeed-analyzer" element={<PageSpeedAnalyzer />} />
          <Route path="/tools/rank-checker" element={<RankChecker />} />
          <Route path="/tools/keyword-generator" element={<KeywordGenerator />} />
          <Route path="/tools/bulk-status-checker" element={<BulkStatusChecker />} />
          <Route path="/tools/backlink-profiler" element={<BacklinkProfiler />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
