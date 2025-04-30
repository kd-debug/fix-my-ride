import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createServiceRequest } from "@/services/serviceRequestService";
import { toast } from "sonner";

interface UserRequestFormProps {
  onRequestSubmit: () => void;
}

export function UserRequestForm({ onRequestSubmit }: UserRequestFormProps) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleModel: "",
    issue: "",
    location: "",
    additionalDetails: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUseCurrentLocation = () => {
    setUseCurrentLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Use reverse geocoding to get address
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
              const address = data.display_name;
              setFormData(prev => ({ ...prev, location: address }));
              setUseCurrentLocation(false);
            })
            .catch(error => {
              console.error('Error getting address:', error);
              setFormData(prev => ({ ...prev, location: `${latitude}, ${longitude}` }));
              setUseCurrentLocation(false);
            });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Could not get your location. Please enter it manually.');
          setUseCurrentLocation(false);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
      setUseCurrentLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error('Please log in to submit a service request');
      return;
    }

    if (!formData.vehicleType || !formData.vehicleModel || !formData.issue || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await createServiceRequest({
        userId: currentUser._id,
        customerName: currentUser.name,
        vehicleType: formData.vehicleType,
        vehicleModel: formData.vehicleModel,
        issue: formData.issue,
        location: formData.location,
        additionalDetails: formData.additionalDetails
      });

      toast.success('Service request submitted successfully');
      onRequestSubmit();
    } catch (error) {
      console.error('Error creating service request:', error);
      toast.error('Failed to submit service request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Roadside Assistance</CardTitle>
        <CardDescription>
          Fill in the details of your vehicle and the issue you're experiencing
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select
                value={formData.vehicleType}
                onValueChange={(value) => handleSelectChange('vehicleType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="motorcycle">Motorcycle</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleModel">Vehicle Model</Label>
              <Input
                id="vehicleModel"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                placeholder="e.g., Toyota Camry 2020"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="issue">Issue Description</Label>
            <Textarea
              id="issue"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              placeholder="Describe the issue you're experiencing"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex space-x-2">
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your location"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleUseCurrentLocation}
                disabled={useCurrentLocation}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Use Current Location
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalDetails">Additional Details (Optional)</Label>
            <Textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              placeholder="Any additional information that might help the mechanic"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Request'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
