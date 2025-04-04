
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare, Star, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface MechanicInfo {
  id: string;
  name: string;
  rating: number;
  phone: string;
  eta: string;
  location: string;
}

interface ServiceRequest {
  id: string;
  status: string;
  vehicle: string;
  issue: string;
  location: string;
  createdAt: string;
  mechanic: MechanicInfo;
}

interface ServiceRequestStatusProps {
  request: ServiceRequest;
}

export function ServiceRequestStatus({ request }: ServiceRequestStatusProps) {
  const [progress, setProgress] = useState(30);
  const [statusText, setStatusText] = useState("Mechanic is on the way");
  const [etaMinutes, setEtaMinutes] = useState(15);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setStatusText("Mechanic has arrived");
          toast("Your mechanic has arrived at your location", {
            description: "Mike Mechanic has arrived to assist you.",
            action: {
              label: "View",
              onClick: () => console.log("View mechanic details"),
            },
          });
          return 100;
        }
        
        if (prev >= 70) {
          setStatusText("Mechanic is nearby");
        }
        
        return prev + 1;
      });
      
      setEtaMinutes((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000); // Update progress every second for demo purposes
    
    return () => clearInterval(timer);
  }, []);

  const formatRequestTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCancelRequest = () => {
    toast("Are you sure you want to cancel this request?", {
      action: {
        label: "Yes, Cancel",
        onClick: () => {
          toast.success("Service request cancelled successfully");
        },
      },
      cancel: {
        label: "No, Keep",
        onClick: () => {
          toast.info("Request kept active");
        },
      },
    });
  };

  const renderStatusBadge = () => {
    if (progress >= 100) {
      return <Badge className="bg-green-500">Mechanic Arrived</Badge>;
    }
    if (progress >= 70) {
      return <Badge className="bg-blue-500">Mechanic Nearby</Badge>;
    }
    return <Badge className="bg-amber-500">In Progress</Badge>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Service Request #{request.id} 
                  {renderStatusBadge()}
                </CardTitle>
                <CardDescription>
                  Requested at {formatRequestTime(request.createdAt)}
                </CardDescription>
              </div>
              <Button variant="destructive" onClick={handleCancelRequest}>
                Cancel Request
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Real-time Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{statusText}</span>
                  <span>{etaMinutes > 0 ? `ETA: ${etaMinutes} minutes` : "Arrived"}</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500 pt-1">
                  <span>Request Accepted</span>
                  <span>On the Way</span>
                  <span>Arrived</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Request Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Vehicle:</span>
                    <span className="font-medium">{request.vehicle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Issue:</span>
                    <span className="font-medium">{request.issue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium">{request.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Service Progress</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <div>
                      <p className="font-medium">Request Received</p>
                      <p className="text-gray-500 text-xs">{formatRequestTime(request.createdAt)}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <div>
                      <p className="font-medium">Mechanic Assigned</p>
                      <p className="text-gray-500 text-xs">{formatRequestTime(new Date(Date.now() - 3000000).toISOString())}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    {progress >= 100 ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-amber-500 border-dashed animate-pulse-slow mr-2 shrink-0" />
                    )}
                    <div>
                      <p className="font-medium">Mechanic Arrived</p>
                      <p className="text-gray-500 text-xs">
                        {progress >= 100 ? "Just now" : `Expected in ${etaMinutes} minutes`}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {progress >= 100 && (
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-green-800">Mechanic has arrived</h3>
                    <p className="text-sm text-green-700">Your mechanic is at your location and ready to help.</p>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Complete Service
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Your Mechanic</CardTitle>
            <CardDescription>
              Details about the mechanic assigned to your request
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src="/placeholder.svg" alt={request.mechanic.name} />
                <AvatarFallback>{request.mechanic.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{request.mechanic.name}</p>
                <div className="flex items-center text-sm text-amber-500">
                  <Star className="h-4 w-4 fill-current mr-1" />
                  <span>{request.mechanic.rating}</span>
                  <span className="text-gray-400 ml-1">(48 reviews)</span>
                </div>
                <p className="text-xs text-gray-500">ID: {request.mechanic.id}</p>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button variant="outline" className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Call Mechanic
              </Button>
              <Button variant="outline" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium text-sm mb-2">Mechanic Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium">{request.mechanic.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Location:</span>
                  <span className="font-medium">{request.mechanic.location}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-blue-600 mr-2 shrink-0" />
                <div>
                  <p className="font-medium text-blue-700">Safety Tip</p>
                  <p className="text-blue-600">Verify the mechanic's ID before accepting service. All our mechanics wear official uniforms and carry ID badges.</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Report an Issue
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
