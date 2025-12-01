import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Investment from "./pages/services/Investment";
import Software from "./pages/services/Software";
import SocialMedia from "./pages/services/SocialMedia";
import Digital from "./pages/services/Digital";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSoftware from "./pages/admin/AdminSoftware";
import AdminSocialMedia from "./pages/admin/AdminSocialMedia";
import AdminDigital from "./pages/admin/AdminDigital";
import AdminInvestments from "./pages/admin/AdminInvestments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/services/investment" element={<Investment />} />
          <Route path="/services/software" element={<Software />} />
          <Route path="/services/social-media" element={<SocialMedia />} />
          <Route path="/services/digital" element={<Digital />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/software" element={<AdminSoftware />} />
          <Route path="/admin/social-media" element={<AdminSocialMedia />} />
          <Route path="/admin/digital" element={<AdminDigital />} />
          <Route path="/admin/investments" element={<AdminInvestments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
