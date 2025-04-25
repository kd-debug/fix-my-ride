import axios from 'axios';

// Create axios instance
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface UserData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface ServiceRequestData {
  vehicleType: string;
  vehicleModel: string;
  issue: string;
  location: string;
  additionalDetails?: string;
}

interface MechanicApplicationData {
  experience: string;
  specialization: string;
  licenseNumber: string;
  documents: string[];
}

// Auth services
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/users/login', { email, password }),

  register: (userData: UserData) =>
    api.post('/users', userData),

  getUserProfile: () =>
    api.get('/users/profile'),

  updateUserProfile: (userData: Partial<UserData>) =>
    api.put('/users/profile', userData),
};

// Service request services
export const serviceApi = {
  createServiceRequest: (requestData: ServiceRequestData) =>
    api.post('/services', requestData),

  getUserRequests: () =>
    api.get('/services/user'),

  getPendingRequests: () =>
    api.get('/services/pending'),

  getMechanicActiveRequests: () =>
    api.get('/services/mechanic/active'),

  getMechanicCompletedRequests: () =>
    api.get('/services/mechanic/completed'),

  updateRequestStatus: (id: string, status: string) =>
    api.put(`/services/${id}/status`, { status }),

  getAllRequests: () =>
    api.get('/services'),
};

// Mechanic services
export const mechanicApi = {
  applyAsMechanic: (applicationData: MechanicApplicationData) =>
    api.post('/mechanics/apply', applicationData),

  getMechanicApplications: () =>
    api.get('/mechanics/applications'),

  updateApplicationStatus: (id: string, status: string) =>
    api.put(`/mechanics/applications/${id}`, { status }),

  getApprovedMechanics: () =>
    api.get('/mechanics'),
};

export default api;
