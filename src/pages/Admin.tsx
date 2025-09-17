import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Milk,
  ArrowLeft,
  Users,
  ShoppingCart,
  Utensils,
  LogOut,
  User,
  Calendar,
  Truck,
} from "lucide-react";
import { CustomerManagement } from "@/components/admin/CustomerManagement";
import { CowManagement } from "@/components/admin/CowManagement";
import { OrderManagement } from "@/components/admin/OrderManagement";
import { FeedManagement } from "@/components/admin/FeedManagement";
import { WeeklyOrderManagement } from "@/components/admin/WeeklyOrderManagement";
import DeliveryAgentManagement from "@/components/admin/DeliveryAgentManagement";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Sign Out Failed",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-2 sm:py-0">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/RAMDAIRY_LOGO_white.png"
                  alt="Ram Dairy Farm Logo"
                  className="h-10 w-auto sm:h-14 filter invert sepia saturate-500 hue-rotate-90"
                />
              </Link>
            </div>
            <div className="flex flex-wrap items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700 truncate max-w-[120px]">
                  {user?.email}
                </span>
              </div>
              <Button variant="ghost" asChild size="sm">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Back</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your dairy farm operations
          </p>
        </div>

        <Tabs defaultValue="customers" className="space-y-6">
          {/* Mobile scrollable tabs */}
          <TabsList className="flex overflow-x-auto sm:grid sm:grid-cols-6 gap-1 sm:gap-0 w-full">
            <TabsTrigger value="customers" className="flex items-center space-x-1 px-2 sm:px-3 text-sm">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Customers</span>
            </TabsTrigger>
            <TabsTrigger value="cows" className="flex items-center space-x-1 px-2 sm:px-3 text-sm">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Cows</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-1 px-2 sm:px-3 text-sm">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="weekly-orders" className="flex items-center space-x-1 px-2 sm:px-3 text-sm">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Weekly</span>
            </TabsTrigger>
            <TabsTrigger value="delivery-agents" className="flex items-center space-x-1 px-2 sm:px-3 text-sm">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Agents</span>
            </TabsTrigger>
            <TabsTrigger value="feed" className="flex items-center space-x-1 px-2 sm:px-3 text-sm">
              <Utensils className="h-4 w-4" />
              <span className="hidden sm:inline">Feed</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customers">
            <CustomerManagement />
          </TabsContent>
          <TabsContent value="cows">
            <CowManagement />
          </TabsContent>
          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>
          <TabsContent value="weekly-orders">
            <WeeklyOrderManagement />
          </TabsContent>
          <TabsContent value="delivery-agents">
            <DeliveryAgentManagement />
          </TabsContent>
          <TabsContent value="feed">
            <FeedManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
