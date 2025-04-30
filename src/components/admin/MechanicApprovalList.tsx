import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Check, X, FileText, Phone, Mail, MapPin, Calendar, Eye, Download } from "lucide-react";
import { useAuth, MechanicApplication } from "@/contexts/AuthContext";

export function MechanicApprovalList() {
  const { mechanicApplications, updateMechanicApplication } = useAuth();
  const [selectedMechanic, setSelectedMechanic] = useState<MechanicApplication | null>(null);
  const [filterTab, setFilterTab] = useState("all");
  const [applications, setApplications] = useState<MechanicApplication[]>(mechanicApplications);

  // Update local state when mechanicApplications changes
  useEffect(() => {
    setApplications(mechanicApplications);
  }, [mechanicApplications]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleApprove = async (id: string) => {
    try {
      await updateMechanicApplication(id, "approved");

      // Update local state
      setApplications(prevApps =>
        prevApps.map(app =>
          app.id === id ? { ...app, status: "approved" } : app
        )
      );

      // Close dialog if open
      if (selectedMechanic?.id === id) {
        setSelectedMechanic(null);
      }

      toast.success("Mechanic application approved successfully");
    } catch (error) {
      console.error('Error approving mechanic:', error);
      toast.error("Failed to approve mechanic application");
    }
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
            onClick={async () => {
              try {
                await updateMechanicApplication(id, "rejected");

                // Update local state
                setApplications(prevApps =>
                  prevApps.map(app =>
                    app.id === id ? { ...app, status: "rejected" } : app
                  )
                );

                // Close dialog if open
                if (selectedMechanic?.id === id) {
                  setSelectedMechanic(null);
                }

                toast.success("Mechanic application rejected successfully");
                toast.dismiss(t);
              } catch (error) {
                console.error('Error rejecting mechanic:', error);
                toast.error("Failed to reject mechanic application");
              }
            }}
          >
            Yes, Reject
          </Button>
        </div>
      </div>
    ));
  };

  const handleViewDetails = (mechanic: MechanicApplication) => {
    setSelectedMechanic(mechanic);
  };

  const filteredRequests = () => {
    switch (filterTab) {
      case "pending":
        return applications.filter(req => req.status === "pending");
      case "approved":
        return applications.filter(req => req.status === "approved");
      case "rejected":
        return applications.filter(req => req.status === "rejected");
      default:
        return applications;
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
