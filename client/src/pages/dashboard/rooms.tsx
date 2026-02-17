import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DoorOpen, Plus, Trash2, Save, Pencil, Building2 } from "lucide-react";
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

interface RoomType {
  id: string;
  name: string;
  basePrice: string;
}

interface Room {
  id: string;
  venueId: string;
  roomTypeId: string;
  roomNumber: string;
  floor: string | null;
  notes: string | null;
  isActive: boolean;
}

export default function Rooms() {
  const { venueId } = useParams<{ venueId: string }>();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomTypeId: "",
    floor: "",
    notes: "",
  });

  useEffect(() => {
    document.title = "Rooms - Resto Dashboard";
  }, []);

  const { data: rooms = [], isLoading } = useQuery<Room[]>({
    queryKey: ["/api/venues", venueId, "rooms"],
  });

  const { data: roomTypes = [] } = useQuery<RoomType[]>({
    queryKey: ["/api/venues", venueId, "room-types"],
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) =>
      apiRequest("POST", `/api/venues/${venueId}/rooms`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/venues", venueId, "rooms"] });
      toast({ title: "Room created", description: "The room has been added." });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create room.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: typeof formData }) =>
      apiRequest("PATCH", `/api/rooms/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/venues", venueId, "rooms"] });
      toast({ title: "Room updated", description: "Changes have been saved." });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update room.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/rooms/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/venues", venueId, "rooms"] });
      toast({ title: "Room deleted", description: "The room has been removed." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete room.", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({ roomNumber: "", roomTypeId: "", floor: "", notes: "" });
    setEditingRoom(null);
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setFormData({
      roomNumber: room.roomNumber,
      roomTypeId: room.roomTypeId,
      floor: room.floor || "",
      notes: room.notes || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.roomNumber || !formData.roomTypeId) return;
    if (editingRoom) {
      updateMutation.mutate({ id: editingRoom.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const getRoomTypeName = (typeId: string) => {
    const type = roomTypes.find((rt) => rt.id === typeId);
    return type?.name || "Unknown";
  };

  const activeRooms = rooms.filter((r) => r.isActive);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Rooms</h1>
            <p className="text-sm text-muted-foreground">Manage individual rooms and their assignments</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2 w-full sm:w-auto" data-testid="button-add-room">
                <Plus className="w-4 h-4" />
                Add Room
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingRoom ? "Edit Room" : "Add Room"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Room Number</Label>
                  <Input
                    placeholder="e.g., 101"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    data-testid="input-room-number"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Room Type</Label>
                  <Select
                    value={formData.roomTypeId}
                    onValueChange={(value) => setFormData({ ...formData, roomTypeId: value })}
                  >
                    <SelectTrigger data-testid="select-room-type">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} - ${type.basePrice}/night
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Floor</Label>
                  <Input
                    placeholder="e.g., 1st Floor"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    data-testid="input-room-floor"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    placeholder="Any special notes about this room..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    data-testid="input-room-notes"
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={createMutation.isPending || updateMutation.isPending || !formData.roomTypeId}
                  data-testid="button-save-room"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingRoom ? "Update Room" : "Create Room"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <DoorOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="text-rooms-count">{rooms.length}</p>
                <p className="text-sm text-muted-foreground">Total Rooms</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-full bg-green-500/10 text-green-500">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="text-active-rooms">{activeRooms.length}</p>
                <p className="text-sm text-muted-foreground">Active Rooms</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {roomTypes.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">You need to create room types before adding rooms.</p>
              <Button variant="ghost" className="mt-2" onClick={() => window.location.href = `/${venueId}/room-types`}>
                Go to Room Types
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">All Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground text-center py-8">Loading...</p>
            ) : rooms.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No rooms configured. Add your first room above.</p>
            ) : (
              <div className="space-y-3">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="flex items-center justify-between p-3 rounded-md border bg-muted/30"
                    data-testid={`room-${room.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-background">
                        <DoorOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Room {room.roomNumber}</p>
                          {!room.isActive && <Badge variant="secondary">Inactive</Badge>}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{getRoomTypeName(room.roomTypeId)}</span>
                          {room.floor && <span>• {room.floor}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(room)}
                        data-testid={`button-edit-room-${room.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteMutation.mutate(room.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-room-${room.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
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
