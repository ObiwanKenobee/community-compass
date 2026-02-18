import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProblemSelection from "./pages/ProblemSelection";
import BaselineBuilder from "./pages/BaselineBuilder";
import ScenarioLab from "./pages/ScenarioLab";
import ComparisonView from "./pages/ComparisonView";
import ProposalBuilder from "./pages/ProposalBuilder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/problem" element={<ProblemSelection />} />
          <Route path="/baseline" element={<BaselineBuilder />} />
          <Route path="/scenario" element={<ScenarioLab />} />
          <Route path="/comparison" element={<ComparisonView />} />
          <Route path="/proposal" element={<ProposalBuilder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
