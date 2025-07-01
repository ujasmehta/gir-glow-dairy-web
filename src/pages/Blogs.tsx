import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Milk, ArrowLeft, Calendar, User } from "lucide-react";

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Sacred Gir Cow: India's Ancient Treasure",
      excerpt:
        "Discover the rich history and unique characteristics of Gir cows, one of India's most revered cattle breeds.",
      author: "Dr. Ramesh Patel",
      date: "March 15, 2024",
      image:
        "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "A2 vs A1 Milk: Understanding the Difference",
      excerpt:
        "Learn about the science behind A2 milk and why it's considered superior for human health and digestion.",
      author: "Nutritionist Priya Pathak",
      date: "March 10, 2024",
      image:
        "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Sustainable Dairy Farming: Our Approach",
      excerpt:
        "How we maintain eco-friendly practices while ensuring the highest quality milk production at Ram Dairy Farm.",
      author: "Farm Manager Sunil Kumar",
      date: "March 5, 2024",
      image:
        "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "The Nutritional Benefits of Fresh Ghee",
      excerpt:
        "Explore the ancient wisdom behind ghee consumption and its modern health benefits when made from A2 milk.",
      author: "Ayurveda Expert Dr. Meera Joshi",
      date: "February 28, 2024",
      image:
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "4 min read",
    },
    {
      id: 5,
      title: "From Farm to Table: Our Quality Process",
      excerpt:
        "Take a behind-the-scenes look at how we ensure the highest quality from milking to delivery.",
      author: "Quality Manager Rajesh Mehta",
      date: "February 22, 2024",
      image:
        "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "8 min read",
    },
    {
      id: 6,
      title: "Traditional Cow Care Methods",
      excerpt:
        "How ancient Indian practices of cow care contribute to better milk quality and cow welfare.",
      author: "Veterinarian Dr. Amit Patel",
      date: "February 15, 2024",
      image:
        "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      readTime: "6 min read",
    },
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
                <span className="text-2xl font-bold text-green-800">
                  Ram Dairy Farm
                </span>
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
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
              <Link to="/blogs" className="text-green-600 font-medium">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Farm Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest insights on dairy farming, A2 milk
            benefits, and traditional cow care practices from our experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-green-700 line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-gray-600 line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-green-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">
            Subscribe to our newsletter for the latest farm updates and dairy
            insights.
          </p>
          <div className="max-w-md mx-auto flex space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Blog Categories
          </h2>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-700">Cow Care</h3>
              <p className="text-sm text-gray-600 mt-2">
                Traditional and modern practices
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-700">A2 Milk Benefits</h3>
              <p className="text-sm text-gray-600 mt-2">
                Health and nutrition insights
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-700">
                Sustainable Farming
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Eco-friendly practices
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-700">Farm Life</h3>
              <p className="text-sm text-gray-600 mt-2">
                Daily life and stories
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
