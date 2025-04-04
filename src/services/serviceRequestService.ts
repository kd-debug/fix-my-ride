
import { toast } from "sonner";

// Service request interface to be used across components
export interface ServiceRequest {
  id: string;
  userId: string;
  customerName: string;
  vehicleType: string;
  vehicleModel: string;
  issue: string;
  location: string;
  additionalDetails?: string;
  status: "pending" | "in-progress" | "completed" | "canceled";
  createdAt: string;
  assignedMechanicId?: string;
  completedAt?: string;
}

// Local storage keys
const SERVICE_REQUESTS_KEY = "serviceRequests";

// Get all service requests from local storage
export const getAllServiceRequests = (): ServiceRequest[] => {
  const requestsJSON = localStorage.getItem(SERVICE_REQUESTS_KEY);
  return requestsJSON ? JSON.parse(requestsJSON) : [];
};

// Save all service requests to local storage
export const saveServiceRequests = (requests: ServiceRequest[]): void => {
  localStorage.setItem(SERVICE_REQUESTS_KEY, JSON.stringify(requests));
};

// Create a new service request
export const createServiceRequest = (request: Omit<ServiceRequest, "id" | "createdAt" | "status">): ServiceRequest => {
  const newRequest: ServiceRequest = {
    id: "SR" + Math.floor(Math.random() * 10000).toString().padStart(5, '0'),
    status: "pending",
    createdAt: new Date().toISOString(),
    ...request
  };

  const existingRequests = getAllServiceRequests();
  const updatedRequests = [...existingRequests, newRequest];
  saveServiceRequests(updatedRequests);
  
  toast.success("Service request submitted successfully");
  return newRequest;
};

// Get all service requests for a specific user
export const getUserServiceRequests = (userId: string): ServiceRequest[] => {
  const allRequests = getAllServiceRequests();
  return allRequests.filter(request => request.userId === userId);
};

// Get all pending service requests (for mechanics)
export const getPendingServiceRequests = (): ServiceRequest[] => {
  const allRequests = getAllServiceRequests();
  return allRequests.filter(request => request.status === "pending");
};

// Get all active service requests for a mechanic
export const getMechanicActiveRequests = (mechanicId: string): ServiceRequest[] => {
  const allRequests = getAllServiceRequests();
  return allRequests.filter(request => 
    request.assignedMechanicId === mechanicId && 
    request.status === "in-progress"
  );
};

// Get all completed service requests for a mechanic
export const getMechanicCompletedRequests = (mechanicId: string): ServiceRequest[] => {
  const allRequests = getAllServiceRequests();
  return allRequests.filter(request => 
    request.assignedMechanicId === mechanicId && 
    request.status === "completed"
  );
};

// Update a service request status
export const updateServiceRequestStatus = (
  requestId: string, 
  status: "pending" | "in-progress" | "completed" | "canceled", 
  mechanicId?: string
): ServiceRequest | null => {
  const allRequests = getAllServiceRequests();
  const requestIndex = allRequests.findIndex(request => request.id === requestId);
  
  if (requestIndex === -1) {
    toast.error("Service request not found");
    return null;
  }
  
  const updatedRequest = { 
    ...allRequests[requestIndex], 
    status,
    assignedMechanicId: mechanicId || allRequests[requestIndex].assignedMechanicId,
    completedAt: status === "completed" ? new Date().toISOString() : allRequests[requestIndex].completedAt
  };
  
  allRequests[requestIndex] = updatedRequest;
  saveServiceRequests(allRequests);
  
  return updatedRequest;
};
