import { useEffect, useState, useMemo } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/dashboard-layout";

interface Reservation {
  id: string;
  date: string;
  partySize: number;
  time: string;
  guestName: string;
  status: string;
}

export default function CalendarView() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    document.title = "Calendar - Resto Dashboard";
  }, []);

  const { data: reservations = [], isLoading } = useQuery<Reservation[]>({
    queryKey: ["/api/workspaces", workspaceId, "reservations"],
  });

  const bookingsByDate = useMemo(() =>
    reservations.reduce<Record<string, { count: number; guests: number }>>((acc, r) => {
      const dateKey = r.date.slice(0, 10);
      if (!acc[dateKey]) acc[dateKey] = { count: 0, guests: 0 };
      acc[dateKey].count++;
      acc[dateKey].guests += r.partySize;
      return acc;
    }, {}),
    [reservations]
  );

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatDateKey = (day: number) => {
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${currentDate.getFullYear()}-${month}-${dayStr}`;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">View and manage upcoming reservations</p>
          </div>
          <Card>
            <CardContent className="p-8">
              <p className="text-muted-foreground text-center">Loading reservations...</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">View and manage upcoming reservations</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth} data-testid="button-prev-month">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth} data-testid="button-next-month">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="text-center text-xs sm:text-sm font-medium text-muted-foreground p-1 sm:p-2">
                  <span className="sm:hidden">{day}</span>
                  <span className="hidden sm:inline">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}</span>
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
              {/* Empty cells for days before the first of the month */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square p-1 sm:p-2" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateKey = formatDateKey(day);
                const bookings = bookingsByDate[dateKey];
                
                return (
                  <div
                    key={day}
                    className={`aspect-square p-1 sm:p-2 rounded-md sm:rounded-lg border cursor-pointer hover-elevate transition-all ${
                      isToday(day) ? "border-primary bg-primary/5" : ""
                    }`}
                    data-testid={`calendar-day-${day}`}
                  >
                    <div className={`text-xs sm:text-sm font-medium ${isToday(day) ? "text-primary" : ""}`}>
                      {day}
                    </div>
                    {bookings && (
                      <div className="mt-0.5 sm:mt-1">
                        <Badge variant="secondary" className="text-[10px] sm:text-xs w-full justify-center px-1">
                          {bookings.count}
                        </Badge>
                        <div className="hidden sm:flex items-center justify-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          {bookings.guests}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
