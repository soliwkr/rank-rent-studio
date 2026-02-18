import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { MoreHorizontal, Search } from "lucide-react";

const users = [
  { id: 1, name: "Jessica Monroe", email: "jessica@bluedigital.com", agency: "Blue Digital Agency", role: "Owner", lastLogin: "2 min ago", status: "Active" },
  { id: 2, name: "Martin Schaefer", email: "martin@peakseo.com", agency: "Peak SEO Group", role: "Owner", lastLogin: "1 hr ago", status: "Active" },
  { id: 3, name: "Rachel Torres", email: "rachel@horizonmktg.com", agency: "Horizon Marketing Co", role: "Admin", lastLogin: "3 hrs ago", status: "Active" },
  { id: 4, name: "Liam Chen", email: "liam@bluedigital.com", agency: "Blue Digital Agency", role: "Editor", lastLogin: "1 day ago", status: "Active" },
  { id: 5, name: "Alex Porter", email: "alex@sparkcontent.io", agency: "Spark Content Studio", role: "Viewer", lastLogin: "14 days ago", status: "Suspended" },
];

const roleVariant = (role: string) => {
  if (role === "Owner") return "default" as const;
  if (role === "Admin") return "secondary" as const;
  return "outline" as const;
};

export default function AdminUsersAll() {
  const [search, setSearch] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchAgency = agencyFilter === "all" || u.agency === agencyFilter;
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchAgency && matchRole && matchStatus;
  });

  return (
    <AdminLayout>
    <div className="space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">All Users</h1>
        <Badge variant="secondary" data-testid="badge-total-users">312</Badge>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-testid="input-search-users"
          />
        </div>
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
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[140px]" data-testid="select-role-filter">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Owner">Owner</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]" data-testid="select-status-filter">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Agency</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id} data-testid={`row-user-${user.id}`}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell className="text-muted-foreground">{user.agency}</TableCell>
                  <TableCell>
                    <Badge variant={roleVariant(user.role)} data-testid={`badge-role-${user.id}`}>{user.role}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "destructive"} data-testid={`badge-status-${user.id}`}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-actions-user-${user.id}`}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem data-testid={`action-view-user-${user.id}`}>View</DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-edit-user-${user.id}`}>Edit</DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-reset-password-${user.id}`}>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-suspend-user-${user.id}`}>Suspend</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" data-testid={`action-delete-user-${user.id}`}>Delete</DropdownMenuItem>
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
