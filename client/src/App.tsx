import { Switch, Route, useLocation } from "wouter";
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
import DashboardPage from "@/pages/DashboardPage";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { WalletProvider } from "@/context/WalletContext";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Loading screen animation
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative h-16 w-16 mb-4">
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="h-8 w-8 text-primary" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M3 13h2v7c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-7h2v-2H3v2zm5-9v4h8V4h3v5h-3v1c0 .047 0 .093-.01.145-.87 1.82-1.31 2.855-2.35 2.855H8.36c-1.04 0-1.48-1.034-2.35-2.855-.01-.052-.01-.098-.01-.145V9H3V4h3z" 
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div className="text-primary font-medium">Loading SolShield...</div>
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/detect" component={DetectPage} />
        <Route path="/learn" component={LearnPage} />
        <Route path="/develop" component={DevelopPage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/documentation" component={DocumentationPage} />
        <Route path="/api-reference" component={ApiReferencePage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="solshield-theme">
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <TooltipProvider>
            <Toaster />
            {loading ? (
              <LoadingScreen />
            ) : (
              <Router />
            )}
          </TooltipProvider>
        </WalletProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
