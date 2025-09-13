import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Products from "./pages/Products";
import FarmVisit from "./pages/FarmVisit";
import Blogs from "./pages/Blogs";
import Order from "./pages/Order";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import DeliveryPortal from "./pages/DeliveryPortal";
import DeliveryLogin from "./pages/DeliveryLogin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const isLocal =
  !process.env.NODE_ENV ||
  process.env.NODE_ENV === "development" ||
  window.location.hostname === "localhost";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/farm-visit" element={<FarmVisit />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/order" element={<Order />} />
            <Route path="/delivery" element={<DeliveryPortal />} />
            <Route path="/delivery/login" element={<DeliveryLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
