/**
 * AiiACo SSG Entry Point
 * Used by the prerender script to render each route to static HTML.
 * This file is ONLY used at build time — not in the browser.
 *
 * Key SSR rules for react-helmet-async v2:
 * - Pass a plain object as `context` to HelmetProvider
 * - After renderToString, context.helmet is populated with toString() methods
 * - Script tags must use text children (NOT dangerouslySetInnerHTML) for SSR
 */
import React from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import StructuredDataSSR from "./seo/StructuredDataSSR";
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
import NotFound from "./pages/NotFound";
import AIIntegrationPage from "./pages/AIIntegrationPage";
import AIImplementationPage from "./pages/AIImplementationPage";
import AIAutomationPage from "./pages/AIAutomationPage";

const routeMap: Record<string, React.ComponentType> = {
  "/": Home,
  "/manifesto": ManifestoPage,
  "/method": MethodPage,
  "/industries": IndustriesPage,
  "/models": ModelsPage,
  "/case-studies": CaseStudiesPage,
  "/results": ResultsPage,
  "/upgrade": UpgradePage,
  "/privacy": PrivacyPage,
  "/terms": TermsPage,
  "/ai-integration": AIIntegrationPage,
  "/ai-implementation-services": AIImplementationPage,
  "/ai-automation-for-business": AIAutomationPage,
};

export type HelmetContext = {
  helmet?: HelmetServerState;
};

export function renderRoute(url: string): { html: string; helmetContext: HelmetContext } {
  const helmetContext: HelmetContext = {};
  const { hook } = memoryLocation({ path: url, static: true });

  const PageComponent = routeMap[url] ?? NotFound;

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            {/* SSR-safe structured data (text children, not dangerouslySetInnerHTML) */}
            <StructuredDataSSR />
            <Toaster />
            <Router hook={hook}>
              <PageComponent />
            </Router>
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );

  // helmetContext.helmet is populated synchronously after renderToString
  return { html, helmetContext };
}
