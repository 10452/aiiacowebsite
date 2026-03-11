import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import StructuredData from "./seo/StructuredData";

// Pages
import Home from "./pages/Home";
import ManifestoPage from "./pages/ManifestoPage";
import MethodPage from "./pages/MethodPage";
import IndustriesPage from "./pages/IndustriesPage";
import ModelsPage from "./pages/ModelsPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import ResultsPage from "./pages/ResultsPage";
import UpgradePage from "./pages/UpgradePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import AIIntegrationPage from "./pages/AIIntegrationPage";
import AIImplementationPage from "./pages/AIImplementationPage";
import AIAutomationPage from "./pages/AIAutomationPage";
import AIGovernancePage from "./pages/AIGovernancePage";
import WorkplacePage from "./pages/WorkplacePage";
import IndustryMicrosite from "./pages/IndustryMicrosite";
import AdminLeadsPage from "./pages/AdminLeadsPage";
import AdminConsolePage from "./pages/AdminConsolePage";
import AdminAgentPage from "./pages/AdminAgentPage";
import CorporatePage from "./pages/CorporatePage";
import AiiAVoiceWidget from "./components/AiiAVoiceWidget";

// Immediate external redirect component — fires window.location.href on mount
// This is the reliable fallback in case the Express server redirect is bypassed
function VideoStudioRedirect() {
  useEffect(() => {
    window.location.href = "https://aiivideo-zyf9pqt6.manus.space";
  }, []);
  return null;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/manifesto" component={ManifestoPage} />
      <Route path="/method" component={MethodPage} />
      <Route path="/industries" component={IndustriesPage} />
      <Route path="/models" component={ModelsPage} />
      <Route path="/case-studies" component={CaseStudiesPage} />
      <Route path="/results" component={ResultsPage} />
      <Route path="/upgrade" component={UpgradePage} />
      <Route path="/corporate" component={CorporatePage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/ai-integration" component={AIIntegrationPage} />
      <Route path="/ai-implementation-services" component={AIImplementationPage} />
      <Route path="/ai-automation-for-business" component={AIAutomationPage} />
      <Route path="/ai-governance" component={AIGovernancePage} />
      <Route path="/workplace" component={WorkplacePage} />
      <Route path="/industries/:slug" component={IndustryMicrosite} />
      <Route path="/admin/leads" component={AdminLeadsPage} />
      <Route path="/admin/agent" component={AdminAgentPage} />
      <Route path="/admin-opsteam" component={AdminConsolePage} />
      <Route path="/videostudio" component={VideoStudioRedirect} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Signal to vite-plugin-prerender that the app is ready to snapshot
  useEffect(() => {
    document.dispatchEvent(new Event("prerender-ready"));
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          {/* Global JSON-LD structured data for all pages */}
          <StructuredData />
          <Toaster />
          <Router />
          <AiiAVoiceWidget />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
