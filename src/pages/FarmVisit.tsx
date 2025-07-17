import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Milk, ArrowLeft, Clock, MapPin, Users, Calendar } from "lucide-react";

const FarmVisit = () => {
  const visitHighlights = [
    {
      icon: Users,
      title: "Meet Our Gir Cows",
      description:
        "Get up close with our sacred Gir cows and learn about their care",
    },
    {
      icon: Clock,
      title: "Milking Experience",
      description:
        "Witness the traditional milking process and learn about A2 milk",
    },
    {
      icon: MapPin,
      title: "Farm Tour",
      description: "Explore our organic farm and sustainable farming practices",
    },
    {
      icon: Calendar,
      title: "Educational Programs",
      description: "Learn about dairy farming, cow care, and milk processing",
    },
  ];

  const visitPlans = [
    {
      name: "Individual Visit",
      price: "Complementry",
      duration: "2 hours",
      includes: [
        "Farm tour",
        "Cow interaction",
        "Photo opportunities",
      ],
    },
    {
      name: "Family Package",
      price: "Complementry",
      duration: "1 hours",
      includes: [
        "Extended farm tour",
        "Milking experience",
        "Fresh snacks- on Purchase",
        "Take-home milk - On Purchase",
        "Family photos",
      ],
    },
    {
      name: "School Groups",
      price: "Complementry",
      duration: "3 hours",
      includes: [
        "Educational tour",
        "Interactive sessions",
        "Learning materials",
        "Certificate",
      ],
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
              <Link to="/farm-visit" className="text-green-600 font-medium">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Visit Ram Dairy Farm
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience authentic dairy farming and meet our sacred Gir cows.
            Perfect for families, students, and anyone interested in sustainable
            agriculture.
          </p>
        </div>

        {/* Farm Image */}
        <div className="mb-12">
          <img
            src="https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Ram Dairy Farm"
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Visit Highlights */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What You'll Experience
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visitHighlights.map((highlight, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <highlight.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{highlight.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Visit Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Visit Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {visitPlans.map((plan, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <CardTitle className="text-green-700">{plan.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-gray-900">
                    {plan.price}
                  </CardDescription>
                  <CardDescription className="text-sm text-gray-600">
                    Duration: {plan.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3">Includes:</h4>
                  <ul className="space-y-2 mb-6">
                    {plan.includes.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-600 flex items-center"
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Booking - Coming Soon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Visit Information */}
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Visit Information
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Timings</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>Monday - Saturday: 8:00 AM - 5:00 PM</li>
                <li>Sunday: 9:00 AM - 4:00 PM</li>
                <li>Morning milking: 6:00 AM - 8:00 AM</li>
                <li>Evening milking: 5:00 PM - 7:00 PM</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mb-3">
                What to Bring
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Comfortable walking shoes</li>
                <li>• Hat and sunscreen</li>
                <li>• Camera for memories</li>
                <li>• Water bottle</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
              <p className="text-gray-600 mb-4">
                Ram Dairy Farm
                <br />
                Village Rampur, Vadodara
                <br />
                Gujarat, India - 393265
              </p>

              <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Phone: +91 99795 40446</li>
                <li>Email: support@ramdairyfarm.in</li>
                <li>WhatsApp: +91 99795 40446</li>
              </ul>

              <Button className="mt-4 bg-green-600 hover:bg-green-700">
                Get Directions - Coming Soon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmVisit;
