import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Bed, Plus, Trash2, Save, DollarSign, Users, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/dashboard-layout";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface RoomType {
  id: string;
  venueId: string;
  name: string;
  description: string | null;
  basePrice: string;
  maxOccupancy: number;
  amenities: string | null;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
}

export default function RoomTypes() {
  const { venueId } = useParams<{ venueId: string }>();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<RoomType | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    maxOccupancy: "2",
    amenities: "",
  });

  useEffect(() => {
    document.title = "Room Types - Resto Dashboard";
  }, []);

  const { data: roomTypes = [], isLoading } = useQuery<RoomType[]>({
    queryKey: ["/api/venues", venueId, "room-types"],
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) =>
      apiRequest("POST", `/api/venues/${venueId}/room-types`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/venues", venueId, "room-types"] });
      toast({ title: "Room type created", description: "The room type has been added." });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create room type.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: typeof formData }) =>
      apiRequest("PATCH", `/api/room-types/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/venues", venueId, "room-types"] });
      toast({ title: "Room type updated", description: "Changes have been saved." });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update room type.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/room-types/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/venues", venueId, "room-types"] });
      toast({ title: "Room type deleted", description: "The room type has been removed." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete room type.", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({ name: "", description: "", basePrice: "", maxOccupancy: "2", amenities: "" });
    setEditingType(null);
  };

  const handleEdit = (roomType: RoomType) => {
    setEditingType(roomType);
    setFormData({
      name: roomType.name,
      description: roomType.description || "",
      basePrice: roomType.basePrice,
      maxOccupancy: roomType.maxOccupancy.toString(),
      amenities: roomType.amenities || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.basePrice) return;
    if (editingType) {
      updateMutation.mutate({ id: editingType.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const totalCapacity = roomTypes.reduce((sum, rt) => sum + rt.maxOccupancy, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Room Types</h1>
            <p className="text-sm text-muted-foreground">Configure room categories and pricing</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2 w-full sm:w-auto" data-testid="button-add-room-type">
                <Plus className="w-4 h-4" />
                Add Room Type
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingType ? "Edit Room Type" : "Add Room Type"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    placeholder="e.g., Deluxe Suite"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="input-room-type-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Base Price (per night)</Label>
                  <Input
                    type="number"
                    placeholder="199.00"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                    data-testid="input-room-type-price"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Occupancy</Label>
                  <Input
                    type="number"
                    value={formData.maxOccupancy}
                    onChange={(e) => setFormData({ ...formData, maxOccupancy: e.target.value })}
                    data-testid="input-room-type-occupancy"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Room description..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    data-testid="input-room-type-description"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amenities (comma-separated)</Label>
                  <Input
                    placeholder="WiFi, TV, Mini Bar, Air Conditioning"
                    value={formData.amenities}
                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                    data-testid="input-room-type-amenities"
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-room-type"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingType ? "Update Room Type" : "Create Room Type"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="text-room-types-count">{roomTypes.length}</p>
                <p className="text-sm text-muted-foreground">Room Types</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-full bg-green-500/10 text-green-500">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="text-total-capacity">{totalCapacity}</p>
                <p className="text-sm text-muted-foreground">Total Max Occupancy</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Room Types</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground text-center py-8">Loading...</p>
            ) : roomTypes.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No room types configured. Add your first room type above.</p>
            ) : (
              <div className="space-y-3">
                {roomTypes.map((roomType) => (
                  <div
                    key={roomType.id}
                    className="flex items-center justify-between p-3 rounded-md border bg-muted/30"
                    data-testid={`room-type-${roomType.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-background">
                        <Bed className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">{roomType.name}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {roomType.basePrice}/night
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {roomType.maxOccupancy} guests
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(roomType)}
                        data-testid={`button-edit-room-type-${roomType.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteMutation.mutate(roomType.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-room-type-${roomType.id}`}
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
