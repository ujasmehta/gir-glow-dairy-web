
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Milk, ArrowLeft, Users, Cow, ShoppingCart, Utensils } from "lucide-react";
import { CustomerManagement } from "@/components/admin/CustomerManagement";
import { CowManagement } from "@/components/admin/CowManagement";
import { OrderManagement } from "@/components/admin/OrderManagement";
import { FeedManagement } from "@/components/admin/FeedManagement";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <Milk className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-green-800">Ram Dairy Farm</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Admin Portal</span>
              <Button variant="ghost" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Website
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your dairy farm operations</p>
        </div>

        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="customers" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Customers</span>
            </TabsTrigger>
            <TabsTrigger value="cows" className="flex items-center space-x-2">
              <Cow className="h-4 w-4" />
              <span>Cows</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Orders</span>
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

          <TabsContent value="feed">
            <FeedManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
