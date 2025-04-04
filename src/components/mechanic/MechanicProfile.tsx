
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, MapPin, Star, Wrench } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function MechanicProfile() {
  const { currentUser } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
        <CardDescription>
          Update your profile and availability status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="/placeholder.svg" alt={currentUser?.name} />
            <AvatarFallback>{currentUser?.name.split(' ').map(n => n?.[0]).join('') || 'MM'}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{currentUser?.name || 'Mike Mechanic'}</h2>
          <div className="flex items-center text-amber-500 mb-1">
            <Star className="h-4 w-4 fill-current mr-1" />
            <span className="font-medium">4.8</span>
            <span className="text-gray-400 text-sm ml-1">(48 reviews)</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Mechanic City, MC</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-3 ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="font-medium">Availability Status</span>
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="availability" 
              checked={isAvailable} 
              onCheckedChange={setIsAvailable}
            />
            <Label htmlFor="availability" className="text-sm">
              {isAvailable ? 'Available' : 'Unavailable'}
            </Label>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Specializations</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <Wrench className="h-3 w-3 mr-1" />
              Engine Repair
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <Wrench className="h-3 w-3 mr-1" />
              Electrical Systems
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <Wrench className="h-3 w-3 mr-1" />
              Tire Replacement
            </Badge>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <h3 className="font-medium mb-2">Service Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-700">124</p>
              <p className="text-sm text-blue-600">Jobs Completed</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-700">96%</p>
              <p className="text-sm text-green-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
        
        <Button variant="outline" className="w-full flex items-center justify-center">
          <Bell className="h-4 w-4 mr-2" />
          Update Notification Settings
        </Button>
      </CardContent>
    </Card>
  );
}
