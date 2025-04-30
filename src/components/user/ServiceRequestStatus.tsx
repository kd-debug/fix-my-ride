import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { ServiceRequest } from "@/services/serviceRequestService";

interface ServiceRequestStatusProps {
  request: ServiceRequest;
}

export function ServiceRequestStatus({ request }: ServiceRequestStatusProps) {
  const handleCancelRequest = async () => {
    try {
      // Implement cancel request functionality
      toast.success("Service request cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel request");
      console.error("Error cancelling request:", error);
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'canceled':
        return <Badge className="bg-red-500">Canceled</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Service Request #{request.id.slice(-6)}</CardTitle>
          {renderStatusBadge(request.status)}
        </div>
        <CardDescription>
          Created on {new Date(request.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Vehicle Details</h4>
            <p className="text-sm">
              {request.vehicleType} - {request.vehicleModel}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Issue</h4>
            <p className="text-sm">{request.issue}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Location</h4>
            <p className="text-sm">{request.location}</p>
          </div>
          {request.assignedMechanic && (
            <div>
              <h4 className="text-sm font-medium mb-2">Assigned Mechanic</h4>
              <div className="flex items-center space-x-2">
                <p className="text-sm">{request.assignedMechanic.name}</p>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleCancelRequest}
          disabled={request.status === 'completed' || request.status === 'canceled'}
        >
          Cancel Request
        </Button>
        {request.assignedMechanic && (
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message Mechanic
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
