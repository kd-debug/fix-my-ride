
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Car, Clock, MapPin, Check, X, ArrowRight } from "lucide-react";

interface ServiceRequest {
  id: string;
  customerName: string;
  vehicleInfo: string;
  issue: string;
  location: string;
  distance: string;
  status: "pending" | "active" | "completed" | "canceled";
  createdAt: string;
  completedAt?: string;
}

interface RequestListProps {
  requests: ServiceRequest[];
  type: "pending" | "active" | "completed";
}

export function RequestList({ requests, type }: RequestListProps) {
  const formatRequestTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatRequestDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleAcceptRequest = (requestId: string) => {
    toast.success(`Request ${requestId} accepted`);
  };

  const handleRejectRequest = (requestId: string) => {
    toast("Are you sure you want to reject this request?", {
      action: {
        label: "Yes, Reject",
        onClick: () => {
          toast.error(`Request ${requestId} rejected`);
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  const handleMarkComplete = (requestId: string) => {
    toast.success(`Request ${requestId} marked as complete`);
  };

  const handleViewDetails = (requestId: string) => {
    toast.info(`Viewing details for request ${requestId}`);
  };

  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No {type} requests found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div key={request.id} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" alt={request.customerName} />
                <AvatarFallback>{request.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h3 className="font-medium">{request.customerName}</h3>
                <p className="text-xs text-gray-500">
                  Request #{request.id} • {formatRequestTime(request.createdAt)}
                </p>
              </div>
            </div>
            
            <Badge 
              className={
                request.status === "pending" ? "bg-amber-500" : 
                request.status === "active" ? "bg-blue-500" : 
                "bg-green-500"
              }
            >
              {request.status === "pending" ? "Pending" : 
               request.status === "active" ? "In Progress" : 
               "Completed"}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start space-x-2">
              <Car className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Vehicle Information</p>
                <p className="text-sm text-gray-600">{request.vehicleInfo}</p>
                <p className="text-sm text-gray-600">Issue: {request.issue}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-gray-600">{request.location}</p>
                <p className="text-sm text-gray-600">Distance: {request.distance}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {type === "pending" && (
              <>
                <Button 
                  onClick={() => handleAcceptRequest(request.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Accept
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleRejectRequest(request.id)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </>
            )}
            
            {type === "active" && (
              <>
                <Button 
                  onClick={() => handleMarkComplete(request.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Mark as Complete
                </Button>
                <Button variant="outline">
                  Contact Customer
                </Button>
              </>
            )}
            
            {type === "completed" && (
              <div className="flex items-center text-sm text-gray-500 w-full justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Completed on {request.completedAt ? formatRequestDate(request.completedAt) : 'Unknown'}
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleViewDetails(request.id)}>
                  View Details
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
