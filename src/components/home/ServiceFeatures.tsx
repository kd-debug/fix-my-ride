
import { Card, CardContent } from "@/components/ui/card";
import { Car, Clock, MapPin, Zap, Shield, ThumbsUp } from "lucide-react";

export function ServiceFeatures() {
  const features = [
    {
      icon: <Clock className="h-10 w-10 text-blue-600" />,
      title: "Fast Response",
      description: "Get connected with nearby mechanics in minutes, not hours.",
    },
    {
      icon: <MapPin className="h-10 w-10 text-blue-600" />,
      title: "Real-time Tracking",
      description: "Track your mechanic's location and arrival time in real-time.",
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-600" />,
      title: "Vetted Mechanics",
      description: "All mechanics are verified professionals with required certifications.",
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-blue-600" />,
      title: "Transparent Ratings",
      description: "Choose mechanics based on genuine customer ratings and reviews.",
    },
    {
      icon: <Car className="h-10 w-10 text-blue-600" />,
      title: "All Vehicle Types",
      description: "Service for cars, SUVs, trucks, motorcycles, and more.",
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-600" />,
      title: "Simple Process",
      description: "Request service with just a few taps on your device.",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Emergency Assistance Made <span className="text-brand-blue">Simple</span>
          </h2>
          <p className="text-lg text-gray-600">
            Our platform connects you with skilled mechanics nearby for quick, reliable roadside assistance when you need it most.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
