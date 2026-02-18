import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Search, Trash2 } from "lucide-react";

const samplePages = [
  { id: 1, title: "Home", url: "/", type: "Landing", seoScore: 92, lastUpdated: "2026-02-15" },
  { id: 2, title: "About", url: "/about", type: "Standard", seoScore: 85, lastUpdated: "2026-02-12" },
  { id: 3, title: "Services", url: "/services", type: "Standard", seoScore: 78, lastUpdated: "2026-02-10" },
  { id: 4, title: "Blog", url: "/blog", type: "Archive", seoScore: 88, lastUpdated: "2026-02-14" },
  { id: 5, title: "Contact", url: "/contact", type: "Standard", seoScore: 71, lastUpdated: "2026-02-08" },
];

export default function ContentPages() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Pages</h1>
        <Button data-testid="button-add-page">
          <Plus className="w-4 h-4 mr-2" />
          Add Page
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>All Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Title</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>SEO Score</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {samplePages.map((page) => (
                <TableRow key={page.id} data-testid={`row-page-${page.id}`}>
                  <TableCell className="font-medium" data-testid={`text-page-title-${page.id}`}>{page.title}</TableCell>
                  <TableCell className="text-muted-foreground" data-testid={`text-page-url-${page.id}`}>{page.url}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" data-testid={`badge-page-type-${page.id}`}>{page.type}</Badge>
                  </TableCell>
                  <TableCell data-testid={`text-seo-score-${page.id}`}>{page.seoScore}/100</TableCell>
                  <TableCell className="text-muted-foreground">{page.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      <Button variant="ghost" size="icon" data-testid={`button-edit-page-${page.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-audit-page-${page.id}`}>
                        <Search className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-delete-page-${page.id}`}>
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
