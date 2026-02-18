import { useState } from "react";
import { useWorkspace } from "@/lib/workspace-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Layers, Search, MoreHorizontal, Pencil, Eye, Copy, FileDown, Trash2 } from "lucide-react";

const samplePosts = [
  {
    id: 1,
    title: "How to Improve Your Local SEO Rankings in 2026",
    category: "SEO",
    status: "Published",
    words: 2450,
    images: 6,
    schema: "Article",
    publishedDate: "2026-02-10",
  },
  {
    id: 2,
    title: "Complete Guide to Technical SEO Audits for Agencies",
    category: "Technical SEO",
    status: "Draft",
    words: 3120,
    images: 8,
    schema: "HowTo",
    publishedDate: null,
  },
  {
    id: 3,
    title: "10 Link Building Strategies That Still Work",
    category: "Link Building",
    status: "Review",
    words: 1890,
    images: 4,
    schema: "Article",
    publishedDate: null,
  },
  {
    id: 4,
    title: "Why Content Marketing Drives Organic Growth",
    category: "Content",
    status: "Published",
    words: 2780,
    images: 5,
    schema: "BlogPosting",
    publishedDate: "2026-01-28",
  },
  {
    id: 5,
    title: "Schema Markup Best Practices for E-Commerce Sites",
    category: "Technical SEO",
    status: "Scheduled",
    words: 2100,
    images: 3,
    schema: "FAQPage",
    publishedDate: "2026-02-20",
  },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Published":
      return "default" as const;
    case "Draft":
      return "secondary" as const;
    case "Review":
      return "outline" as const;
    case "Scheduled":
      return "secondary" as const;
    default:
      return "secondary" as const;
  }
};

export default function ContentPosts() {
  const { selectedWorkspace } = useWorkspace();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [schemaFilter, setSchemaFilter] = useState("all");

  const filtered = samplePosts.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    if (schemaFilter !== "all" && p.schema !== schemaFilter) return false;
    return true;
  });

  const categories = Array.from(new Set(samplePosts.map((p) => p.category)));
  const schemas = Array.from(new Set(samplePosts.map((p) => p.schema)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Posts</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Button data-testid="button-new-post">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
          <Button variant="outline" data-testid="button-bulk-generate">
            <Layers className="w-4 h-4 mr-2" />
            Bulk Generate
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-testid="input-search-posts"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]" data-testid="select-status-filter">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Review">Review</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[150px]" data-testid="select-category-filter">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={schemaFilter} onValueChange={setSchemaFilter}>
          <SelectTrigger className="w-[150px]" data-testid="select-schema-filter">
            <SelectValue placeholder="Schema Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Schemas</SelectItem>
            {schemas.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Words</TableHead>
                <TableHead className="text-right">Images</TableHead>
                <TableHead>Schema</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((post) => (
                <TableRow key={post.id} data-testid={`row-post-${post.id}`}>
                  <TableCell className="font-medium max-w-[300px] truncate" data-testid={`text-post-title-${post.id}`}>
                    {post.title}
                  </TableCell>
                  <TableCell data-testid={`text-post-category-${post.id}`}>{post.category}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(post.status)} data-testid={`badge-post-status-${post.id}`}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right" data-testid={`text-post-words-${post.id}`}>
                    {post.words.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right" data-testid={`text-post-images-${post.id}`}>
                    {post.images}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" data-testid={`badge-post-schema-${post.id}`}>
                      {post.schema}
                    </Badge>
                  </TableCell>
                  <TableCell data-testid={`text-post-date-${post.id}`}>
                    {post.publishedDate || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-post-actions-${post.id}`}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem data-testid={`action-edit-${post.id}`}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-preview-${post.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-duplicate-${post.id}`}>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-export-${post.id}`}>
                          <FileDown className="w-4 h-4 mr-2" />
                          Export MDX
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" data-testid={`action-delete-${post.id}`}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
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
  );
}
