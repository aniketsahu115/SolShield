import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import DetectPage from "@/pages/DetectPage";
import LearnPage from "@/pages/LearnPage";
import DevelopPage from "@/pages/DevelopPage";
import ResourcesPage from "@/pages/ResourcesPage";
import DocumentationPage from "@/pages/DocumentationPage";
import ApiReferencePage from "@/pages/ApiReference";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { WalletProvider } from "@/context/WalletContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/detect" component={DetectPage} />
      <Route path="/learn" component={LearnPage} />
      <Route path="/develop" component={DevelopPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/documentation" component={DocumentationPage} />
      <Route path="/api-reference" component={ApiReferencePage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="solshield-theme">
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </WalletProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
