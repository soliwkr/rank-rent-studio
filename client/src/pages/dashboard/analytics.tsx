import { useEffect, useState, useMemo } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, TrendingUp, Users, Phone, Globe, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard-layout";

interface Reservation {
  id: string;
  venueId: string;
  guestName: string;
  guestEmail: string | null;
  guestPhone: string | null;
  date: string;
  time: string;
  partySize: number;
  status: string;
  notes: string | null;
  source: string | null;
  createdAt: string;
}

interface CallLog {
  id: string;
  venueId: string;
  callerPhone: string | null;
  duration: number | null;
  status: string | null;
  aiSummary: string | null;
  createdAt: string;
}

function BarChart({ data, color = "bg-primary" }: { data: { label: string; value: number }[]; color?: string }) {
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end justify-between gap-2 h-48 px-2">
      {data.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <span className="text-xs text-muted-foreground">{item.value}</span>
          <div 
            className={`w-full ${color} rounded-t transition-all duration-500`}
            style={{ height: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`, minHeight: '4px' }}
          />
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function DualBarChart({ data }: { data: { label: string; impressions: number; conversions: number }[] }) {
  const maxValue = Math.max(...data.map(d => d.impressions));
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded" /> Impressions</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded" /> Conversions</div>
      </div>
      <div className="flex items-end justify-between gap-4 h-40 px-2">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div className="flex items-end gap-1 w-full justify-center h-32">
              <div 
                className="w-6 bg-blue-500 rounded-t transition-all duration-500"
                style={{ height: `${maxValue > 0 ? (item.impressions / maxValue) * 100 : 0}%`, minHeight: '4px' }}
              />
              <div 
                className="w-6 bg-green-500 rounded-t transition-all duration-500"
                style={{ height: `${maxValue > 0 ? (item.conversions / maxValue) * 100 : 0}%`, minHeight: '4px' }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HorizontalBarChart({ data }: { data: { label: string; value: number; color: string; percent: number }[] }) {
  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{item.label}</span>
            <span className="text-muted-foreground">{item.value} ({item.percent}%)</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full ${item.color} rounded-full transition-all duration-500`}
              style={{ width: `${item.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function WeekComparisonChart({ data }: { data: { label: string; thisWeek: number; lastWeek: number }[] }) {
  const maxValue = Math.max(...data.flatMap(d => [d.thisWeek, d.lastWeek]));
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded" /> This Week</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-muted-foreground/40 rounded" /> Last Week</div>
      </div>
      <div className="flex items-end justify-between gap-2 h-40 px-2">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div className="flex items-end gap-0.5 w-full justify-center h-32">
              <div 
                className="w-4 bg-muted-foreground/40 rounded-t transition-all duration-500"
                style={{ height: `${maxValue > 0 ? (item.lastWeek / maxValue) * 100 : 0}%`, minHeight: '4px' }}
              />
              <div 
                className="w-4 bg-primary rounded-t transition-all duration-500"
                style={{ height: `${maxValue > 0 ? (item.thisWeek / maxValue) * 100 : 0}%`, minHeight: '4px' }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Analytics() {
  const { venueId } = useParams<{ venueId: string }>();
  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    document.title = "Analytics - Resto Dashboard";
  }, []);

  const { data: reservations = [] } = useQuery<Reservation[]>({
    queryKey: ["/api/venues", venueId, "reservations"],
  });
  const { data: calls = [] } = useQuery<CallLog[]>({
    queryKey: ["/api/venues", venueId, "calls"],
  });

  const bookingStats = useMemo(() => {
    const total = reservations.length;
    const confirmed = reservations.filter(r => r.status === "confirmed").length;
    const cancelled = reservations.filter(r => r.status === "cancelled").length;
    const avgPartySize = total > 0 ? (reservations.reduce((sum, r) => sum + r.partySize, 0) / total).toFixed(1) : "0";

    const dayCount: Record<string, number> = {};
    const timeCount: Record<string, number> = {};
    reservations.forEach(r => {
      const day = new Date(r.date).toLocaleDateString("en-US", { weekday: "long" });
      dayCount[day] = (dayCount[day] || 0) + 1;
      timeCount[r.time] = (timeCount[r.time] || 0) + 1;
    });
    const peakDay = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
    const peakTime = Object.entries(timeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    return { total, confirmed, cancelled, avgPartySize, peakDay, peakTime };
  }, [reservations]);

  const phoneStats = useMemo(() => {
    const totalCalls = calls.length;
    const answered = calls.filter(c => c.status === "completed").length;
    const missed = calls.filter(c => c.status === "missed").length;
    const durations = calls.filter(c => c.duration).map(c => c.duration!);
    const avgSec = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;
    const avgDuration = `${Math.floor(avgSec / 60)}:${String(avgSec % 60).padStart(2, "0")}`;
    const bookingsMade = calls.filter(c => c.aiSummary?.toLowerCase().includes("booking")).length;
    const successRate = totalCalls > 0 ? `${((bookingsMade / totalCalls) * 100).toFixed(1)}%` : "0%";
    return { totalCalls, answered, missed, avgDuration, bookingsMade, successRate };
  }, [calls]);

  const bookingsChartData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const counts: Record<string, number> = {};
    days.forEach(d => counts[d] = 0);
    reservations.forEach(r => {
      const dayFull = new Date(r.date).toLocaleDateString("en-US", { weekday: "short" });
      if (counts[dayFull] !== undefined) counts[dayFull]++;
    });
    return days.map(d => ({ label: d, value: counts[d] }));
  }, [reservations]);

  const partySizeData = useMemo(() => {
    const ranges = [
      { label: "1-2", min: 1, max: 2 },
      { label: "3-4", min: 3, max: 4 },
      { label: "5-6", min: 5, max: 6 },
      { label: "7-8", min: 7, max: 8 },
      { label: "9+", min: 9, max: Infinity },
    ];
    return ranges.map(range => ({
      label: range.label,
      value: reservations.filter(r => r.partySize >= range.min && r.partySize <= range.max).length,
    }));
  }, [reservations]);

  const bookingSourcesData = useMemo(() => {
    const sourceCount: Record<string, number> = {};
    reservations.forEach(r => {
      const src = r.source || "Unknown";
      sourceCount[src] = (sourceCount[src] || 0) + 1;
    });
    const total = reservations.length || 1;
    const colorMap: Record<string, string> = {
      widget: "bg-blue-500",
      phone: "bg-orange-500",
      "walk-in": "bg-green-500",
      email: "bg-purple-500",
    };
    const entries = Object.entries(sourceCount).sort((a, b) => b[1] - a[1]);
    const colors = ["bg-blue-500", "bg-orange-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-yellow-500"];
    return entries.map(([label, value], i) => ({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      value,
      color: colorMap[label.toLowerCase()] || colors[i % colors.length],
      percent: Math.round((value / total) * 100),
    }));
  }, [reservations]);

  const weekComparisonData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay() + 1);
    startOfThisWeek.setHours(0, 0, 0, 0);
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

    const thisWeekCounts: Record<string, number> = {};
    const lastWeekCounts: Record<string, number> = {};
    days.forEach(d => { thisWeekCounts[d] = 0; lastWeekCounts[d] = 0; });

    reservations.forEach(r => {
      const d = new Date(r.date);
      const dayShort = d.toLocaleDateString("en-US", { weekday: "short" });
      if (d >= startOfThisWeek) {
        if (thisWeekCounts[dayShort] !== undefined) thisWeekCounts[dayShort]++;
      } else if (d >= startOfLastWeek && d < startOfThisWeek) {
        if (lastWeekCounts[dayShort] !== undefined) lastWeekCounts[dayShort]++;
      }
    });

    return days.map(d => ({
      label: d,
      thisWeek: thisWeekCounts[d],
      lastWeek: lastWeekCounts[d],
    }));
  }, [reservations]);

  const phoneChartData = useMemo(() => {
    const hours = [
      { label: "9a", hour: 9 },
      { label: "11a", hour: 11 },
      { label: "1p", hour: 13 },
      { label: "3p", hour: 15 },
      { label: "5p", hour: 17 },
      { label: "7p", hour: 19 },
    ];
    const counts: Record<number, number> = {};
    hours.forEach(h => counts[h.hour] = 0);
    calls.forEach(c => {
      const h = new Date(c.createdAt).getHours();
      const nearest = hours.reduce((prev, curr) =>
        Math.abs(curr.hour - h) < Math.abs(prev.hour - h) ? curr : prev
      );
      counts[nearest.hour]++;
    });
    return hours.map(h => ({ label: h.label, value: counts[h.hour] }));
  }, [calls]);

  const widgetStats = {
    impressions: 0,
    interactions: 0,
    conversions: 0,
    conversionRate: "0%",
  };

  const widgetChartData = [
    { label: "Week 1", impressions: 0, conversions: 0 },
    { label: "Week 2", impressions: 0, conversions: 0 },
    { label: "Week 3", impressions: 0, conversions: 0 },
    { label: "Week 4", impressions: 0, conversions: 0 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track performance across all channels</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3" data-testid="tab-bookings">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="widget" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3" data-testid="tab-widget">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Widget</span>
            </TabsTrigger>
            <TabsTrigger value="phone" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3" data-testid="tab-phone">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Phone</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-3xl font-bold">{bookingStats.total}</p>
                  <p className="text-sm text-muted-foreground mt-1">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-3xl font-bold">{bookingStats.confirmed}</p>
                  <p className="text-sm text-muted-foreground mt-1">{bookingStats.total > 0 ? `${Math.round((bookingStats.confirmed / bookingStats.total) * 100)}%` : "0%"} confirmation rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Avg Party Size</p>
                  <p className="text-3xl font-bold">{bookingStats.avgPartySize}</p>
                  <p className="text-sm text-muted-foreground mt-1">guests per booking</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Peak Time</p>
                  <p className="text-3xl font-bold">{bookingStats.peakTime}</p>
                  <p className="text-sm text-muted-foreground mt-1">{bookingStats.peakDay}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart data={bookingsChartData} color="bg-primary" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>This Week vs Last Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <WeekComparisonChart data={weekComparisonData} />
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <HorizontalBarChart data={bookingSourcesData} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Party Size Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart data={partySizeData} color="bg-green-500" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="widget" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Impressions</p>
                  <p className="text-3xl font-bold">{widgetStats.impressions.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-1">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Interactions</p>
                  <p className="text-3xl font-bold">{widgetStats.interactions.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-1">widget opens</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Conversions</p>
                  <p className="text-3xl font-bold">{widgetStats.conversions}</p>
                  <p className="text-sm text-muted-foreground mt-1">bookings made</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-3xl font-bold">{widgetStats.conversionRate}</p>
                  <p className="text-sm text-muted-foreground mt-1">This month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Widget Performance (Last 4 Weeks)</CardTitle>
              </CardHeader>
              <CardContent>
                <DualBarChart data={widgetChartData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="phone" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Total Calls</p>
                  <p className="text-3xl font-bold">{phoneStats.totalCalls}</p>
                  <p className="text-sm text-muted-foreground mt-1">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Answered</p>
                  <p className="text-3xl font-bold">{phoneStats.answered}</p>
                  <p className="text-sm text-muted-foreground mt-1">{phoneStats.totalCalls > 0 ? `${((phoneStats.answered / phoneStats.totalCalls) * 100).toFixed(1)}%` : "0%"} answer rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Bookings Made</p>
                  <p className="text-3xl font-bold">{phoneStats.bookingsMade}</p>
                  <p className="text-sm text-muted-foreground mt-1">via phone</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-3xl font-bold">{phoneStats.successRate}</p>
                  <p className="text-sm text-muted-foreground mt-1">calls to bookings</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Call Volume by Hour</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart data={phoneChartData} color="bg-orange-500" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
