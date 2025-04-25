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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      return;
    }

    setIsSubmitting(true);

    // Create service request with real data
    createServiceRequest({
      userId: currentUser.id,
      customerName: currentUser.name,
      vehicleType: formData.vehicleType,
      vehicleModel: formData.vehicleModel,
      issue: formData.issue,
      location: formData.location,
      additionalDetails: formData.additionalDetails
    });

    setIsSubmitting(false);
    onRequestSubmit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Roadside Assistance</CardTitle>
        <CardDescription>
          Fill out the form below to request assistance from a mechanic in your area
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select
                value={formData.vehicleType}
                onValueChange={(value) => handleSelectChange("vehicleType", value)}
                required
              >
                <SelectTrigger id="vehicleType">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="motorcycle">Motorcycle</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleModel">Vehicle Make & Model</Label>
              <Input
                id="vehicleModel"
                name="vehicleModel"
                placeholder="Toyota Camry, Honda Civic, etc."
                value={formData.vehicleModel}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue">What's the issue?</Label>
            <Select
              value={formData.issue}
              onValueChange={(value) => handleSelectChange("issue", value)}
              required
            >
              <SelectTrigger id="issue">
                <SelectValue placeholder="Select the issue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Flat Tire">Flat Tire</SelectItem>
                <SelectItem value="Dead Battery">Dead Battery</SelectItem>
                <SelectItem value="Engine Trouble">Engine Trouble</SelectItem>
                <SelectItem value="Out of Fuel">Out of Fuel</SelectItem>
                <SelectItem value="Locked Out">Locked Out</SelectItem>
                <SelectItem value="Other Issue">Other Issue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="location">Your Location</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center text-xs"
                onClick={handleUseCurrentLocation}
                disabled={useCurrentLocation}
              >
                {useCurrentLocation ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Getting location...
                  </>
                ) : (
                  <>
                    <MapPin className="mr-1 h-3 w-3" />
                    Use current location
                  </>
                )}
              </Button>
            </div>
            <Input
              id="location"
              name="location"
              placeholder="Street address, city, state"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalDetails">Additional Details (optional)</Label>
            <Textarea
              id="additionalDetails"
              name="additionalDetails"
              placeholder="Provide any additional information that might help the mechanic"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-brand-orange hover:bg-brand-orange/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Request...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
