
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, Filter, MapPin, CheckCircle2 } from "lucide-react";

// Sample data for mechanics
const mechanicsData = [
  {
    id: "M123",
    name: "Mike Mechanic",
    rating: 4.8,
    reviewCount: 48,
    location: "1.5 miles away",
    specialties: ["Engine Repair", "Electrical Systems"],
    availability: "Available Now",
    completedJobs: 124,
  },
  {
    id: "M456",
    name: "Sarah Smith",
    rating: 4.9,
    reviewCount: 73,
    location: "2.3 miles away",
    specialties: ["Tire Replacement", "Battery Service"],
    availability: "Available Now",
    completedJobs: 201,
  },
  {
    id: "M789",
    name: "James Johnson",
    rating: 4.6,
    reviewCount: 35,
    location: "3.7 miles away",
    specialties: ["Transmission Repair", "Brake Service"],
    availability: "Busy until 2:30 PM",
    completedJobs: 89,
  },
  {
    id: "M012",
    name: "Lisa Lopez",
    rating: 4.7,
    reviewCount: 52,
    location: "4.1 miles away",
    specialties: ["Electrical Systems", "Diagnostics"],
    availability: "Available Now",
    completedJobs: 145,
  },
];

export function MechanicList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMechanics, setFilteredMechanics] = useState(mechanicsData);
  const [selectedMechanic, setSelectedMechanic] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredMechanics(mechanicsData);
      return;
    }
    
    const filtered = mechanicsData.filter(mechanic => 
      mechanic.name.toLowerCase().includes(term.toLowerCase()) ||
      mechanic.specialties.some(s => s.toLowerCase().includes(term.toLowerCase()))
    );
    
    setFilteredMechanics(filtered);
  };

  const handleMechanicClick = (id: string) => {
    setSelectedMechanic(id === selectedMechanic ? null : id);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Nearby Mechanics</CardTitle>
          <CardDescription>
            Browse and view profiles of mechanics in your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                type="search"
                placeholder="Search by name or specialty..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          
          {filteredMechanics.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No mechanics found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMechanics.map((mechanic) => (
                <div 
                  key={mechanic.id}
                  className={`border rounded-lg p-4 transition-colors ${selectedMechanic === mechanic.id ? 'border-primary bg-primary/5' : 'hover:border-gray-300'}`}
                  onClick={() => handleMechanicClick(mechanic.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" alt={mechanic.name} />
                        <AvatarFallback>{mechanic.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="font-medium">{mechanic.name}</h3>
                        <div className="flex items-center text-sm text-amber-500">
                          <Star className="h-4 w-4 fill-current mr-1" />
                          <span>{mechanic.rating}</span>
                          <span className="text-gray-400 ml-1">({mechanic.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {mechanic.location}
                        </div>
                      </div>
                    </div>
                    
                    <Badge 
                      className={mechanic.availability.includes("Available") 
                        ? "bg-green-500" 
                        : "bg-amber-500"
                      }
                    >
                      {mechanic.availability}
                    </Badge>
                  </div>
                  
                  {selectedMechanic === mechanic.id && (
                    <div className="mt-4 pt-4 border-t">
                      <Tabs defaultValue="about">
                        <TabsList className="mb-4">
                          <TabsTrigger value="about">About</TabsTrigger>
                          <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="about">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Specialties</h4>
                              <div className="flex flex-wrap gap-2">
                                {mechanic.specialties.map((specialty, index) => (
                                  <Badge key={index} variant="outline" className="bg-blue-50">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="bg-gray-50 p-2 rounded">
                                <p className="text-gray-500">Completed Jobs</p>
                                <p className="font-medium">{mechanic.completedJobs}</p>
                              </div>
                              <div className="bg-gray-50 p-2 rounded">
                                <p className="text-gray-500">Response Time</p>
                                <p className="font-medium">~10 minutes</p>
                              </div>
                            </div>
                            
                            <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">
                              View Full Profile
                            </Button>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="reviews">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Rating Breakdown</h4>
                                <div className="flex items-center mt-1">
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star 
                                        key={star} 
                                        className={`h-4 w-4 ${star <= Math.floor(mechanic.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm ml-2">Based on {mechanic.reviewCount} reviews</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="bg-gray-50 p-3 rounded">
                                <div className="flex items-start space-x-3">
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star 
                                        key={star} 
                                        className={`h-3 w-3 ${star <= 5 ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Amazing service, fixed my car quickly!</p>
                                    <p className="text-xs text-gray-500">John D. • 2 days ago</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-gray-50 p-3 rounded">
                                <div className="flex items-start space-x-3">
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star 
                                        key={star} 
                                        className={`h-3 w-3 ${star <= 4 ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Very professional and knowledgeable.</p>
                                    <p className="text-xs text-gray-500">Sarah T. • 1 week ago</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <Button variant="outline" className="w-full">
                              View All Reviews
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
