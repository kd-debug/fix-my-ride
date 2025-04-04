
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Users, Wrench, DollarSign } from "lucide-react";

// Sample data for stats
const weeklyData = [
  { name: 'Mon', value: 3 },
  { name: 'Tue', value: 2 },
  { name: 'Wed', value: 4 },
  { name: 'Thu', value: 1 },
  { name: 'Fri', value: 5 },
  { name: 'Sat', value: 3 },
  { name: 'Sun', value: 2 },
];

export function MechanicStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Overview</CardTitle>
        <CardDescription>
          Your service performance and statistics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-blue-100 rounded-md">
                <Users className="h-5 w-5 text-blue-700" />
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>12%</span>
              </div>
            </div>
            <p className="text-sm text-blue-700 mb-1">Total Customers</p>
            <p className="text-2xl font-bold text-blue-900">124</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-green-100 rounded-md">
                <Wrench className="h-5 w-5 text-green-700" />
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>8%</span>
              </div>
            </div>
            <p className="text-sm text-green-700 mb-1">Weekly Jobs</p>
            <p className="text-2xl font-bold text-green-900">18</p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-amber-100 rounded-md">
                <DollarSign className="h-5 w-5 text-amber-700" />
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>15%</span>
              </div>
            </div>
            <p className="text-sm text-amber-700 mb-1">Weekly Earnings</p>
            <p className="text-2xl font-bold text-amber-900">$950</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Weekly Service Requests</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
