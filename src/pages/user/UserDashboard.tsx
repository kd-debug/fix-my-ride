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
import { getUserServiceRequests } from "@/services/serviceRequestService";

const activeRequest = {
  id: "SR12345",
  status: "in-progress",
  vehicle: "Toyota Camry",
  issue: "Flat tire",
  location: "123 Main St, City",
  createdAt: new Date(Date.now() - 3600000).toISOString(),
  mechanic: {
    id: "M123",
    name: "Mike Mechanic",
    rating: 4.8,
    phone: "+1 (555) 987-6543",
    eta: "15 min",
    location: "1.5 miles away",
  }
};

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [hasActiveRequest, setHasActiveRequest] = useState(false);
  const [activeRequest, setActiveRequest] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const userRequests = getUserServiceRequests(currentUser.id);
      const activeRequests = userRequests.filter(req =>
        req.status === "pending" || req.status === "in-progress"
      );
      setHasActiveRequest(activeRequests.length > 0);
      if (activeRequests.length > 0) {
        setActiveRequest(activeRequests[0]);
      }
    }
  }, [currentUser]);

  const handleNewRequest = () => {
    setHasActiveRequest(true);
    setActiveTab("active-request");
  };

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

      {hasActiveRequest && (
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800">Active Service Request</AlertTitle>
          <AlertDescription className="text-amber-700">
            You have an active service request with Mike Mechanic. Estimated arrival time: 15 minutes.
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
                    <p className="text-2xl font-bold text-brand-blue">3</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-green-600">2</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-medium">Flat Tire Assistance</p>
                        <p className="text-sm text-gray-500">Toyota Camry • 3 hours ago</p>
                      </div>
                      <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-medium">
                        In Progress
                      </span>
                    </div>
                    <div className="p-3 border rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-medium">Battery Jump Start</p>
                        <p className="text-sm text-gray-500">Honda Civic • 2 days ago</p>
                      </div>
                      <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium">
                        Completed
                      </span>
                    </div>
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
          <ServiceRequestStatus request={activeRequest} />
        </TabsContent>

        <TabsContent value="mechanics">
          <MechanicList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
