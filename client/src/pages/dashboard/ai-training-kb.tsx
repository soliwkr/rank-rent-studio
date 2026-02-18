import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";

const entries = [
  { id: 1, title: "What are your business hours?", category: "General", type: "FAQ", status: "Active", updated: "2026-02-18" },
  { id: 2, title: "Return and refund policy", category: "Policies", type: "Info", status: "Active", updated: "2026-02-15" },
  { id: 3, title: "How to reset your password", category: "Account", type: "Instruction", status: "Active", updated: "2026-02-12" },
  { id: 4, title: "Pricing and plan details", category: "Sales", type: "Info", status: "Draft", updated: "2026-02-10" },
  { id: 5, title: "Troubleshooting common issues", category: "Support", type: "FAQ", status: "Active", updated: "2026-02-08" },
];

function typeBadgeVariant(type: string): "default" | "secondary" {
  if (type === "FAQ") return "default";
  return "secondary";
}

export default function AiTrainingKb() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Knowledge Base</h1>
        <Button data-testid="button-add-entry">
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </Button>
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
              {entries.map((e) => (
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
                      <Button variant="ghost" size="icon" data-testid={`button-edit-entry-${e.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-delete-entry-${e.id}`}>
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
