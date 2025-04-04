
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestList } from "@/components/mechanic/RequestList";
import { MechanicProfile } from "@/components/mechanic/MechanicProfile";
import { MechanicStats } from "@/components/mechanic/MechanicStats";
import { CalendarClock, CheckCircle2, Clock, ListTodo, User } from "lucide-react";

const MechanicDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

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
              <MechanicStats />
              
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
                      requests={[
                        {
                          id: "SR12345",
                          customerName: "John Smith",
                          vehicleInfo: "Toyota Camry",
                          issue: "Flat tire",
                          location: "123 Main St, City",
                          distance: "1.5 miles",
                          status: "pending",
                          createdAt: new Date(Date.now() - 1200000).toISOString(),
                        },
                        {
                          id: "SR12346",
                          customerName: "Sarah Johnson",
                          vehicleInfo: "Honda Civic",
                          issue: "Dead battery",
                          location: "456 Oak Ave, City",
                          distance: "2.3 miles",
                          status: "pending",
                          createdAt: new Date(Date.now() - 2400000).toISOString(),
                        }
                      ]} 
                      type="pending"
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
                requests={[
                  {
                    id: "SR12345",
                    customerName: "John Smith",
                    vehicleInfo: "Toyota Camry",
                    issue: "Flat tire",
                    location: "123 Main St, City",
                    distance: "1.5 miles",
                    status: "pending",
                    createdAt: new Date(Date.now() - 1200000).toISOString(),
                  },
                  {
                    id: "SR12346",
                    customerName: "Sarah Johnson",
                    vehicleInfo: "Honda Civic",
                    issue: "Dead battery",
                    location: "456 Oak Ave, City",
                    distance: "2.3 miles",
                    status: "pending",
                    createdAt: new Date(Date.now() - 2400000).toISOString(),
                  },
                  {
                    id: "SR12347",
                    customerName: "Michael Brown",
                    vehicleInfo: "Ford F-150",
                    issue: "Engine trouble",
                    location: "789 Pine St, City",
                    distance: "3.7 miles",
                    status: "pending",
                    createdAt: new Date(Date.now() - 3600000).toISOString(),
                  }
                ]} 
                type="pending"
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
                requests={[
                  {
                    id: "SR12348",
                    customerName: "Emily Wilson",
                    vehicleInfo: "Nissan Altima",
                    issue: "Locked out",
                    location: "321 Elm St, City",
                    distance: "1.2 miles",
                    status: "active",
                    createdAt: new Date(Date.now() - 1800000).toISOString(),
                  }
                ]} 
                type="active"
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
                requests={[
                  {
                    id: "SR12340",
                    customerName: "Robert Davis",
                    vehicleInfo: "Chevrolet Malibu",
                    issue: "Battery replacement",
                    location: "567 Maple Ave, City",
                    distance: "2.8 miles",
                    status: "completed",
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    completedAt: new Date(Date.now() - 82800000).toISOString(),
                  },
                  {
                    id: "SR12339",
                    customerName: "Jessica Lee",
                    vehicleInfo: "BMW 3 Series",
                    issue: "Flat tire",
                    location: "890 Cedar St, City",
                    distance: "3.4 miles",
                    status: "completed",
                    createdAt: new Date(Date.now() - 172800000).toISOString(),
                    completedAt: new Date(Date.now() - 169200000).toISOString(),
                  }
                ]} 
                type="completed"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MechanicDashboard;
