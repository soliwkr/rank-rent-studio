import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KbEntry {
  id: number;
  title: string;
  category: string;
  type: string;
  status: string;
  updated: string;
  content: string;
}

const initialEntries: KbEntry[] = [
  { id: 1, title: "What are your business hours?", category: "General", type: "FAQ", status: "Active", updated: "2026-02-18", content: "Our business hours are Monday through Friday, 9 AM to 6 PM." },
  { id: 2, title: "Return and refund policy", category: "Policies", type: "Info", status: "Active", updated: "2026-02-15", content: "We offer a 30-day return policy for all unused items." },
  { id: 3, title: "How to reset your password", category: "Account", type: "Instruction", status: "Active", updated: "2026-02-12", content: "Go to Settings > Security > Reset Password and follow the prompts." },
  { id: 4, title: "Pricing and plan details", category: "Sales", type: "Info", status: "Draft", updated: "2026-02-10", content: "We offer three plans: Starter ($29/mo), Pro ($79/mo), and Enterprise (custom)." },
  { id: 5, title: "Troubleshooting common issues", category: "Support", type: "FAQ", status: "Active", updated: "2026-02-08", content: "Try clearing your cache and cookies, then restart the application." },
];

function typeBadgeVariant(type: string): "default" | "secondary" {
  if (type === "FAQ") return "default";
  return "secondary";
}

export default function AiTrainingKb() {
  const { toast } = useToast();
  const [entries, setEntries] = useState<KbEntry[]>(initialEntries);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<KbEntry | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("General");
  const [formType, setFormType] = useState("FAQ");
  const [formStatus, setFormStatus] = useState("Active");
  const [formContent, setFormContent] = useState("");

  const filtered = entries.filter((e) => {
    if (search && !e.title.toLowerCase().includes(search.toLowerCase()) && !e.category.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const resetForm = () => {
    setFormTitle("");
    setFormCategory("General");
    setFormType("FAQ");
    setFormStatus("Active");
    setFormContent("");
  };

  const handleAddOpen = () => {
    resetForm();
    setAddOpen(true);
  };

  const handleAddEntry = () => {
    const newEntry: KbEntry = {
      id: Math.max(0, ...entries.map((e) => e.id)) + 1,
      title: formTitle,
      category: formCategory,
      type: formType,
      status: formStatus,
      updated: new Date().toISOString().split("T")[0],
      content: formContent,
    };
    setEntries([...entries, newEntry]);
    setAddOpen(false);
    toast({ title: "Entry Added", description: `"${formTitle}" has been added to the knowledge base.` });
  };

  const handleEditOpen = (entry: KbEntry) => {
    setSelectedEntry(entry);
    setFormTitle(entry.title);
    setFormCategory(entry.category);
    setFormType(entry.type);
    setFormStatus(entry.status);
    setFormContent(entry.content);
    setEditOpen(true);
  };

  const handleEditEntry = () => {
    if (!selectedEntry) return;
    setEntries(entries.map((e) => e.id === selectedEntry.id ? { ...e, title: formTitle, category: formCategory, type: formType, status: formStatus, content: formContent, updated: new Date().toISOString().split("T")[0] } : e));
    setEditOpen(false);
    toast({ title: "Entry Updated", description: `"${formTitle}" has been updated.` });
  };

  const handleDeleteOpen = (entry: KbEntry) => {
    setSelectedEntry(entry);
    setDeleteOpen(true);
  };

  const handleDeleteEntry = () => {
    if (!selectedEntry) return;
    setEntries(entries.filter((e) => e.id !== selectedEntry.id));
    setDeleteOpen(false);
    toast({ title: "Entry Deleted", description: `"${selectedEntry.title}" has been removed from the knowledge base.` });
  };

  const entryForm = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Entry title" data-testid="input-entry-title" />
      </div>
      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={formCategory} onValueChange={setFormCategory}>
          <SelectTrigger data-testid="select-entry-category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="General">General</SelectItem>
            <SelectItem value="Policies">Policies</SelectItem>
            <SelectItem value="Account">Account</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
            <SelectItem value="Support">Support</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Type</Label>
        <Select value={formType} onValueChange={setFormType}>
          <SelectTrigger data-testid="select-entry-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FAQ">FAQ</SelectItem>
            <SelectItem value="Info">Info</SelectItem>
            <SelectItem value="Instruction">Instruction</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={formStatus} onValueChange={setFormStatus}>
          <SelectTrigger data-testid="select-entry-status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Content</Label>
        <Textarea value={formContent} onChange={(e) => setFormContent(e.target.value)} placeholder="Entry content..." className="min-h-[100px]" data-testid="textarea-entry-content" />
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Knowledge Base</h1>
        <Button data-testid="button-add-entry" onClick={handleAddOpen}>
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search entries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-testid="input-search-entries"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id} data-testid={`row-entry-${e.id}`}>
                  <TableCell className="font-medium" data-testid={`text-entry-title-${e.id}`}>{e.title}</TableCell>
                  <TableCell className="text-muted-foreground">{e.category}</TableCell>
                  <TableCell>
                    <Badge variant={typeBadgeVariant(e.type)} data-testid={`badge-type-${e.id}`}>{e.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={e.status === "Active" ? "default" : "secondary"} data-testid={`badge-status-${e.id}`}>{e.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{e.updated}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      <Button variant="ghost" size="icon" data-testid={`button-edit-entry-${e.id}`} onClick={() => handleEditOpen(e)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-delete-entry-${e.id}`} onClick={() => handleDeleteOpen(e)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Entry</DialogTitle>
          </DialogHeader>
          {entryForm}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)} data-testid="button-cancel-add-entry">Cancel</Button>
            <Button onClick={handleAddEntry} data-testid="button-confirm-add-entry">Add Entry</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Entry</DialogTitle>
          </DialogHeader>
          {entryForm}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} data-testid="button-cancel-edit-entry">Cancel</Button>
            <Button onClick={handleEditEntry} data-testid="button-confirm-edit-entry">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Entry</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to delete <span className="font-medium">"{selectedEntry?.title}"</span>? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)} data-testid="button-cancel-delete-entry">Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteEntry} data-testid="button-confirm-delete-entry">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
