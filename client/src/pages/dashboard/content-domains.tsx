import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, CheckCircle, Pencil, Trash2 } from "lucide-react";

const sampleDomains = [
  { id: 1, domain: "example.com", status: "Verified", postsPublished: 42, added: "2025-09-10" },
  { id: 2, domain: "blog.example.com", status: "Pending", postsPublished: 0, added: "2026-02-05" },
  { id: 3, domain: "shop.example.com", status: "Failed", postsPublished: 0, added: "2026-01-20" },
];

function statusVariant(status: string): "default" | "secondary" | "destructive" {
  if (status === "Verified") return "default";
  if (status === "Pending") return "secondary";
  return "destructive";
}

export default function ContentDomains() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Domains</h1>
        <Button data-testid="button-add-domain">
          <Plus className="w-4 h-4 mr-2" />
          Add Domain
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Posts Published</TableHead>
                <TableHead>Added</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleDomains.map((d) => (
                <TableRow key={d.id} data-testid={`row-domain-${d.id}`}>
                  <TableCell className="font-medium" data-testid={`text-domain-${d.id}`}>{d.domain}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(d.status)} data-testid={`badge-domain-status-${d.id}`}>{d.status}</Badge>
                  </TableCell>
                  <TableCell data-testid={`text-posts-published-${d.id}`}>{d.postsPublished}</TableCell>
                  <TableCell className="text-muted-foreground">{d.added}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      <Button variant="ghost" size="icon" data-testid={`button-verify-domain-${d.id}`}>
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-edit-domain-${d.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-remove-domain-${d.id}`}>
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
    </div>
  );
}
