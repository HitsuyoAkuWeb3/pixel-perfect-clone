import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import LifeAudit from "./pages/LifeAudit";
import BreakthroughConfirmation from "./pages/BreakthroughConfirmation";
import Coaching from "./pages/Coaching";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import MyBricks from "./pages/MyBricks";
import BrickDetail from "./pages/BrickDetail";
import DailyRitual from "./pages/DailyRitual";
import Affirmations from "./pages/Affirmations";
import PassionPick from "./pages/PassionPick";
import GoddessRx from "./pages/GoddessRx";
import Scheduler from "./pages/Scheduler";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FloatingNav from "./components/FloatingNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <FloatingNav />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/life-audit" element={<LifeAudit />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/breakthrough-confirmation" element={<BreakthroughConfirmation />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bricks"
              element={
                <ProtectedRoute>
                  <MyBricks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bricks/:slug"
              element={
                <ProtectedRoute>
                  <BrickDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/daily-ritual"
              element={
                <ProtectedRoute>
                  <DailyRitual />
                </ProtectedRoute>
              }
            />
            <Route
              path="/affirmations"
              element={
                <ProtectedRoute>
                  <Affirmations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/passion-pick"
              element={
                <ProtectedRoute>
                  <PassionPick />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goddess-rx"
              element={
                <ProtectedRoute>
                  <GoddessRx />
                </ProtectedRoute>
              }
            />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
