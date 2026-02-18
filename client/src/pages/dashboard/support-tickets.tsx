import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Eye, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialTickets = [
  { id: "TKT-1024", subject: "Widget not loading on mobile Safari", priority: "High", status: "Open", created: "2026-02-18", lastReply: "2026-02-18" },
  { id: "TKT-1023", subject: "API rate limit exceeded during bulk import", priority: "Medium", status: "In Progress", created: "2026-02-17", lastReply: "2026-02-18" },
  { id: "TKT-1022", subject: "Custom domain SSL certificate renewal", priority: "High", status: "Open", created: "2026-02-16", lastReply: "2026-02-17" },
  { id: "TKT-1021", subject: "How to configure webhook endpoints", priority: "Low", status: "Resolved", created: "2026-02-15", lastReply: "2026-02-16" },
  { id: "TKT-1020", subject: "Rank tracker data not updating", priority: "Medium", status: "Resolved", created: "2026-02-14", lastReply: "2026-02-15" },
];

function priorityVariant(priority: string): "default" | "secondary" | "destructive" {
  if (priority === "High") return "destructive";
  if (priority === "Medium") return "secondary";
  return "secondary";
}

function statusVariant(status: string): "default" | "secondary" {
  if (status === "Open") return "default";
  return "secondary";
}

export default function SupportTickets() {
  const { toast } = useToast();
  const [tickets, setTickets] = useState(initialTickets);
  const [statusFilter, setStatusFilter] = useState("all");

  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newDescription, setNewDescription] = useState("");

  const [viewTicketOpen, setViewTicketOpen] = useState(false);
  const [viewTicketId, setViewTicketId] = useState<string | null>(null);

  const [replyOpen, setReplyOpen] = useState(false);
  const [replyTicketId, setReplyTicketId] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  const filteredTickets = statusFilter === "all"
    ? tickets
    : tickets.filter((t) => t.status === statusFilter);

  const handleCreateTicket = () => {
    if (!newSubject.trim()) return;
    const ticketNum = 1025 + tickets.length;
    const newTicket = {
      id: `TKT-${ticketNum}`,
      subject: newSubject.trim(),
      priority: newPriority,
      status: "Open",
      created: new Date().toISOString().split("T")[0],
      lastReply: new Date().toISOString().split("T")[0],
    };
    setTickets((prev) => [newTicket, ...prev]);
    toast({ title: "Ticket created", description: `${newTicket.id}: ${newTicket.subject}` });
    setNewSubject("");
    setNewPriority("Medium");
    setNewDescription("");
    setNewTicketOpen(false);
  };

  const handleView = (ticketId: string) => {
    setViewTicketId(ticketId);
    setViewTicketOpen(true);
  };

  const handleReplyOpen = (ticketId: string) => {
    setReplyTicketId(ticketId);
    setReplyMessage("");
    setReplyOpen(true);
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;
    setTickets((prev) => prev.map((t) =>
      t.id === replyTicketId ? { ...t, lastReply: new Date().toISOString().split("T")[0], status: t.status === "Resolved" ? "In Progress" : t.status } : t
    ));
    toast({ title: "Reply sent", description: `Reply added to ${replyTicketId}` });
    setReplyMessage("");
    setReplyOpen(false);
  };

  const viewedTicket = tickets.find((t) => t.id === viewTicketId);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Support</h1>
        <Button data-testid="button-new-ticket" onClick={() => setNewTicketOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle>All Tickets</CardTitle>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]" data-testid="select-status-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Reply</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((t) => (
                <TableRow key={t.id} data-testid={`row-ticket-${t.id}`}>
                  <TableCell className="font-mono text-muted-foreground" data-testid={`text-ticket-id-${t.id}`}>{t.id}</TableCell>
                  <TableCell className="font-medium" data-testid={`text-ticket-subject-${t.id}`}>{t.subject}</TableCell>
                  <TableCell>
                    <Badge variant={priorityVariant(t.priority)} data-testid={`badge-priority-${t.id}`}>{t.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(t.status)} data-testid={`badge-ticket-status-${t.id}`}>{t.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{t.created}</TableCell>
                  <TableCell className="text-muted-foreground">{t.lastReply}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      <Button variant="ghost" size="icon" data-testid={`button-view-ticket-${t.id}`} onClick={() => handleView(t.id)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-reply-ticket-${t.id}`} onClick={() => handleReplyOpen(t.id)}>
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={newTicketOpen} onOpenChange={setNewTicketOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Support Ticket</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                placeholder="Brief description of your issue"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                data-testid="input-ticket-subject"
              />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={newPriority} onValueChange={setNewPriority}>
                <SelectTrigger data-testid="select-ticket-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe your issue in detail..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                data-testid="input-ticket-description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTicketOpen(false)} data-testid="button-cancel-new-ticket">Cancel</Button>
            <Button onClick={handleCreateTicket} data-testid="button-submit-ticket">Submit Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={viewTicketOpen} onOpenChange={setViewTicketOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
          </DialogHeader>
          {viewedTicket && (
            <div className="space-y-3 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-sm text-muted-foreground">{viewedTicket.id}</span>
                <Badge variant={priorityVariant(viewedTicket.priority)}>{viewedTicket.priority}</Badge>
                <Badge variant={statusVariant(viewedTicket.status)}>{viewedTicket.status}</Badge>
              </div>
              <p className="font-medium">{viewedTicket.subject}</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Created: {viewedTicket.created}</p>
                <p>Last Reply: {viewedTicket.lastReply}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewTicketOpen(false)} data-testid="button-close-view-ticket">Close</Button>
            <Button onClick={() => { setViewTicketOpen(false); if (viewedTicket) handleReplyOpen(viewedTicket.id); }} data-testid="button-reply-from-view">Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={replyOpen} onOpenChange={setReplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to {replyTicketId}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                placeholder="Type your reply..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                data-testid="input-reply-message"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyOpen(false)} data-testid="button-cancel-reply">Cancel</Button>
            <Button onClick={handleSendReply} data-testid="button-send-reply">Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
