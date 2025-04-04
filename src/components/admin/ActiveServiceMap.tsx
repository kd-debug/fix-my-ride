
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Car, Wrench, Clock, ArrowRight } from "lucide-react";

export function ActiveServiceMap() {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="active">Active Only</TabsTrigger>
            <TabsTrigger value="mechanics">Mechanics</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2">
          <Select defaultValue="city">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="city">City Center</SelectItem>
              <SelectItem value="north">North District</SelectItem>
              <SelectItem value="south">South District</SelectItem>
              <SelectItem value="east">East District</SelectItem>
              <SelectItem value="west">West District</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <MapPin className="h-4 w-4 mr-2" />
            Refresh Map
          </Button>
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden border relative">
        <div className="h-[400px] bg-gray-100">
          {!mapLoaded ? (
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin mb-4"></div>
                <p className="text-gray-500">Loading map data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* This would be replaced with an actual map component */}
              <div className="h-full bg-gray-100 relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Map Placeholder" 
                  className="w-full h-full object-cover opacity-50"
                />
                
                {/* Sample map pins */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="bg-blue-500 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      U
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
                  </div>
                </div>
                
                <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="bg-amber-500 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      M
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 h-4 w-4 rounded-full border-2 border-white"></div>
                  </div>
                </div>
                
                <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="bg-blue-500 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      U
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-amber-500 h-4 w-4 rounded-full border-2 border-white"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-1/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="bg-amber-500 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      M
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
                  </div>
                </div>
                
                {/* Map legend */}
                <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md">
                  <p className="text-sm font-medium mb-2">Map Legend</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-xs">User</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-xs">Mechanic</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-xs">Active Service</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium">Active Service Details</h3>
        
        <div className="space-y-3">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="John Smith" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="flex items-center">
                    <h3 className="font-medium">John Smith</h3>
                    <Badge className="ml-2 bg-green-500">In Progress</Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    Request #SR12345 • Started 35 minutes ago
                  </p>
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                View Details
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-2">
                <Car className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Vehicle</p>
                  <p className="text-sm text-gray-600">Toyota Camry</p>
                  <p className="text-sm text-gray-600">Issue: Flat tire</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-gray-600">123 Main St, City</p>
                  <p className="text-sm text-gray-600">City Center Area</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Wrench className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Assigned Mechanic</p>
                  <p className="text-sm text-gray-600">Mike Mechanic</p>
                  <p className="text-sm text-gray-600">ETA: 10 minutes</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="Emily Wilson" />
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="flex items-center">
                    <h3 className="font-medium">Emily Wilson</h3>
                    <Badge className="ml-2 bg-amber-500">Mechanic Assigned</Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    Request #SR12348 • Started 10 minutes ago
                  </p>
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                View Details
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-2">
                <Car className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Vehicle</p>
                  <p className="text-sm text-gray-600">Nissan Altima</p>
                  <p className="text-sm text-gray-600">Issue: Locked out</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-gray-600">321 Elm St, City</p>
                  <p className="text-sm text-gray-600">East District</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Status Updates</p>
                  <p className="text-sm text-gray-600">Mechanic en route</p>
                  <p className="text-sm text-gray-600">ETA: 15 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
