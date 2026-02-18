import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link2, Play, X, Search, Wrench, Trash2, RefreshCw } from "lucide-react";

const suggestions = [
  { id: 1, source: "10 SEO Tips for 2026", target: "Keyword Research Guide", anchor: "keyword research", relevance: 92 },
  { id: 2, source: "Content Marketing 101", target: "Blog Writing Best Practices", anchor: "writing tips", relevance: 87 },
  { id: 3, source: "Technical SEO Checklist", target: "Site Speed Optimization", anchor: "page speed", relevance: 85 },
  { id: 4, source: "Link Building Strategies", target: "Outreach Templates", anchor: "outreach guide", relevance: 80 },
  { id: 5, source: "Local SEO Guide", target: "Google Business Profile Tips", anchor: "GBP optimization", relevance: 78 },
];

const autoLinkResults = [
  { id: 1, post: "Getting Started with SEO", linksAdded: 4, details: "Added links to Keyword Research, On-Page SEO, Technical SEO, Analytics" },
  { id: 2, post: "Content Strategy Framework", linksAdded: 3, details: "Added links to Editorial Calendar, Content Types, Distribution" },
  { id: 3, post: "Social Media Integration", linksAdded: 2, details: "Added links to Platform Guide, Analytics Dashboard" },
];

const orphanPosts = [
  { id: 1, title: "Advanced Schema Markup", published: "2026-01-28", incomingLinks: 0 },
  { id: 2, title: "Voice Search Optimization", published: "2026-01-15", incomingLinks: 0 },
  { id: 3, title: "E-commerce SEO Tips", published: "2025-12-20", incomingLinks: 0 },
];

const linkHealth = [
  { id: 1, url: "https://example.com/services", status: 200, post: "About Our Services", anchor: "our services", lastChecked: "2026-02-18" },
  { id: 2, url: "https://example.com/old-page", status: 301, post: "Company History", anchor: "learn more", lastChecked: "2026-02-18" },
  { id: 3, url: "https://external.com/resource", status: 404, post: "Resource Guide", anchor: "external resource", lastChecked: "2026-02-17" },
  { id: 4, url: "https://example.com/blog/tips", status: 200, post: "SEO Blog", anchor: "read tips", lastChecked: "2026-02-18" },
];

function statusBadgeVariant(status: number): "default" | "secondary" | "destructive" {
  if (status === 200) return "default";
  if (status === 301) return "secondary";
  return "destructive";
}

export default function SeoLinks() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Link Builder</h1>
      </div>

      <Tabs defaultValue="suggestions" data-testid="tabs-links">
        <TabsList>
          <TabsTrigger value="suggestions" data-testid="tab-suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="auto-link" data-testid="tab-auto-link">Auto-Link</TabsTrigger>
          <TabsTrigger value="orphan" data-testid="tab-orphan">Orphan Report</TabsTrigger>
          <TabsTrigger value="health" data-testid="tab-health">Link Health</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle>Link Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source Post</TableHead>
                    <TableHead>Target Post</TableHead>
                    <TableHead>Anchor Text</TableHead>
                    <TableHead>Relevance Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suggestions.map((s) => (
                    <TableRow key={s.id} data-testid={`row-suggestion-${s.id}`}>
                      <TableCell className="font-medium">{s.source}</TableCell>
                      <TableCell>{s.target}</TableCell>
                      <TableCell className="text-muted-foreground">{s.anchor}</TableCell>
                      <TableCell data-testid={`text-relevance-${s.id}`}>{s.relevance}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 flex-wrap">
                          <Button variant="ghost" size="icon" data-testid={`button-apply-link-${s.id}`}>
                            <Link2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" data-testid={`button-dismiss-${s.id}`}>
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
        </TabsContent>

        <TabsContent value="auto-link">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <CardTitle>Auto-Link Results</CardTitle>
              <Button data-testid="button-run-auto-link">
                <Play className="w-4 h-4 mr-2" />
                Run Bulk Auto-Link
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 rounded-md bg-muted/50 text-sm text-muted-foreground" data-testid="text-auto-link-summary">
                Last run: 9 links added across 3 posts
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Post</TableHead>
                    <TableHead>Links Added</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {autoLinkResults.map((r) => (
                    <TableRow key={r.id} data-testid={`row-autolink-${r.id}`}>
                      <TableCell className="font-medium">{r.post}</TableCell>
                      <TableCell data-testid={`text-links-added-${r.id}`}>{r.linksAdded}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{r.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orphan">
          <Card>
            <CardHeader>
              <CardTitle>Orphan Report</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Post Title</TableHead>
                    <TableHead>Published Date</TableHead>
                    <TableHead>Incoming Links</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orphanPosts.map((o) => (
                    <TableRow key={o.id} data-testid={`row-orphan-${o.id}`}>
                      <TableCell className="font-medium">{o.title}</TableCell>
                      <TableCell className="text-muted-foreground">{o.published}</TableCell>
                      <TableCell data-testid={`text-incoming-links-${o.id}`}>{o.incomingLinks}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" data-testid={`button-find-opportunities-${o.id}`}>
                          <Search className="w-4 h-4 mr-1" />
                          Find Opportunities
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <CardTitle>Link Health</CardTitle>
              <Button data-testid="button-check-all-links">
                <RefreshCw className="w-4 h-4 mr-2" />
                Check All Links
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Post</TableHead>
                    <TableHead>Anchor Text</TableHead>
                    <TableHead>Last Checked</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {linkHealth.map((l) => (
                    <TableRow key={l.id} data-testid={`row-link-health-${l.id}`}>
                      <TableCell className="font-medium text-sm max-w-[200px] truncate">{l.url}</TableCell>
                      <TableCell>
                        <Badge variant={statusBadgeVariant(l.status)} data-testid={`badge-link-status-${l.id}`}>{l.status}</Badge>
                      </TableCell>
                      <TableCell>{l.post}</TableCell>
                      <TableCell className="text-muted-foreground">{l.anchor}</TableCell>
                      <TableCell className="text-muted-foreground">{l.lastChecked}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 flex-wrap">
                          <Button variant="ghost" size="icon" data-testid={`button-fix-link-${l.id}`}>
                            <Wrench className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" data-testid={`button-remove-link-${l.id}`}>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
