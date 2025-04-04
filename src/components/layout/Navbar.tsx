
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { 
  Menu, 
  X, 
  User,
  LogOut,
  Wrench,
  ShieldCheck
} from "lucide-react";

interface NavbarProps {
  userRole: string | null;
  onLogout: () => void;
}

export function Navbar({ userRole, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  let roleIcon;
  let dashboardLink = '/';

  switch (userRole) {
    case 'user':
      roleIcon = <User className="h-5 w-5 mr-2" />;
      dashboardLink = '/user-dashboard';
      break;
    case 'mechanic':
      roleIcon = <Wrench className="h-5 w-5 mr-2" />;
      dashboardLink = '/mechanic-dashboard';
      break;
    case 'admin':
      roleIcon = <ShieldCheck className="h-5 w-5 mr-2" />;
      dashboardLink = '/admin-dashboard';
      break;
    default:
      roleIcon = null;
  }

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-brand-blue text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <span className="text-brand-orange">Auto</span>Aid Connect
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {userRole ? (
            <>
              <Link to={dashboardLink} className="flex items-center hover:text-brand-orange transition-colors">
                {roleIcon}
                Dashboard
              </Link>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="flex items-center hover:text-brand-orange hover:bg-transparent transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-brand-orange transition-colors">Login</Link>
              <Link to="/register">
                <Button variant="outline" className="bg-brand-orange hover:bg-brand-orange/90 text-white border-brand-orange hover:border-brand-orange/90">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          className="md:hidden text-white hover:bg-transparent hover:text-brand-orange"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-blue border-t border-blue-700 py-4">
          <div className="container mx-auto flex flex-col space-y-3">
            {userRole ? (
              <>
                <Link 
                  to={dashboardLink} 
                  className="flex items-center hover:text-brand-orange transition-colors px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {roleIcon}
                  Dashboard
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="flex items-center hover:text-brand-orange hover:bg-transparent transition-colors justify-start px-4 py-2"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:text-brand-orange transition-colors px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-brand-orange text-white px-4 py-2 rounded-md hover:bg-brand-orange/90 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
