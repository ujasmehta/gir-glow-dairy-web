import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Milk,
  Heart,
  Leaf,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { HeroBanner } from "@/components/HeroBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Milk className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">
                Ram Dairy Farm
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-green-600 font-medium">
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Products
              </Link>
              <Link
                to="/farm-visit"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Farm Visit
              </Link>
              <Link
                to="/blogs"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Blogs
              </Link>
              <Link
                to="/order"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Order
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner Carousel */}
      <HeroBanner />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Ram Dairy Farm?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the highest quality dairy products
              through sustainable and ethical farming practices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-green-700">
                  100% Pure A2 Milk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our Gir cows naturally produce A2 protein milk, which is
                  easier to digest and provides superior nutritional benefits.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Leaf className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-green-700">
                  Organic & Natural
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  No hormones, antibiotics, or artificial additives. Our cows
                  graze on organic pastures and receive the best natural care.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-green-700">
                  Farm Fresh Daily
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Fresh milk delivered to your doorstep within 24 hours of
                  milking, ensuring maximum freshness and nutrition.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Premium Products
            </h2>
            <p className="text-gray-600">
              From fresh milk to traditional ghee, discover our range of pure
              dairy products.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Fresh A2 Milk"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-green-700">Fresh A2 Milk</CardTitle>
                <CardDescription className="text-lg font-semibold">
                  ₹80/liter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Pure, fresh A2 milk from our Gir cows, delivered daily
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="A2 Ghee"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-green-700">A2 Ghee</CardTitle>
                <CardDescription className="text-lg font-semibold">
                  ₹3000/kg
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Traditional ghee made from A2 milk, rich in flavor and
                  nutrition
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Fresh Paneer"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-green-700">Fresh Paneer</CardTitle>
                <CardDescription className="text-lg font-semibold">
                  ₹320/kg
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Soft, fresh paneer made from pure A2 milk
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-green-50">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <div>
                    <CardTitle className="text-lg">Jignesh Modi</CardTitle>
                    <CardDescription>Manjalpur</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  "The quality of A2 milk from Ram Dairy Farm is exceptional. My
                  family has been using their products for over a year, and we
                  can taste the difference. Highly recommended!"
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div>
                    <CardTitle className="text-lg">Rajesh Patel</CardTitle>
                    <CardDescription>Vadodara</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  "Fresh milk delivery every morning and the curd is absolutely
                  pure. You can feel the authenticity in every product. Great
                  work by the Ram Dairy Farm team!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600">
              Get in touch with us for orders or any questions about our
              products.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Phone className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <CardTitle>Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">+91 99795 40446</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Mail className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">support@ramdairyfarm.in</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Village Rampur, Taluka Sevasi</p>
                <p className="text-gray-700">District Vadodara, Gujarat</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              asChild
            >
              <Link to="/order">Place Your Order</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Milk className="h-6 w-6" />
              <span className="text-xl font-bold">Ram Dairy Farm</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/products" className="hover:text-green-300">
                Products
              </Link>
              <Link to="/farm-visit" className="hover:text-green-300">
                Farm Visit
              </Link>
              <Link to="/blogs" className="hover:text-green-300">
                Blogs
              </Link>
              <Link to="/order" className="hover:text-green-300">
                Order
              </Link>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
            <p>
              &copy; 2024 Ram Dairy Farm. All rights reserved. Made with ❤️ for
              pure dairy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
