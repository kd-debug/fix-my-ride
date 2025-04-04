
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, DollarSign, Award } from "lucide-react";

export function BecomeMechanic() {
  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-brand-orange" />,
      title: "Flexible Schedule",
      description: "Work when you want and choose service requests that fit your availability.",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-brand-orange" />,
      title: "Competitive Pay",
      description: "Earn competitive rates for each service you provide to customers.",
    },
    {
      icon: <Award className="h-8 w-8 text-brand-orange" />,
      title: "Build Your Reputation",
      description: "Grow your customer base through ratings and reviews on our platform.",
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Join Our Network of <span className="text-brand-blue">Professional Mechanics</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Are you a skilled mechanic looking to expand your client base? Join our platform to connect with customers in need of roadside assistance.
              </p>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 mt-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/register">
                  <Button className="bg-brand-blue hover:bg-brand-blue/90 text-lg">
                    Apply as a Mechanic
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/placeholder.svg" 
                alt="Mechanic at work" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
