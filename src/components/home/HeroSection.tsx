
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative bg-brand-blue pb-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-blue/70" />
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
      </div>
      
      <div className="container mx-auto px-4 pt-12 pb-24 lg:pt-24 lg:pb-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              On-Road Breakdown <span className="text-brand-orange">Assistance</span> at Your Fingertips
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-lg">
              Connect with qualified mechanics instantly when you need help the most. Fast, reliable roadside assistance wherever you are.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 w-full sm:w-auto text-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
            </div>
            
            <div className="flex flex-wrap gap-8 pt-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-3">
                  <span className="text-2xl font-bold text-brand-orange">5k+</span>
                </div>
                <p className="text-sm">
                  Mechanics<br />Nationwide
                </p>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-3">
                  <span className="text-2xl font-bold text-brand-orange">15k+</span>
                </div>
                <p className="text-sm">
                  Happy<br />Customers
                </p>
              </div>
             
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute -top-12 -left-12 w-72 h-72 bg-brand-orange/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl" />
            <div className="relative bg-white p-4 rounded-xl shadow-2xl rotate-3">
              <img 
                src="placeholder.svg" 
                alt="Mechanic helping customer" 
                className="w-full rounded-lg h-[300px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg -rotate-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Mechanic arriving</p>
                    <p className="text-sm text-gray-500">ETA: 12 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden sm:block h-16 bg-gradient-to-b from-brand-blue to-background absolute bottom-0 left-0 right-0"></div>
    </div>
  );
}
