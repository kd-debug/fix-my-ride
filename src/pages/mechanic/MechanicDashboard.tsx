
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestList } from "@/components/mechanic/RequestList";
import { MechanicProfile } from "@/components/mechanic/MechanicProfile";
import { MechanicStats } from "@/components/mechanic/MechanicStats";
import { CalendarClock, CheckCircle2, Clock, ListTodo, User } from "lucide-react";
import { 
  getPendingServiceRequests, 
  getMechanicActiveRequests, 
  getMechanicCompletedRequests,
  ServiceRequest
} from "@/services/serviceRequestService";

const MechanicDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [pendingRequests, setPendingRequests] = useState<ServiceRequest[]>([]);
  const [activeRequests, setActiveRequests] = useState<ServiceRequest[]>([]);
  const [completedRequests, setCompletedRequests] = useState<ServiceRequest[]>([]);
  
  const loadRequests = () => {
    if (!currentUser) return;
    
    // Load all types of requests
    setPendingRequests(getPendingServiceRequests());
    
    if (currentUser.id) {
      setActiveRequests(getMechanicActiveRequests(currentUser.id));
      setCompletedRequests(getMechanicCompletedRequests(currentUser.id));
    }
  };
  
  // Load requests initially and whenever currentUser changes
  useEffect(() => {
    loadRequests();
  }, [currentUser]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mechanic Dashboard</h1>
        <Button variant="outline" className="flex items-center gap-1">
          <User className="h-4 w-4" />
          My Profile
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <ListTodo className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Pending Requests</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-1">
            <CalendarClock className="h-4 w-4" />
            <span>Active Requests</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            <span>Completed</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MechanicStats 
                pendingCount={pendingRequests.length} 
                activeCount={activeRequests.length} 
                completedCount={completedRequests.length} 
              />
              
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Service Requests</CardTitle>
                    <CardDescription>
                      Recent customer requests for your services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RequestList 
                      requests={pendingRequests.slice(0, 2)} 
                      type="pending"
                      onRequestUpdated={loadRequests}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <MechanicProfile />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Service Requests</CardTitle>
              <CardDescription>
                New requests waiting for your acceptance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RequestList 
                requests={pendingRequests} 
                type="pending"
                onRequestUpdated={loadRequests}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Service Requests</CardTitle>
              <CardDescription>
                Requests you're currently working on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RequestList 
                requests={activeRequests} 
                type="active"
                onRequestUpdated={loadRequests}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Service Requests</CardTitle>
              <CardDescription>
                Service requests you've successfully completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RequestList 
                requests={completedRequests} 
                type="completed"
                onRequestUpdated={loadRequests}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MechanicDashboard;
