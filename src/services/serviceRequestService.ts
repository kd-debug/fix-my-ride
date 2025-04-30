import { toast } from "sonner";
import api from './api';

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
  status: string;
  createdAt: string;
  completedAt?: string;
  assignedMechanicId?: string;
  assignedMechanic?: {
    name: string;
    phone: string;
  };
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
export const createServiceRequest = async (requestData: {
  userId: string;
  customerName: string;
  vehicleType: string;
  vehicleModel: string;
  issue: string;
  location: string;
  additionalDetails?: string;
}): Promise<ServiceRequest> => {
  const response = await api.post<ServiceRequest>('/services', requestData);
  return response.data;
};

// Get all service requests for a specific user
export const getUserServiceRequests = async (): Promise<ServiceRequest[]> => {
  const response = await api.get<ServiceRequest[]>('/services/user');
  return response.data;
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

export const cancelServiceRequest = async (requestId: string): Promise<void> => {
  await api.put(`/services/${requestId}/status`, { status: 'canceled' });
};
