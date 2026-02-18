import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, UserMinus, RotateCcw, X } from "lucide-react";

const members = [
  { id: 1, name: "Alex Morgan", email: "alex@company.com", role: "owner", status: "Active", joined: "2025-06-15" },
  { id: 2, name: "Jordan Lee", email: "jordan@company.com", role: "admin", status: "Active", joined: "2025-08-20" },
  { id: 3, name: "Casey Rivera", email: "casey@company.com", role: "editor", status: "Active", joined: "2025-11-10" },
  { id: 4, name: "Taylor Kim", email: "taylor@company.com", role: "viewer", status: "Active", joined: "2026-01-05" },
];

const pendingInvites = [
  { id: 1, email: "sam@company.com", role: "editor", invited: "2026-02-15", status: "Pending" },
  { id: 2, email: "pat@company.com", role: "viewer", invited: "2026-02-17", status: "Pending" },
];

export default function SettingsTeamNew() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Team</h1>
        <Button data-testid="button-invite-member">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m.id} data-testid={`row-member-${m.id}`}>
                  <TableCell className="font-medium" data-testid={`text-member-name-${m.id}`}>{m.name}</TableCell>
                  <TableCell className="text-muted-foreground">{m.email}</TableCell>
                  <TableCell>
                    <Select defaultValue={m.role}>
                      <SelectTrigger className="w-[120px]" data-testid={`select-role-${m.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge data-testid={`badge-member-status-${m.id}`}>{m.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{m.joined}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      <Button variant="ghost" size="icon" data-testid={`button-remove-member-${m.id}`}>
                        <UserMinus className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Invites</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Invited</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingInvites.map((inv) => (
                <TableRow key={inv.id} data-testid={`row-invite-${inv.id}`}>
                  <TableCell className="font-medium">{inv.email}</TableCell>
                  <TableCell className="capitalize">{inv.role}</TableCell>
                  <TableCell className="text-muted-foreground">{inv.invited}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" data-testid={`badge-invite-status-${inv.id}`}>{inv.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      <Button variant="ghost" size="icon" data-testid={`button-resend-invite-${inv.id}`}>
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-cancel-invite-${inv.id}`}>
                        <X className="w-4 h-4" />
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
