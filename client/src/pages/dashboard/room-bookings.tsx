import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Calendar, Plus, Eye, DollarSign, Users, Moon, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/dashboard-layout";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Room {
  id: string;
  roomNumber: string;
  roomTypeId: string;
}

interface RoomType {
  id: string;
  name: string;
  basePrice: string;
}

interface RoomBooking {
  id: string;
  workspaceId: string;
  roomId: string;
  roomTypeId: string;
  guestName: string;
  guestEmail: string | null;
  guestPhone: string | null;
  adults: number;
  children: number;
  checkIn: string;
  checkOut: string;
  status: string;
  source: string;
  notes: string | null;
  specialRequests: string | null;
  confirmationCode: string;
  totalAmount: string | null;
  depositAmount: string | null;
  isPrepaid: boolean;
  paymentStatus: string | null;
  createdAt: string;
}

export default function RoomBookings() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    roomId: "",
    roomTypeId: "",
    adults: "1",
    children: "0",
    checkIn: "",
    checkOut: "",
    totalAmount: "",
    depositAmount: "",
    isPrepaid: false,
    notes: "",
    specialRequests: "",
  });

  useEffect(() => {
    document.title = "Room Bookings - Resto Dashboard";
  }, []);

  const { data: bookings = [], isLoading } = useQuery<RoomBooking[]>({
    queryKey: ["/api/workspaces", workspaceId, "room-bookings"],
  });

  const { data: rooms = [] } = useQuery<Room[]>({
    queryKey: ["/api/workspaces", workspaceId, "rooms"],
  });

  const { data: roomTypes = [] } = useQuery<RoomType[]>({
    queryKey: ["/api/workspaces", workspaceId, "room-types"],
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) =>
      apiRequest("POST", `/api/workspaces/${workspaceId}/room-bookings`, {
        ...data,
        adults: parseInt(data.adults),
        children: parseInt(data.children),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workspaces", workspaceId, "room-bookings"] });
      toast({ title: "Booking created", description: "The room booking has been added." });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create booking.", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      roomId: "",
      roomTypeId: "",
      adults: "1",
      children: "0",
      checkIn: "",
      checkOut: "",
      totalAmount: "",
      depositAmount: "",
      isPrepaid: false,
      notes: "",
      specialRequests: "",
    });
  };

  const handleRoomChange = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    setFormData({
      ...formData,
      roomId,
      roomTypeId: room?.roomTypeId || "",
    });
  };

  const handleSubmit = () => {
    if (!formData.guestName || !formData.roomId || !formData.checkIn || !formData.checkOut) return;
    createMutation.mutate(formData);
  };

  const getRoomNumber = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    return room?.roomNumber || "Unknown";
  };

  const getRoomTypeName = (typeId: string) => {
    const type = roomTypes.find((rt) => rt.id === typeId);
    return type?.name || "Unknown";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Cancelled</Badge>;
      case "checked_in":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Checked In</Badge>;
      case "checked_out":
        return <Badge variant="secondary">Checked Out</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const confirmedBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "checked_in");
  const totalRevenue = bookings
    .filter((b) => b.isPrepaid)
    .reduce((sum, b) => sum + parseFloat(b.depositAmount || "0"), 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Room Bookings</h1>
            <p className="text-sm text-muted-foreground">Manage room reservations and check-ins</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2 w-full sm:w-auto" data-testid="button-add-room-booking">
                <Plus className="w-4 h-4" />
                New Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Room Booking</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Check-in Date</Label>
                    <Input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      data-testid="input-checkin"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Check-out Date</Label>
                    <Input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      data-testid="input-checkout"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Room</Label>
                  <Select value={formData.roomId} onValueChange={handleRoomChange}>
                    <SelectTrigger data-testid="select-room">
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          Room {room.roomNumber} - {getRoomTypeName(room.roomTypeId)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Guest Name</Label>
                  <Input
                    placeholder="John Doe"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    data-testid="input-guest-name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.guestEmail}
                      onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                      data-testid="input-guest-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={formData.guestPhone}
                      onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                      data-testid="input-guest-phone"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Adults</Label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.adults}
                      onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                      data-testid="input-adults"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Children</Label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.children}
                      onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                      data-testid="input-children"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Total Amount</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={formData.totalAmount}
                      onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                      data-testid="input-total-amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Deposit Amount</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={formData.depositAmount}
                      onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                      data-testid="input-deposit-amount"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Special Requests</Label>
                  <Textarea
                    placeholder="Any special requests..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    data-testid="input-special-requests"
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={createMutation.isPending}
                  data-testid="button-save-booking"
                >
                  Create Booking
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="text-total-bookings">{bookings.length}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-full bg-green-500/10 text-green-500">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="text-confirmed-bookings">{confirmedBookings.length}</p>
                <p className="text-sm text-muted-foreground">Active Bookings</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="text-total-revenue">${totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Prepaid Deposits</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {rooms.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">You need to create rooms before adding bookings.</p>
              <Button variant="ghost" className="mt-2" onClick={() => window.location.href = `/${workspaceId}/rooms`}>
                Go to Rooms
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">All Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground text-center py-8">Loading...</p>
            ) : bookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No room bookings yet. Create your first booking above.</p>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-md border bg-muted/30 gap-3"
                    data-testid={`booking-${booking.id}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-background">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium">{booking.guestName}</p>
                          {getStatusBadge(booking.status)}
                          {booking.isPrepaid && (
                            <Badge variant="outline" className="bg-green-500/5 text-green-600 border-green-500/20">
                              Prepaid
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground space-y-0.5">
                          <p className="flex items-center gap-2">
                            <span>Room {getRoomNumber(booking.roomId)}</span>
                            <span>•</span>
                            <span>{getRoomTypeName(booking.roomTypeId)}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {format(new Date(booking.checkIn), "MMM d")} - {format(new Date(booking.checkOut), "MMM d, yyyy")}
                            <span className="flex items-center gap-1">
                              <Moon className="w-3 h-3" />
                              {getNights(booking.checkIn, booking.checkOut)} nights
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Users className="w-3 h-3" />
                            {booking.adults} adults{booking.children > 0 && `, ${booking.children} children`}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Confirmation: {booking.confirmationCode}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                      {booking.totalAmount && (
                        <p className="font-semibold">${booking.totalAmount}</p>
                      )}
                      <Link href={`/${workspaceId}/room-bookings/${booking.id}`}>
                        <Button size="sm" variant="outline" className="gap-1" data-testid={`button-view-booking-${booking.id}`}>
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
