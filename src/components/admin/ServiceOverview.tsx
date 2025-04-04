
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, Wrench, MapPin, Car } from "lucide-react";

// Sample data for stats
const dailyData = [
  { day: 'Mon', requests: 12, completed: 10 },
  { day: 'Tue', requests: 15, completed: 13 },
  { day: 'Wed', requests: 20, completed: 18 },
  { day: 'Thu', requests: 18, completed: 16 },
  { day: 'Fri', requests: 25, completed: 22 },
  { day: 'Sat', requests: 30, completed: 28 },
  { day: 'Sun', requests: 22, completed: 20 },
];

const issueTypeData = [
  { name: 'Flat Tire', value: 35 },
  { name: 'Battery', value: 25 },
  { name: 'Engine', value: 15 },
  { name: 'Locked Out', value: 10 },
  { name: 'Other', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function ServiceOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-md">
                <Wrench className="h-6 w-6 text-blue-700" />
              </div>
              <span className="text-blue-600 text-sm bg-blue-100 px-2 py-0.5 rounded">
                Today
              </span>
            </div>
            <p className="text-blue-700 mb-1">Total Service Requests</p>
            <p className="text-3xl font-bold text-blue-900">42</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-md">
                <Users className="h-6 w-6 text-green-700" />
              </div>
              <span className="text-green-600 text-sm bg-green-100 px-2 py-0.5 rounded">
                Total
              </span>
            </div>
            <p className="text-green-700 mb-1">Active Mechanics</p>
            <p className="text-3xl font-bold text-green-900">28</p>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-amber-100 rounded-md">
                <Car className="h-6 w-6 text-amber-700" />
              </div>
              <span className="text-amber-600 text-sm bg-amber-100 px-2 py-0.5 rounded">
                Live
              </span>
            </div>
            <p className="text-amber-700 mb-1">Ongoing Services</p>
            <p className="text-3xl font-bold text-amber-900">15</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-md">
                <DollarSign className="h-6 w-6 text-purple-700" />
              </div>
              <span className="text-purple-600 text-sm bg-purple-100 px-2 py-0.5 rounded">
                This week
              </span>
            </div>
            <p className="text-purple-700 mb-1">Revenue Generated</p>
            <p className="text-3xl font-bold text-purple-900">$8,245</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Service Requests Overview</CardTitle>
            <CardDescription>
              Daily service requests and completion rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="daily" className="mt-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dailyData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="requests"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name="Requests"
                      />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Completed"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="weekly" className="mt-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dailyData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="requests"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name="Requests"
                      />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Completed"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="monthly" className="mt-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dailyData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="requests"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name="Requests"
                      />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Completed"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Service Type Breakdown</CardTitle>
            <CardDescription>
              Distribution of service request categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col justify-between">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={issueTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {issueTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-center flex-wrap gap-2 mt-4">
                {issueTypeData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center mr-4">
                    <div
                      className="w-3 h-3 rounded-full mr-1"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-xs">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Regional Service Distribution</CardTitle>
          <CardDescription>
            Service requests by location and completion rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Card className="w-full">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm font-medium">North Region</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold">32</span>
                      <span className="text-green-500 text-sm self-end">93%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="text-sm font-medium">South Region</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold">45</span>
                      <span className="text-green-500 text-sm self-end">89%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium">East Region</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold">28</span>
                      <span className="text-green-500 text-sm self-end">95%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-purple-500 mr-1" />
                      <span className="text-sm font-medium">West Region</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold">37</span>
                      <span className="text-green-500 text-sm self-end">91%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
