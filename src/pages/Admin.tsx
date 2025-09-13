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
import { Milk, ArrowLeft, Users, ShoppingCart, Utensils, LogOut, User, Calendar, Truck } from "lucide-react";
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <img
  src="/RAMDAIRY_LOGO_white.png"
  alt="Ram Dairy Farm Logo"
  className="h-18 w-40 filter invert sepia saturate-500 hue-rotate-90"
/>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{user?.email}</span>
              </div>
              <Button variant="ghost" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Website
                </Link>
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your dairy farm operations</p>
        </div>

        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger
              value="customers"
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Customers</span>
            </TabsTrigger>
            <TabsTrigger value="cows" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Cows</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="weekly-orders" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Weekly Orders</span>
            </TabsTrigger>
            <TabsTrigger value="delivery-agents" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Delivery Agents</span>
            </TabsTrigger>
            <TabsTrigger value="feed" className="flex items-center space-x-2">
              <Utensils className="h-4 w-4" />
              <span>Feed Records</span>
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
