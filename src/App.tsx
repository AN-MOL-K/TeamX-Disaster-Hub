import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { MainContent } from "@/components/MainContent";
import { RightSidebar } from "@/components/RightSidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ShareInfo from "./pages/ShareInfo";
import Donate from "./pages/Donate";
import PreparednessTips from "./pages/PreparednessTips";
import DisasterInfo from "./pages/DisasterInfo";
import DisasterDetail from "./pages/DisasterDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import ManageUsers from "./pages/ManageUsers";
import Help from "./pages/Help";
import LearnMore from "./pages/LearnMore";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <div className="flex min-h-screen bg-background">
                <NavigationSidebar />
                <MainContent />
                <RightSidebar />
              </div>
            } />
            <Route path="/share-info" element={<ShareInfo />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/preparedness-tips" element={<PreparednessTips />} />
            <Route path="/disaster-info" element={<DisasterInfo />} />
            <Route path="/disaster/:id" element={<DisasterDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/help" element={<Help />} />
            <Route path="/learn-more" element={<LearnMore />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
