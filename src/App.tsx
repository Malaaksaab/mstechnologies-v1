import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';

// Public Pages
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Investment from "./pages/services/Investment";
import Software from "./pages/services/Software";
import SocialMedia from "./pages/services/SocialMedia";
import Digital from "./pages/services/Digital";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Careers from "./pages/Careers";

// Legal Pages
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiePolicy from "./pages/legal/CookiePolicy";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSoftware from "./pages/admin/AdminSoftware";
import AdminSocialMedia from "./pages/admin/AdminSocialMedia";
import AdminDigital from "./pages/admin/AdminDigital";
import AdminInvestments from "./pages/admin/AdminInvestments";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminCareers from "./pages/admin/AdminCareers";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminSettings from "./pages/admin/AdminSettings";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/services/investment" element={<Investment />} />
              <Route path="/services/software" element={<Software />} />
              <Route path="/services/social-media" element={<SocialMedia />} />
              <Route path="/services/digital" element={<Digital />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/careers" element={<Careers />} />
              
              {/* Legal Routes */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
              <Route path="/admin/software" element={<ProtectedAdminRoute><AdminSoftware /></ProtectedAdminRoute>} />
              <Route path="/admin/social-media" element={<ProtectedAdminRoute><AdminSocialMedia /></ProtectedAdminRoute>} />
              <Route path="/admin/digital" element={<ProtectedAdminRoute><AdminDigital /></ProtectedAdminRoute>} />
              <Route path="/admin/investments" element={<ProtectedAdminRoute><AdminInvestments /></ProtectedAdminRoute>} />
              <Route path="/admin/blog" element={<ProtectedAdminRoute><AdminBlog /></ProtectedAdminRoute>} />
              <Route path="/admin/careers" element={<ProtectedAdminRoute><AdminCareers /></ProtectedAdminRoute>} />
              <Route path="/admin/bookings" element={<ProtectedAdminRoute><AdminBookings /></ProtectedAdminRoute>} />
              <Route path="/admin/settings" element={<ProtectedAdminRoute><AdminSettings /></ProtectedAdminRoute>} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
