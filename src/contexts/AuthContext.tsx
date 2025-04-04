import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

// Define user types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'mechanic' | 'admin';
  approved?: boolean;
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

// Sample users for demo
const SAMPLE_USERS: User[] = [
  { id: '1', name: 'John User', email: 'user@example.com', role: 'user' },
  { id: '5', name: 'Admin', email: 'dkhushali11@gmail.com', role: 'admin' },
];

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (userData: Partial<User>, password: string) => Promise<User | null>;
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email
      const user = SAMPLE_USERS.find(u => u.email === email);
      
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
      toast.error("An error occurred during login");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData: Partial<User>, password: string): Promise<User | null> => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (SAMPLE_USERS.some(u => u.email === userData.email)) {
        toast.error("Email already in use");
        return null;
      }
      
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name || 'New User',
        email: userData.email || '',
        role: userData.role || 'user',
        approved: userData.role === 'mechanic' ? false : undefined,
      };
      
      // Otherwise, log them in
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      toast.success("Registration successful!");
      return newUser;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
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
  const updateMechanicApplication = (id: string, status: string) => {
    const updatedApplications = mechanicApplications.map(app => 
      app.id === id ? { ...app, status } : app
    );
    
    setMechanicApplications(updatedApplications);
    localStorage.setItem('mechanicApplications', JSON.stringify(updatedApplications));
    
    // If approved, add as a new user
    if (status === "approved") {
      const application = mechanicApplications.find(app => app.id === id);
      if (application) {
        const newMechanic: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: application.name,
          email: application.email,
          role: 'mechanic',
          approved: true
        };
        SAMPLE_USERS.push(newMechanic);
      }
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
