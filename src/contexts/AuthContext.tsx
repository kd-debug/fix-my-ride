
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

// Sample users for demo
const SAMPLE_USERS: User[] = [
  { id: '1', name: 'John User', email: 'user@example.com', role: 'user' },
  { id: '2', name: 'Mike Mechanic', email: 'mechanic@example.com', role: 'mechanic', approved: true },
  { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: '4', name: 'Pending Mechanic', email: 'pending@example.com', role: 'mechanic', approved: false },
  // Adding the hardcoded admin to sample users
  { id: '5', name: 'Admin', email: 'dkhushali11@gmail.com', role: 'admin' },
];

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (userData: Partial<User>, password: string) => Promise<User | null>;
  logout: () => void;
  loading: boolean;
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

  // Check for saved user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
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
      
      // If mechanic, don't log them in yet
      if (newUser.role === 'mechanic') {
        toast.success("Registration successful! Your account is pending approval.");
        return newUser;
      }
      
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
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
