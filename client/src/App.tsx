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

function Router() {
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
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
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
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
