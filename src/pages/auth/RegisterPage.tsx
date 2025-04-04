
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Upload } from "lucide-react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    address: "",
    phone: "",
    experience: "",
    certification: null as File | null,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear password error when user types
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, certification: e.target.files?.[0] || null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    // Validate password length
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const user = await register({
        name: formData.name,
        email: formData.email,
        role: formData.role as 'user' | 'mechanic' | 'admin',
      }, formData.password);
      
      if (user) {
        if (user.role === 'mechanic') {
          navigate('/mechanic-pending');
        } else {
          navigate('/user-dashboard');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Register as a user or mechanic to get started
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>I want to register as</Label>
              <RadioGroup 
                value={formData.role} 
                onValueChange={handleRoleChange}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user-role" />
                  <Label htmlFor="user-role" className="cursor-pointer">User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mechanic" id="mechanic-role" />
                  <Label htmlFor="mechanic-role" className="cursor-pointer">Mechanic</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.role === "mechanic" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    required={formData.role === "mechanic"}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Mechanic St, City"
                    value={formData.address}
                    onChange={handleChange}
                    required={formData.role === "mechanic"}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (years and specialties)</Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    placeholder="5 years experience specializing in engine repair, electrical systems, etc."
                    value={formData.experience}
                    onChange={handleChange}
                    required={formData.role === "mechanic"}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="certification">Upload Certification/License</Label>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="certification" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-500 mb-2" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 10MB)</p>
                      </div>
                      <Input 
                        id="certification" 
                        name="certification"
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        required={formData.role === "mechanic"}
                      />
                    </label>
                  </div>
                  {formData.certification && (
                    <p className="text-sm text-green-600 mt-1">
                      File selected: {formData.certification.name}
                    </p>
                  )}
                </div>
                
                <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-md">
                  <p className="font-medium text-blue-700">Note for Mechanics:</p>
                  <p>Your account will need approval from our admin team before you can start accepting service requests. We'll review your information and notify you once approved.</p>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-primary hover:text-primary/90 underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
