
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { MechanicApprovalList } from "@/components/admin/MechanicApprovalList";
import { ServiceOverview } from "@/components/admin/ServiceOverview";
import { ActiveServiceMap } from "@/components/admin/ActiveServiceMap";
import { ClipboardList, Users, Map, Search, Bell, Settings } from "lucide-react";

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input 
          placeholder="Search for mechanics, customers, or service requests..." 
          className="pl-10"
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <ClipboardList className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="mechanic-approvals" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Mechanic Approvals</span>
          </TabsTrigger>
          <TabsTrigger value="service-map" className="flex items-center gap-1">
            <Map className="h-4 w-4" />
            <span>Service Map</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <ServiceOverview />
        </TabsContent>
        
        <TabsContent value="mechanic-approvals">
          <Card>
            <CardHeader>  
              <CardTitle>Mechanic Approval Requests</CardTitle>
              <CardDescription>
                Manage new mechanic applications and approve qualified professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MechanicApprovalList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="service-map">
          <Card>
            <CardHeader>
              <CardTitle>Active Service Map</CardTitle>
              <CardDescription>
                Real-time view of ongoing service requests and mechanic locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActiveServiceMap />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
