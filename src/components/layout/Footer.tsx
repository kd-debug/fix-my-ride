
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-blue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-brand-orange">FixMyRide</span> 
            </h2>
            <p className="text-gray-300">
              Providing reliable roadside assistance services to get you back on the road quickly and safely.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-brand-orange transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-brand-orange transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-brand-orange transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-brand-orange transition-colors">Become a Mechanic</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-brand-orange transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-brand-orange" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-brand-orange" />
                <span>support@fixmyride.com</span>
              </li>
              
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-700 mt-8 pt-4">
          <p className="text-center text-gray-300">
            &copy; {new Date().getFullYear()} FixMyRide Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
