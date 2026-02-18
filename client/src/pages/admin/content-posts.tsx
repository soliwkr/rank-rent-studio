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

const posts = [
  { id: 1, title: "10 Local SEO Tips for Restaurants in 2026", agency: "Blue Digital Agency", workspace: "Bella Cucina", status: "Published", words: 2340, images: 6, schema: "Article", published: "Feb 14, 2026" },
  { id: 2, title: "How to Optimize Google Business Profile for Hotels", agency: "Peak SEO Group", workspace: "Grand Meridian", status: "Review", words: 1870, images: 4, schema: "LocalBusiness", published: "-" },
  { id: 3, title: "Complete Guide to Schema Markup for Restaurants", agency: "Horizon Marketing Co", workspace: "Savory Eats", status: "Draft", words: 980, images: 2, schema: "FAQ", published: "-" },
  { id: 4, title: "Voice Search Optimization for Hospitality Brands", agency: "Blue Digital Agency", workspace: "Coastal Inn", status: "Scheduled", words: 3100, images: 8, schema: "Article", published: "Feb 20, 2026" },
  { id: 5, title: "Why Every Cafe Needs a Content Marketing Strategy", agency: "Evergreen Digital", workspace: "Brewed Bliss", status: "Published", words: 1560, images: 3, schema: "Article", published: "Feb 10, 2026" },
];

const statusVariant = (status: string) => {
  if (status === "Published") return "default" as const;
  if (status === "Draft") return "secondary" as const;
  if (status === "Review") return "outline" as const;
  return "secondary" as const;
};

export default function AdminContentPosts() {
  const [search, setSearch] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchAgency = agencyFilter === "all" || p.agency === agencyFilter;
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchCategory = categoryFilter === "all" || p.schema === categoryFilter;
    return matchSearch && matchAgency && matchStatus && matchCategory;
  });

  return (
    <AdminLayout>
    <div className="space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">All Posts</h1>
        <Badge variant="secondary" data-testid="badge-total-posts">847</Badge>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Select value={agencyFilter} onValueChange={setAgencyFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-agency-filter">
            <SelectValue placeholder="Agency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Agencies</SelectItem>
            <SelectItem value="Blue Digital Agency">Blue Digital Agency</SelectItem>
            <SelectItem value="Peak SEO Group">Peak SEO Group</SelectItem>
            <SelectItem value="Horizon Marketing Co">Horizon Marketing Co</SelectItem>
            <SelectItem value="Evergreen Digital">Evergreen Digital</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]" data-testid="select-status-filter">
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
          <SelectTrigger className="w-[160px]" data-testid="select-category-filter">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Schemas</SelectItem>
            <SelectItem value="Article">Article</SelectItem>
            <SelectItem value="LocalBusiness">LocalBusiness</SelectItem>
            <SelectItem value="FAQ">FAQ</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-testid="input-search-posts"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Agency</TableHead>
                <TableHead>Workspace</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Words</TableHead>
                <TableHead className="text-right">Images</TableHead>
                <TableHead>Schema</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((post) => (
                <TableRow key={post.id} data-testid={`row-post-${post.id}`}>
                  <TableCell className="font-medium max-w-[250px] truncate">{post.title}</TableCell>
                  <TableCell className="text-muted-foreground">{post.agency}</TableCell>
                  <TableCell className="text-muted-foreground">{post.workspace}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(post.status)} data-testid={`badge-status-${post.id}`}>{post.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{post.words.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{post.images}</TableCell>
                  <TableCell>
                    <Badge variant="outline" data-testid={`badge-schema-${post.id}`}>{post.schema}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{post.published}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-actions-post-${post.id}`}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem data-testid={`action-view-post-${post.id}`}>View</DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-flag-post-${post.id}`}>Flag</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" data-testid={`action-delete-post-${post.id}`}>Delete</DropdownMenuItem>
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
