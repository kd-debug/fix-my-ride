
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Pages
import LandingPage from "./pages/home/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import MechanicPendingPage from "./pages/auth/MechanicPendingPage";
import UserDashboard from "./pages/user/UserDashboard";
import MechanicDashboard from "./pages/mechanic/MechanicDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

// AppContent component that has access to auth context
const AppContent = () => {
  const { currentUser } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      setUserRole(currentUser.role);
    } else {
      setUserRole(null);
    }
  }, [currentUser]);

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={userRole} onLogout={handleLogout} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mechanic-pending" element={<MechanicPendingPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
