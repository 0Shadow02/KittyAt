// app/dashboard/_components/analytics-page.tsx

"use client";

import { Event, EventCategory } from "@prisma/client";
import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { format, parseISO, startOfDay, endOfDay, eachDayOfInterval, isToday, isThisWeek, isThisMonth } from "date-fns";
import { EmptyCategoryState } from "./empty-category-state";

interface CategoryAnalyticsContentProps {
  hasEvents: boolean;
  category: EventCategory;
  events: Event[];
}

const COLORS = ["#2563eb", "#7c3aed", "#16a34a", "#dc2626", "#d97706"];

export const CategoryAnalyticsContent = ({
  hasEvents,
  category,
  events,
}: CategoryAnalyticsContentProps) => {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("7d");
  const [activeTab, setActiveTab] = useState("overview");

  const processedData = useMemo(() => {
    if (!events.length) return [];

    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case "24h":
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "7d":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    const days = eachDayOfInterval({ start: startDate, end: now });
    
    return days.map(date => {
      const dayEvents = events.filter(event => 
        event.createdAt >= startOfDay(date) && event.createdAt <= endOfDay(date)
      );
      
      return {
        date: format(date, "MMM dd"),
        count: dayEvents.length,
        numericSum: dayEvents.reduce((sum, event) => {
          const fields = event.fields as Record<string, number>;
          return sum + Object.values(fields).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
        }, 0)
      };
    });
  }, [events, timeRange]);

  const statusDistribution = useMemo(() => {
    const statusCounts = events.reduce((acc, event) => {
      const status = event.deliveryStatus || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  }, [events]);

  const totalNumericValue = useMemo(() => 
    events.reduce((sum, event) => {
      const fields = event.fields as Record<string, number>;
      return sum + Object.values(fields).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
    }, 0), 
  [events]);

  if (!hasEvents) {
    return (
      <div className="h-[1200px] w-full">
        <EmptyCategoryState categoryName={category.name} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-[400px] bg-background">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Total Events"
              value={events.length}
              icon={<BarChart className="h-5 w-5" />}
              trend={Math.round((events.length / 30) * 100) / 100 + "/day"}
            />
            <MetricCard
              title="Total Value"
              value={totalNumericValue}
              icon={<LineChart className="h-5 w-5" />}
              trend={`${Math.round(totalNumericValue / events.length)}/event`}
            />
            <MetricCard
              title="Success Rate"
              value={`${Math.round(
                (statusDistribution.find(s => s.name === 'DELIVERED')?.value || 0) / events.length * 100
              )}%`}
              icon={<PieChart className="h-5 w-5" />}
              trend="Last 30 days"
            />
          </div>

          <div className="mt-6 space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Event Trends</h3>
                <div className="flex gap-2">
                  {["24h", "7d", "30d"].map(range => (
                    <Button
                      key={range}
                      variant={timeRange === range ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeRange(range as any)}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={processedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="numericSum"
                      stroke="#16a34a"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-6">Status Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                      >
                        {statusDistribution.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-6">Event Volume</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>


<TabsContent value="details">
  <Card className="p-8 border-dashed border-2 border-muted/20 hover:border-primary/30 transition-all">
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-16">
      <div className="relative w-72 h-48">
        <img
          src="/output-cat.gif"
          alt="Coming soon"
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
      
      <div className="space-y-3">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
          Detailed Analysis Coming Soon!
        </h3>
        <p className="text-muted-foreground">
          Our team is working hard to bring you advanced analytics features.
          Stay tuned for powerful insights and deep data exploration!
        </p>
      </div>

      <Button variant="outline" className="mt-4 group">
        <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
          Notify Me When Ready
        </span>
        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
          🚀
        </span>
      </Button>
    </div>
  </Card>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    <Card className="p-6 bg-muted/10 border-muted/20 animate-pulse">
      <div className="h-8 w-40 bg-muted rounded-md mb-4" />
      <div className="h-48 bg-muted/20 rounded-lg" />
    </Card>
    
    <Card className="p-6 bg-muted/10 border-muted/20 animate-pulse">
      <div className="h-8 w-40 bg-muted rounded-md mb-4" />
      <div className="h-48 bg-muted/20 rounded-lg" />
    </Card>
  </div>
</TabsContent>
      </Tabs>
    </div>
  );
};

const MetricCard = ({ title, value, icon, trend }: { 
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
 }) => (
  <Card className="p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        {trend && <p className="text-sm text-muted-foreground mt-1">{trend}</p>}
      </div>
      <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
    </div>
  </Card>
);