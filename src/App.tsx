import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import ErrorBoundary from '@/components/ErrorBoundary';

// Critical pages - loaded immediately
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy loaded public pages
const Calculator = lazy(() => import("./pages/Calculator"));
const Investment = lazy(() => import("./pages/services/Investment"));
const Software = lazy(() => import("./pages/services/Software"));
const SocialMedia = lazy(() => import("./pages/services/SocialMedia"));
const Digital = lazy(() => import("./pages/services/Digital"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Careers = lazy(() => import("./pages/Careers"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

// Lazy loaded legal pages
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/legal/CookiePolicy"));

// Lazy loaded admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminSoftware = lazy(() => import("./pages/admin/AdminSoftware"));
const AdminSocialMedia = lazy(() => import("./pages/admin/AdminSocialMedia"));
const AdminDigital = lazy(() => import("./pages/admin/AdminDigital"));
const AdminInvestments = lazy(() => import("./pages/admin/AdminInvestments"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminCareers = lazy(() => import("./pages/admin/AdminCareers"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminProfile = lazy(() => import("./pages/admin/AdminProfile"));
const AdminMonitoring = lazy(() => import("./pages/admin/AdminMonitoring"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminControlCenter = lazy(() => import("./pages/admin/AdminControlCenter"));

import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import { WhatsAppButton } from "./components/layout/WhatsAppButton";
import { VisitorTracker } from "./components/layout/VisitorTracker";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <VisitorTracker />
              <WhatsAppButton />
              <Suspense fallback={<PageLoader />}>
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
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  
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
                  <Route path="/admin/profile" element={<ProtectedAdminRoute><AdminProfile /></ProtectedAdminRoute>} />
                  <Route path="/admin/monitoring" element={<ProtectedAdminRoute><AdminMonitoring /></ProtectedAdminRoute>} />
                  <Route path="/admin/users" element={<ProtectedAdminRoute><AdminUsers /></ProtectedAdminRoute>} />
                  <Route path="/admin/control-center" element={<ProtectedAdminRoute><AdminControlCenter /></ProtectedAdminRoute>} />
                  
                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
