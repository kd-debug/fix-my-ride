import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";
import { authApi } from '@/services/api';
import axios from 'axios';
import { mechanicApi } from '@/services/api';

// Define user types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'mechanic' | 'admin';
  approved?: boolean;
  token?: string;
}

export interface MechanicApplication {
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

interface UserData {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'mechanic' | 'admin';
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (userData: UserData) => Promise<User | null>;
  logout: () => void;
  loading: boolean;
  mechanicApplications: MechanicApplication[];
  addMechanicApplication: (application: MechanicApplication) => void;
  updateMechanicApplication: (id: string, status: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mechanicApplications, setMechanicApplications] = useState<MechanicApplication[]>([]);

  // Check for saved user and applications on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const savedApplications = localStorage.getItem('mechanicApplications');
    if (savedApplications) {
      setMechanicApplications(JSON.parse(savedApplications));
    }

    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<User | null> => {
    setLoading(true);

    try {
      const response = await authApi.login(email, password);
      const user = response.data as User;

      if (!user) {
        toast.error("Invalid email or password");
        return null;
      }

      // For mechanic, check if approved
      if (user.role === 'mechanic' && user.approved === false) {
        toast.error("Your account is pending approval by admin");
        return null;
      }

      // Success
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast.success("Login successful");
      return user;
    } catch (error) {
      console.error("Login error:", error);
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "An error occurred during login");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData: UserData): Promise<User | null> => {
    setLoading(true);

    try {
      const response = await authApi.register(userData);
      const user = response.data as User;

      if (!user) {
        toast.error("Registration failed");
        return null;
      }

      // Success
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast.success("Registration successful!");
      return user;
    } catch (error) {
      console.error("Registration error:", error);
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "An error occurred during registration");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Add mechanic application
  const addMechanicApplication = (application: MechanicApplication) => {
    const updatedApplications = [...mechanicApplications, application];
    setMechanicApplications(updatedApplications);
    localStorage.setItem('mechanicApplications', JSON.stringify(updatedApplications));
  };

  // Update mechanic application status
  const updateMechanicApplication = async (id: string, status: string) => {
    try {
      // Update backend
      const response = await mechanicApi.updateApplicationStatus(id, status);

      if (!response.data) {
        throw new Error('Failed to update application status');
      }

      // Update local state
      const updatedApplications = mechanicApplications.map(app =>
        app.id === id ? { ...app, status } : app
      );

      setMechanicApplications(updatedApplications);
      localStorage.setItem('mechanicApplications', JSON.stringify(updatedApplications));

      // Fetch fresh data from backend
      try {
        const response = await mechanicApi.getMechanicApplications();
        if (response.data) {
          setMechanicApplications(response.data);
          localStorage.setItem('mechanicApplications', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('Error fetching updated applications:', error);
      }

    } catch (error) {
      console.error('Error updating mechanic application:', error);
      throw error; // Re-throw to handle in component
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast.info("You have been logged out");
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    mechanicApplications,
    addMechanicApplication,
    updateMechanicApplication
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
