import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Eye, Play, Trash2 } from "lucide-react";

const sampleCampaigns = [
  { id: 1, name: "Spring Product Launch", postCount: 12, completed: 8, status: "Active", created: "2026-01-15" },
  { id: 2, name: "SEO Content Series", postCount: 20, completed: 20, status: "Completed", created: "2025-11-01" },
  { id: 3, name: "Weekly Blog Updates", postCount: 8, completed: 5, status: "Active", created: "2026-02-01" },
  { id: 4, name: "Social Media Blitz", postCount: 15, completed: 0, status: "Paused", created: "2026-01-20" },
  { id: 5, name: "Customer Success Stories", postCount: 6, completed: 3, status: "Active", created: "2026-02-10" },
];

function statusVariant(status: string) {
  if (status === "Active") return "default";
  if (status === "Completed") return "secondary";
  return "secondary";
}

export default function ContentCampaigns() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Campaigns</h1>
        <Button data-testid="button-new-campaign">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Post Count</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleCampaigns.map((c) => (
                <TableRow key={c.id} data-testid={`row-campaign-${c.id}`}>
                  <TableCell className="font-medium" data-testid={`text-campaign-name-${c.id}`}>{c.name}</TableCell>
                  <TableCell data-testid={`text-post-count-${c.id}`}>{c.postCount}</TableCell>
                  <TableCell data-testid={`text-completed-${c.id}`}>{c.completed}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(c.status)} data-testid={`badge-status-${c.id}`}>{c.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{c.created}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      <Button variant="ghost" size="icon" data-testid={`button-view-posts-${c.id}`}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-resume-${c.id}`}>
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-delete-campaign-${c.id}`}>
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
