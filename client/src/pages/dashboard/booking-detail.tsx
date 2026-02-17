import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock, Users, Phone, Mail, MessageSquare, CheckCircle, XCircle, Edit, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard-layout";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
  updatedAt: string;
}

function getStatusBadge(status: string) {
  switch (status) {
    case "confirmed":
      return (
        <Badge className="bg-green-500/10 text-green-600">
          <CheckCircle className="w-3 h-3 mr-1" />
          Confirmed
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-red-500/10 text-red-600">
          <XCircle className="w-3 h-3 mr-1" />
          Cancelled
        </Badge>
      );
    case "no-show":
      return (
        <Badge className="bg-yellow-500/10 text-yellow-600">
          <AlertCircle className="w-3 h-3 mr-1" />
          No Show
        </Badge>
      );
    default:
      return (
        <Badge className="bg-blue-500/10 text-blue-600">
          <CheckCircle className="w-3 h-3 mr-1" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
  }
}

export default function BookingDetail() {
  const { venueId, bookingId } = useParams<{ venueId: string; bookingId: string }>();
  const { toast } = useToast();

  useEffect(() => {
    document.title = `Booking ${bookingId} - Resto Dashboard`;
  }, [bookingId]);

  const { data: booking, isLoading } = useQuery<Reservation>({
    queryKey: ["/api/reservations", bookingId],
  });

  const cancelMutation = useMutation({
    mutationFn: () => apiRequest("PATCH", `/api/reservations/${bookingId}`, { status: "cancelled" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reservations", bookingId] });
      queryClient.invalidateQueries({ queryKey: ["/api/venues", venueId, "reservations"] });
      toast({ title: "Booking cancelled" });
    },
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-16">
          <p className="text-muted-foreground" data-testid="text-loading">Loading booking details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!booking) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href={`/${venueId}/today`}>
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Booking Not Found</h1>
              <p className="text-sm text-muted-foreground">This reservation could not be found.</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const formattedDate = new Date(booking.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const initials = booking.guestName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href={`/${venueId}/today`}>
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Booking Details</h1>
            <p className="text-sm text-muted-foreground">Reservation #{bookingId}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 flex-wrap">
                <CardTitle className="text-base sm:text-lg">Reservation Information</CardTitle>
                {getStatusBadge(booking.status || "confirmed")}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{booking.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Party Size</p>
                      <p className="font-medium">{booking.partySize} guests</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Source</p>
                      <p className="font-medium capitalize">{booking.source}</p>
                    </div>
                  </div>
                </div>

                {(booking.notes || booking.specialRequests) && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-1">Special Requests</p>
                    <p className="text-sm">{booking.notes || booking.specialRequests}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Guest Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {initials}
                  </div>
                  <div>
                    <p className="font-medium">{booking.guestName}</p>
                    <p className="text-sm text-muted-foreground">Guest</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {booking.guestPhone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{booking.guestPhone}</span>
                    </div>
                  )}
                  {booking.guestEmail && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{booking.guestEmail}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full gap-2" data-testid="button-edit-booking">
                  <Edit className="w-4 h-4" />
                  Edit Booking
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 text-destructive hover:text-destructive"
                  data-testid="button-cancel-booking"
                  onClick={() => cancelMutation.mutate()}
                  disabled={cancelMutation.isPending || booking.status === "cancelled"}
                >
                  <XCircle className="w-4 h-4" />
                  Cancel Booking
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {booking.confirmationCode && (
                    <div className="flex gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <div>
                        <p>Confirmation code: {booking.confirmationCode}</p>
                        <p className="text-muted-foreground">Reference</p>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <p>Booking created</p>
                      <p className="text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
