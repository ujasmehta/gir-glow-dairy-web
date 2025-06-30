
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Milk, Heart, Shield, Award } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Milk className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Ram Dairy Farm</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-green-600 font-medium">Products</Link>
              <Link to="/farm-visit" className="text-gray-700 hover:text-green-600 font-medium">Farm Visit</Link>
              <Link to="/blogs" className="text-gray-700 hover:text-green-600 font-medium">Blogs</Link>
              <Link to="/order" className="text-gray-700 hover:text-green-600 font-medium">Order</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Ram Dairy Farm
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Home to sacred Gir cows producing the finest A2 milk. Experience the purity and tradition 
            of authentic dairy farming with our premium quality milk and dairy products.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link to="/products">Shop Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/farm-visit">Visit Our Farm</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Gir Cows */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Sacred Gir Cows</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our farm is home to purebred Gir cows, an ancient Indian breed known for producing 
              the highest quality A2 milk with exceptional nutritional benefits.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Gir Cows" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Heart className="h-6 w-6 text-red-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Pure A2 Milk</h3>
                  <p className="text-gray-600">Our Gir cows naturally produce A2 beta-casein protein, easier to digest and more nutritious.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Traditional Care</h3>
                  <p className="text-gray-600">Raised with love and traditional methods, ensuring the highest quality and ethical standards.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Award className="h-6 w-6 text-yellow-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Premium Quality</h3>
                  <p className="text-gray-600">Award-winning milk recognized for its superior taste, nutrition, and purity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A2 Milk Benefits */}
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of A2 Milk</h2>
            <p className="text-lg text-gray-600">Discover why A2 milk is the healthier choice for you and your family</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Easy Digestion</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  A2 milk contains only A2 beta-casein protein, making it easier to digest 
                  and reducing digestive discomfort compared to regular milk.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Rich Nutrition</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Packed with essential nutrients including calcium, protein, vitamins, 
                  and minerals for strong bones and overall health.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Natural Purity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Fresh from our farm with no artificial additives or preservatives, 
                  maintaining the natural goodness of pure milk.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience the Difference Today
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Order fresh A2 milk and dairy products directly from our farm
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/order">Order Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
