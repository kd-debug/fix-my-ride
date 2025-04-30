import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRequestForm } from "@/components/user/UserRequestForm";
import { ServiceRequestStatus } from "@/components/user/ServiceRequestStatus";
import { MechanicList } from "@/components/user/MechanicList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, ClipboardList, MapPin, Star, UserCheck } from "lucide-react";
import { getUserServiceRequests, ServiceRequest } from "@/services/serviceRequestService";

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [hasActiveRequest, setHasActiveRequest] = useState(false);
  const [activeRequest, setActiveRequest] = useState<ServiceRequest | null>(null);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServiceRequests = async () => {
      if (currentUser) {
        try {
          setIsLoading(true);
          const requests = await getUserServiceRequests();
          setServiceRequests(requests);

          const activeRequests = requests.filter(req =>
            req.status === "pending" || req.status === "in-progress"
          );
          setHasActiveRequest(activeRequests.length > 0);
          if (activeRequests.length > 0) {
            setActiveRequest(activeRequests[0]);
          }
        } catch (error) {
          console.error('Error fetching service requests:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchServiceRequests();
  }, [currentUser]);

  const handleNewRequest = () => {
    setHasActiveRequest(true);
    setActiveTab("active-request");
  };

  const completedRequests = serviceRequests.filter(req => req.status === "completed").length;
  const recentRequests = [...serviceRequests]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <Button
            onClick={() => setActiveTab("new-request")}
            className="bg-brand-orange hover:bg-brand-orange/90"
            disabled={hasActiveRequest}
          >
            Request Service
          </Button>
        </div>
      </div>

      {hasActiveRequest && activeRequest && (
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800">Active Service Request</AlertTitle>
          <AlertDescription className="text-amber-700">
            You have an active service request with {activeRequest.assignedMechanic?.name || 'a mechanic'}.
            {activeRequest.assignedMechanic?.phone && ` Contact: ${activeRequest.assignedMechanic.phone}`}
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <ClipboardList className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="new-request" disabled={hasActiveRequest} className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>Request Service</span>
          </TabsTrigger>
          <TabsTrigger value="active-request" disabled={!hasActiveRequest} className="flex items-center gap-1">
            <UserCheck className="h-4 w-4" />
            <span>Active Request</span>
          </TabsTrigger>
          <TabsTrigger value="mechanics" className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>Mechanics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Welcome back, {currentUser?.name}</CardTitle>
                <CardDescription>
                  Here's an overview of your service requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Total Requests</p>
                    <p className="text-2xl font-bold text-brand-blue">{serviceRequests.length}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{completedRequests}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    {isLoading ? (
                      <div className="text-center py-4">Loading...</div>
                    ) : recentRequests.length > 0 ? (
                      recentRequests.map((request) => (
                        <div key={request.id} className="p-3 border rounded-md flex justify-between items-center">
                          <div>
                            <p className="font-medium">{request.issue}</p>
                            <p className="text-sm text-gray-500">
                              {request.vehicleType} {request.vehicleModel} • {new Date(request.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <span className={`${request.status === 'completed' ? 'text-green-600 bg-green-50' :
                            request.status === 'in-progress' ? 'text-amber-600 bg-amber-50' :
                              'text-blue-600 bg-blue-50'
                            } px-2 py-1 rounded text-xs font-medium`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">No recent activity</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common service requests and support options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab("new-request")} disabled={hasActiveRequest}>
                  <MapPin className="mr-2 h-4 w-4" />
                  Request Roadside Assistance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="mr-2 h-4 w-4" />
                  View Past Mechanic Ratings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report an Issue
                </Button>

                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <h3 className="font-medium text-blue-800 mb-2">
                    Need Immediate Help?
                  </h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Call our 24/7 emergency support line for urgent assistance.
                  </p>
                  <p className="text-lg font-bold text-blue-800">
                    +1 (555) 123-4567
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="new-request">
          <UserRequestForm onRequestSubmit={handleNewRequest} />
        </TabsContent>

        <TabsContent value="active-request">
          {activeRequest && <ServiceRequestStatus request={activeRequest} />}
        </TabsContent>

        <TabsContent value="mechanics">
          <MechanicList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
