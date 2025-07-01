
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Milk, ArrowLeft } from "lucide-react";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Fresh A2 Milk",
      price: "₹80/liter",
      description: "Pure, fresh A2 milk from our Gir cows, delivered daily",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "A2 Ghee",
      price: "₹3000/kg",
      description: "Traditional ghee made from A2 milk, rich in flavor and nutrition",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Fresh Paneer",
      price: "₹320/kg",
      description: "Soft, fresh paneer made from pure A2 milk",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "A2 Curd",
      price: "₹60/500g",
      description: "Creamy, probiotic-rich curd made from fresh A2 milk",
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      name: "Buttermilk",
      price: "₹40/500ml",
      description: "Refreshing traditional buttermilk, perfect for digestion",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      name: "A2 Cheese",
      price: "₹450/250g",
      description: "Artisanal cheese crafted from premium A2 milk",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

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
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">Home</Link>
              <Link to="/products" className="text-green-600 font-medium">Products</Link>
              <Link to="/farm-visit" className="text-gray-700 hover:text-green-600 font-medium">Farm Visit</Link>
              <Link to="/blogs" className="text-gray-700 hover:text-green-600 font-medium">Blogs</Link>
              <Link to="/order" className="text-gray-700 hover:text-green-600 font-medium">Order</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Premium A2 Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of fresh, pure dairy products made from the finest A2 milk 
            from our beloved Gir cows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-green-700">{product.name}</CardTitle>
                <CardDescription className="text-lg font-semibold text-gray-900">
                  {product.price}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link to="/order">Order Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-green-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Products?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Farm Fresh</h3>
              <p>Delivered within 24 hours of milking</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Pure A2</h3>
              <p>100% A2 protein from Gir cows</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">No Additives</h3>
              <p>Natural products with no preservatives</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
