import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getApprovedMechanics, Mechanic } from "@/services/mechanicService";
import { toast } from "sonner";

export function MechanicList() {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [filteredMechanics, setFilteredMechanics] = useState<Mechanic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await getApprovedMechanics();
        setMechanics(response);
        setFilteredMechanics(response);
      } catch (error) {
        toast.error("Failed to fetch mechanics");
        console.error("Error fetching mechanics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMechanics();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredMechanics(mechanics);
      return;
    }

    const filtered = mechanics.filter(mechanic =>
      mechanic.name.toLowerCase().includes(term.toLowerCase()) ||
      mechanic.experience.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredMechanics(filtered);
  };

  if (isLoading) {
    return <div>Loading mechanics...</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Available Mechanics</CardTitle>
          <CardDescription>
            Browse and view profiles of approved mechanics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by name or experience..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="grid gap-4">
            {filteredMechanics.map((mechanic) => (
              <Card key={mechanic.id} className="cursor-pointer hover:bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback>{mechanic.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{mechanic.name}</h3>
                        <Badge variant="secondary">
                          {mechanic.completedJobs} jobs completed
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{mechanic.experience}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{mechanic.phone}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredMechanics.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No mechanics found matching your search
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
