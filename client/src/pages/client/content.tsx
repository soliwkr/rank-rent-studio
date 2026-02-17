import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Eye,
  MousePointer,
  Clock,
  CheckCircle2,
  XCircle,
  Pencil,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { useWorkspace } from "@/lib/workspace-context";
import type { BlogPost } from "@shared/schema";

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "published":
      return <Badge className="bg-green-600 dark:bg-green-700 text-white" data-testid={`badge-status-${status}`}><CheckCircle2 className="w-3 h-3 mr-1" />{status}</Badge>;
    case "scheduled":
      return <Badge variant="secondary" data-testid={`badge-status-${status}`}><Clock className="w-3 h-3 mr-1" />{status}</Badge>;
    case "review":
      return <Badge variant="secondary" className="bg-blue-600/10 text-blue-700 dark:text-blue-400" data-testid={`badge-status-${status}`}><Eye className="w-3 h-3 mr-1" />review</Badge>;
    case "rejected":
      return <Badge variant="destructive" data-testid={`badge-status-${status}`}><XCircle className="w-3 h-3 mr-1" />{status}</Badge>;
    default:
      return <Badge variant="outline" data-testid={`badge-status-${status}`}><Pencil className="w-3 h-3 mr-1" />{status}</Badge>;
  }
}

export default function ClientContent() {
  const { selectedWorkspace } = useWorkspace();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("createdAt");

  const { data: allPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const posts = (allPosts || []).filter((p) => {
    if (selectedWorkspace && p.workspaceId !== selectedWorkspace.id) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    return true;
  });

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortField === "createdAt") {
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
    if (sortField === "clicks") return (b.clicks || 0) - (a.clicks || 0);
    if (sortField === "impressions") return (b.impressions || 0) - (a.impressions || 0);
    if (sortField === "wordCount") return (b.wordCount || 0) - (a.wordCount || 0);
    return 0;
  });

  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;
  const totalClicks = posts.reduce((sum, p) => sum + (p.clicks || 0), 0);
  const totalImpressions = posts.reduce((sum, p) => sum + (p.impressions || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" data-testid="text-page-title">My Content</h1>
        <p className="text-muted-foreground mt-1">
          View your published and scheduled content
          {selectedWorkspace && (
            <span className="ml-1">
              for <span className="font-medium text-foreground">{selectedWorkspace.name}</span>
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Published", value: published, icon: FileText, color: "text-green-600 dark:text-green-400" },
          { label: "Drafts", value: drafts, icon: FileText, color: "text-yellow-600 dark:text-yellow-400" },
          { label: "Total Clicks", value: totalClicks.toLocaleString(), icon: MousePointer, color: "text-primary" },
          { label: "Impressions", value: totalImpressions.toLocaleString(), icon: Eye, color: "text-primary" },
        ].map((m) => (
          <Card key={m.label} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm text-muted-foreground">{m.label}</p>
                <p className="text-xl font-bold mt-1" data-testid={`text-client-content-${m.label.toLowerCase().replace(/\s+/g, '-')}`}>{m.value}</p>
              </div>
              <m.icon className={`w-5 h-5 ${m.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32" data-testid="select-client-status-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          <Select value={sortField} onValueChange={setSortField}>
            <SelectTrigger className="w-32" data-testid="select-client-sort-field">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Newest</SelectItem>
              <SelectItem value="clicks">Clicks</SelectItem>
              <SelectItem value="impressions">Impressions</SelectItem>
              <SelectItem value="wordCount">Word Count</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <span className="text-sm text-muted-foreground ml-auto">
          {sortedPosts.length} post{sortedPosts.length !== 1 ? "s" : ""}
        </span>
      </div>

      <Card>
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Keyword</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Words</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Pos.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No content available yet.
                  </TableCell>
                </TableRow>
              ) : (
                sortedPosts.map((post) => (
                  <TableRow key={post.id} data-testid={`row-client-post-${post.id}`}>
                    <TableCell>
                      <span className="font-medium text-sm">{post.title}</span>
                    </TableCell>
                    <TableCell>
                      {post.primaryKeyword && (
                        <Badge variant="secondary" className="text-xs font-normal">
                          {post.primaryKeyword}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={post.status} />
                    </TableCell>
                    <TableCell className="text-right text-sm font-mono">
                      {post.wordCount?.toLocaleString() || "\u2014"}
                    </TableCell>
                    <TableCell className="text-right text-sm font-mono">
                      {post.clicks?.toLocaleString() || "0"}
                    </TableCell>
                    <TableCell className="text-right text-sm font-mono">
                      {post.position ? `#${post.position.toFixed(1)}` : "\u2014"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
