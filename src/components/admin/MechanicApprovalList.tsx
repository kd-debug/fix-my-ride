import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Check, X, FileText, Phone, Mail, MapPin, Calendar, Eye, Download } from "lucide-react";

// Sample mechanic approval requests
const mechanicRequests = [
  {
    id: "M001",
    name: "John Mechanic",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Mechanic St, City",
    experience: "5 years of experience in engine repair and electrical systems",
    appliedAt: "2023-04-01T12:30:00Z",
    status: "pending",
    certification: "certification.pdf",
  },
  {
    id: "M002",
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Repair Ave, City",
    experience: "8 years specializing in foreign cars and transmission repair",
    appliedAt: "2023-04-02T10:15:00Z",
    status: "pending",
    certification: "certification.pdf",
  },
  {
    id: "M003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Service St, City",
    experience: "3 years of experience with motorcycle and car repairs",
    appliedAt: "2023-04-03T14:45:00Z",
    status: "pending",
    certification: "certification.pdf",
  },
];

interface MechanicRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  experience: string;
  appliedAt: string;
  status: string;
  certification: string;
}

export function MechanicApprovalList() {
  const [requests, setRequests] = useState<MechanicRequest[]>(mechanicRequests);
  const [selectedMechanic, setSelectedMechanic] = useState<MechanicRequest | null>(null);
  const [filterTab, setFilterTab] = useState("all");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleApprove = (id: string) => {
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === id ? { ...req, status: "approved" } : req
      )
    );
    toast.success(`Mechanic ${id} has been approved`);
  };

  const handleReject = (id: string) => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="font-medium">Confirm Rejection</p>
        <p className="text-sm text-gray-500">Are you sure you want to reject this mechanic application?</p>
        <div className="flex justify-end gap-2 mt-3">
          <Button variant="outline" size="sm" onClick={() => toast.dismiss(t)}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => {
              setRequests(prevRequests => 
                prevRequests.map(req => 
                  req.id === id ? { ...req, status: "rejected" } : req
                )
              );
              toast.error(`Mechanic ${id} has been rejected`);
              toast.dismiss(t);
            }}
          >
            Yes, Reject
          </Button>
        </div>
      </div>
    ));
  };

  const handleViewDetails = (mechanic: MechanicRequest) => {
    setSelectedMechanic(mechanic);
  };

  const filteredRequests = () => {
    switch(filterTab) {
      case "pending":
        return requests.filter(req => req.status === "pending");
      case "approved":
        return requests.filter(req => req.status === "approved");
      case "rejected":
        return requests.filter(req => req.status === "rejected");
      default:
        return requests;
    }
  };

  return (
    <div>
      <Tabs defaultValue="all" value={filterTab} onValueChange={setFilterTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {filteredRequests().length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No {filterTab === "all" ? "" : filterTab} mechanic requests found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests().map((request) => (
            <div key={request.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt={request.name} />
                    <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h3 className="font-medium">{request.name}</h3>
                    <p className="text-xs text-gray-500">
                      ID: {request.id} • Applied: {formatDate(request.appliedAt)}
                    </p>
                  </div>
                </div>
                
                <Badge 
                  className={
                    request.status === "pending" ? "bg-amber-500" : 
                    request.status === "approved" ? "bg-green-500" : 
                    "bg-red-500"
                  }
                >
                  {request.status === "pending" ? "Pending" : 
                   request.status === "approved" ? "Approved" : 
                   "Rejected"}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-start space-x-2">
                  <FileText className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Experience</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{request.experience}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <MapPin className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-gray-600">{request.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {request.status === "pending" && (
                  <>
                    <Button 
                      onClick={() => handleApprove(request.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleReject(request.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      onClick={() => handleViewDetails(request)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Mechanic Application Details</DialogTitle>
                      <DialogDescription>
                        Review the complete information for this mechanic
                      </DialogDescription>
                    </DialogHeader>
                    
                    {selectedMechanic && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src="/placeholder.svg" alt={selectedMechanic.name} />
                            <AvatarFallback>{selectedMechanic.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold text-lg">{selectedMechanic.name}</h3>
                            <p className="text-sm text-gray-500">ID: {selectedMechanic.id}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 text-gray-500 mr-3 shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-sm">{selectedMechanic.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Phone className="h-5 w-5 text-gray-500 mr-3 shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Phone</p>
                              <p className="text-sm">{selectedMechanic.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-gray-500 mr-3 shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Address</p>
                              <p className="text-sm">{selectedMechanic.address}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <FileText className="h-5 w-5 text-gray-500 mr-3 shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Experience</p>
                              <p className="text-sm">{selectedMechanic.experience}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-gray-500 mr-3 shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Applied On</p>
                              <p className="text-sm">{formatDate(selectedMechanic.appliedAt)}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded-md">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Download className="h-5 w-5 text-blue-600 mr-2" />
                              <span className="text-sm font-medium text-blue-700">
                                Certification Document
                              </span>
                            </div>
                            <Button size="sm" variant="outline" className="text-blue-600 border-blue-200">
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <DialogFooter className="gap-2 sm:gap-0">
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                      
                      {selectedMechanic && selectedMechanic.status === "pending" && (
                        <>
                          <Button 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              handleApprove(selectedMechanic.id);
                            }}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => {
                              handleReject(selectedMechanic.id);
                            }}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
