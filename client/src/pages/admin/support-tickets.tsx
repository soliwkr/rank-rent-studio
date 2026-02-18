import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const tickets = [
  { id: "TKT-1042", subject: "Widget not loading on Safari browsers", agency: "Blue Digital Agency", priority: "High", status: "Open", created: "2 hrs ago", assignedTo: "James Park" },
  { id: "TKT-1041", subject: "Lead confirmation emails are delayed by 30+ minutes", agency: "Peak SEO Group", priority: "Urgent", status: "Open", created: "4 hrs ago", assignedTo: "Unassigned" },
  { id: "TKT-1040", subject: "Cannot add new team member to workspace", agency: "Horizon Marketing Co", priority: "Medium", status: "In Progress", created: "6 hrs ago", assignedTo: "Sarah Lin" },
  { id: "TKT-1039", subject: "Rank tracker showing incorrect keyword positions", agency: "Spark Content Studio", priority: "Low", status: "Resolved", created: "1 day ago", assignedTo: "James Park" },
  { id: "TKT-1038", subject: "Custom domain SSL certificate renewal failed", agency: "Evergreen Digital", priority: "High", status: "In Progress", created: "1 day ago", assignedTo: "Sarah Lin" },
];

const priorityVariant = (priority: string) => {
  if (priority === "Low") return "secondary" as const;
  if (priority === "Medium") return "outline" as const;
  if (priority === "Urgent") return "destructive" as const;
  return "default" as const;
};

const statusVariant = (status: string) => {
  if (status === "Open") return "destructive" as const;
  if (status === "In Progress") return "default" as const;
  if (status === "Resolved") return "secondary" as const;
  return "outline" as const;
};

export default function AdminSupportTickets() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [agencyFilter, setAgencyFilter] = useState("all");

  const filtered = tickets.filter((t) => {
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
    const matchAgency = agencyFilter === "all" || t.agency === agencyFilter;
    return matchStatus && matchPriority && matchAgency;
  });

  return (
    <AdminLayout>
    <div className="space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Support Tickets</h1>
        <Badge variant="secondary" data-testid="badge-open-tickets">23 open</Badge>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]" data-testid="select-status-filter">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[160px]" data-testid="select-priority-filter">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
        <Select value={agencyFilter} onValueChange={setAgencyFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-agency-filter">
            <SelectValue placeholder="Agency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Agencies</SelectItem>
            <SelectItem value="Blue Digital Agency">Blue Digital Agency</SelectItem>
            <SelectItem value="Peak SEO Group">Peak SEO Group</SelectItem>
            <SelectItem value="Horizon Marketing Co">Horizon Marketing Co</SelectItem>
            <SelectItem value="Spark Content Studio">Spark Content Studio</SelectItem>
            <SelectItem value="Evergreen Digital">Evergreen Digital</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Agency</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((ticket) => (
                <TableRow key={ticket.id} data-testid={`row-ticket-${ticket.id}`}>
                  <TableCell className="font-medium text-muted-foreground">{ticket.id}</TableCell>
                  <TableCell className="font-medium max-w-[280px] truncate">{ticket.subject}</TableCell>
                  <TableCell className="text-muted-foreground">{ticket.agency}</TableCell>
                  <TableCell>
                    <Badge variant={priorityVariant(ticket.priority)} data-testid={`badge-priority-${ticket.id}`}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(ticket.status)} data-testid={`badge-status-${ticket.id}`}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{ticket.created}</TableCell>
                  <TableCell className="text-muted-foreground">{ticket.assignedTo}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-actions-ticket-${ticket.id}`}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem data-testid={`action-view-ticket-${ticket.id}`}>View</DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-assign-ticket-${ticket.id}`}>Assign</DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-reply-ticket-${ticket.id}`}>Reply</DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-close-ticket-${ticket.id}`}>Close</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
}
