import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Eye, MessageSquare } from "lucide-react";

const tickets = [
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
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Support</h1>
        <Button data-testid="button-new-ticket">
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
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
              {tickets.map((t) => (
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
                      <Button variant="ghost" size="icon" data-testid={`button-view-ticket-${t.id}`}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-reply-ticket-${t.id}`}>
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
    </div>
  );
}
