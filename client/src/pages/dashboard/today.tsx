import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Users, Phone, CheckCircle, XCircle, AlertCircle, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard-layout";

interface Reservation {
  id: string;
  venueId: string;
  guestName: string;
  guestEmail: string | null;
  guestPhone: string | null;
  partySize: number;
  date: string;
  time: string;
  duration: number;
  status: string;
  source: string;
  notes: string | null;
  specialRequests: string | null;
  confirmationCode: string;
  resourceId: string | null;
  createdAt: string;
}

export default function Today() {
  const { venueId } = useParams<{ venueId: string }>();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    document.title = "Today - Resto Dashboard";
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const { data: reservations = [], isLoading } = useQuery<Reservation[]>({
    queryKey: [`/api/venues/${venueId}/reservations?date=${today}`],
  });

  const websiteBookings = reservations.filter(r => r.source === "widget" || r.source === "website");
  const phoneBookings = reservations.filter(r => r.source === "phone");
  const allBookings = [...reservations].sort((a, b) => a.time.localeCompare(b.time));

  const websiteStats = {
    total: websiteBookings.length,
    guests: websiteBookings.reduce((sum, b) => sum + b.partySize, 0),
    confirmed: websiteBookings.filter(b => b.status === "confirmed").length,
  };

  const twilioStats = {
    total: phoneBookings.length,
    guests: phoneBookings.reduce((sum, b) => sum + b.partySize, 0),
    confirmed: phoneBookings.filter(b => b.status === "confirmed").length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20"><CheckCircle className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderBookingRow = (booking: Reservation) => (
    <Link key={booking.id} href={`/${venueId}/bookings/${booking.id}`}>
      <div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border hover-elevate cursor-pointer gap-3"
        data-testid={`booking-${booking.id}`}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-center min-w-[50px] sm:min-w-[60px]">
            <p className="font-bold text-base sm:text-lg">{booking.time}</p>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium truncate">{booking.guestName}</p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {booking.partySize}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="truncate">{booking.guestPhone}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-[62px] sm:ml-0">
          {getStatusBadge(booking.status)}
        </div>
      </div>
    </Link>
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Today's Bookings</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {reservations.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">No bookings today</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Source Stats */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Website Bookings</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{websiteStats.total}</p>
                      <p className="text-xs text-muted-foreground">Bookings</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{websiteStats.guests}</p>
                      <p className="text-xs text-muted-foreground">Guests</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{websiteStats.confirmed}</p>
                      <p className="text-xs text-muted-foreground">Confirmed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-green-500/10 text-green-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Twilio Phone Bookings</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{twilioStats.total}</p>
                      <p className="text-xs text-muted-foreground">Bookings</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{twilioStats.guests}</p>
                      <p className="text-xs text-muted-foreground">Guests</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{twilioStats.confirmed}</p>
                      <p className="text-xs text-muted-foreground">Confirmed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bookings Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3" data-testid="tab-all">
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">All</span> ({allBookings.length})
                </TabsTrigger>
                <TabsTrigger value="website" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3" data-testid="tab-website">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">Web</span> ({websiteBookings.length})
                </TabsTrigger>
                <TabsTrigger value="phone" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3" data-testid="tab-phone">
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">Phone</span> ({phoneBookings.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      All Reservations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {allBookings.map((booking) => (
                        <div key={booking.id} className="relative">
                          <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${
                            booking.source === "phone" ? "bg-green-500" : "bg-blue-500"
                          }`} />
                          <div className="pl-3">
                            {renderBookingRow(booking)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="website" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-500" />
                      Website Reservations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {websiteBookings.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No website bookings today</p>
                    ) : (
                      <div className="space-y-3">
                        {websiteBookings.map((booking) => (
                          <Link key={booking.id} href={`/${venueId}/bookings/${booking.id}`}>
                            <div 
                              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border border-l-4 border-l-blue-500 hover-elevate cursor-pointer gap-3"
                              data-testid={`booking-${booking.id}`}
                            >
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="text-center min-w-[50px] sm:min-w-[60px]">
                                  <p className="font-bold text-base sm:text-lg">{booking.time}</p>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium truncate">{booking.guestName}</p>
                                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
                                    <span className="flex items-center gap-1">
                                      <Users className="w-3 h-3" />
                                      {booking.partySize}
                                    </span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="truncate max-w-[150px] sm:max-w-none">{booking.guestEmail}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 ml-[62px] sm:ml-0">
                                {getStatusBadge(booking.status)}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="phone" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-green-500" />
                      Twilio Phone Reservations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {phoneBookings.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No phone bookings today</p>
                    ) : (
                      <div className="space-y-3">
                        {phoneBookings.map((booking) => (
                          <Link key={booking.id} href={`/${venueId}/bookings/${booking.id}`}>
                            <div 
                              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border border-l-4 border-l-green-500 hover-elevate cursor-pointer gap-3"
                              data-testid={`booking-${booking.id}`}
                            >
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="text-center min-w-[50px] sm:min-w-[60px]">
                                  <p className="font-bold text-base sm:text-lg">{booking.time}</p>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium truncate">{booking.guestName}</p>
                                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
                                    <span className="flex items-center gap-1">
                                      <Users className="w-3 h-3" />
                                      {booking.partySize}
                                    </span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="flex items-center gap-1">
                                      <Phone className="w-3 h-3" />
                                      <span className="truncate">{booking.guestPhone}</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 ml-[62px] sm:ml-0 flex-wrap">
                                {getStatusBadge(booking.status)}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
