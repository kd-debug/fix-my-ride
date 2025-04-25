
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FormInput, Car, Navigation, CheckCircle } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <FormInput className="h-12 w-12 text-brand-orange" />,
      title: "Request Service",
      description: "Fill out a simple form describing your vehicle issue and location.",
    },
    {
      icon: <Car className="h-12 w-12 text-brand-orange" />,
      title: "Get Matched",
      description: "We'll connect you with available mechanics in your area.",
    },
    {
      icon: <Navigation className="h-12 w-12 text-brand-orange" />,
      title: "Track Arrival",
      description: "Follow your mechanic's journey to your location in real-time.",
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-brand-orange" />,
      title: "Problem Solved",
      description: "Get back on the road quickly with professional assistance.",
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How <span className="text-brand-blue">FixMyRide</span> Works
          </h2>
          <p className="text-lg text-gray-600">
            Getting help is quick and easy with our streamlined process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="flex justify-center mb-6">
                <div className="h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(100%-12px)] w-full h-0.5 bg-gray-200">
                  <div className="absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2">
                    <div className="h-6 w-6 rounded-full bg-brand-blue text-white flex items-center justify-center">
                      <span className="text-xs">→</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/register">
            <Button className="bg-brand-blue hover:bg-brand-blue/90 px-8 py-6 h-auto text-lg">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
