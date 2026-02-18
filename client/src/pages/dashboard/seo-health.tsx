import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, AlertCircle, AlertTriangle, Info, Eye } from "lucide-react";

const criticalIssues = [
  { id: 1, title: "Missing page titles on 3 pages", description: "Pages /services, /about, /blog are missing title tags" },
  { id: 2, title: "Broken internal links detected", description: "4 broken links found across the site" },
];

const warningIssues = [
  { id: 1, title: "Short meta descriptions", description: "5 pages have meta descriptions under 120 characters" },
  { id: 2, title: "Missing alt text on images", description: "12 images across 4 pages are missing alt attributes" },
  { id: 3, title: "Thin content detected", description: "2 pages have fewer than 300 words of content" },
];

const infoIssues = [
  { id: 1, title: "Consider adding structured data", description: "FAQ and HowTo schema could improve rich results" },
  { id: 2, title: "Optimize image file sizes", description: "8 images could be compressed further for faster load times" },
];

const pageAudits = [
  { id: 1, page: "/", score: 92, critical: 0, warnings: 1, info: 1, lastAudited: "2026-02-18" },
  { id: 2, page: "/about", score: 74, critical: 1, warnings: 2, info: 0, lastAudited: "2026-02-18" },
  { id: 3, page: "/services", score: 68, critical: 1, warnings: 1, info: 1, lastAudited: "2026-02-17" },
  { id: 4, page: "/blog", score: 85, critical: 0, warnings: 1, info: 0, lastAudited: "2026-02-18" },
  { id: 5, page: "/contact", score: 79, critical: 0, warnings: 0, info: 2, lastAudited: "2026-02-16" },
];

export default function SeoHealth() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">SEO Health</h1>
        <Button data-testid="button-run-audit">
          <RefreshCw className="w-4 h-4 mr-2" />
          Run Audit
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold" data-testid="text-overall-score">78</div>
              <div className="text-muted-foreground">/100</div>
            </div>
            <Badge variant="secondary" data-testid="badge-grade" className="text-lg px-3 py-1">B</Badge>
            <p className="text-sm text-muted-foreground">Overall SEO health score based on the latest audit</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            Critical ({criticalIssues.length})
          </h3>
          {criticalIssues.map((issue) => (
            <div key={issue.id} className="pl-4 border-l-4 border-l-red-500 py-2" data-testid={`issue-critical-${issue.id}`}>
              <p className="font-medium text-sm">{issue.title}</p>
              <p className="text-xs text-muted-foreground">{issue.description}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            Warning ({warningIssues.length})
          </h3>
          {warningIssues.map((issue) => (
            <div key={issue.id} className="pl-4 border-l-4 border-l-yellow-500 py-2" data-testid={`issue-warning-${issue.id}`}>
              <p className="font-medium text-sm">{issue.title}</p>
              <p className="text-xs text-muted-foreground">{issue.description}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" />
            Info ({infoIssues.length})
          </h3>
          {infoIssues.map((issue) => (
            <div key={issue.id} className="pl-4 border-l-4 border-l-blue-500 py-2" data-testid={`issue-info-${issue.id}`}>
              <p className="font-medium text-sm">{issue.title}</p>
              <p className="text-xs text-muted-foreground">{issue.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Page Audit Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Critical</TableHead>
                <TableHead>Warnings</TableHead>
                <TableHead>Info</TableHead>
                <TableHead>Last Audited</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageAudits.map((p) => (
                <TableRow key={p.id} data-testid={`row-audit-${p.id}`}>
                  <TableCell className="font-medium">{p.page}</TableCell>
                  <TableCell data-testid={`text-page-score-${p.id}`}>{p.score}/100</TableCell>
                  <TableCell>{p.critical > 0 ? <span className="text-red-500 font-medium">{p.critical}</span> : "0"}</TableCell>
                  <TableCell>{p.warnings > 0 ? <span className="text-yellow-600 font-medium">{p.warnings}</span> : "0"}</TableCell>
                  <TableCell>{p.info > 0 ? <span className="text-blue-500 font-medium">{p.info}</span> : "0"}</TableCell>
                  <TableCell className="text-muted-foreground">{p.lastAudited}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      <Button variant="ghost" size="icon" data-testid={`button-view-audit-${p.id}`}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-reaudit-${p.id}`}>
                        <RefreshCw className="w-4 h-4" />
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
