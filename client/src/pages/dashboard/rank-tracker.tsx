import { useWorkspace } from "@/lib/workspace-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Plus, RefreshCw, ArrowUpRight, ArrowDownRight, MoreHorizontal, History, Trash2, CreditCard } from "lucide-react";

const sampleKeywords = [
  { id: 1, keyword: "best seo agency near me", position: 3, change: 2, url: "/services/seo", volume: 2400, lastChecked: "2026-02-17" },
  { id: 2, keyword: "local seo services", position: 7, change: -1, url: "/services/local-seo", volume: 1800, lastChecked: "2026-02-17" },
  { id: 3, keyword: "content marketing agency", position: 12, change: 5, url: "/services/content", volume: 3200, lastChecked: "2026-02-16" },
  { id: 4, keyword: "technical seo audit", position: 1, change: 0, url: "/services/technical-seo", volume: 1400, lastChecked: "2026-02-17" },
  { id: 5, keyword: "link building services", position: 22, change: -3, url: "/services/link-building", volume: 2100, lastChecked: "2026-02-16" },
  { id: 6, keyword: "google business profile optimization", position: 5, change: 4, url: "/services/gbp", volume: 890, lastChecked: "2026-02-17" },
  { id: 7, keyword: "seo consultant new york", position: 9, change: 1, url: "/about", volume: 720, lastChecked: "2026-02-15" },
  { id: 8, keyword: "website ranking improvement", position: 45, change: -8, url: "/blog/ranking-tips", volume: 1600, lastChecked: "2026-02-17" },
];

export default function RankTracker() {
  const { selectedWorkspace } = useWorkspace();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold" data-testid="text-page-title">Track Keywords</h1>
          <Badge variant="secondary" data-testid="badge-credits-remaining">15 credits remaining</Badge>
        </div>
        <Button variant="outline" data-testid="button-buy-credits">
          <CreditCard className="w-4 h-4 mr-2" />
          Buy Credits
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button data-testid="button-add-keywords">
          <Plus className="w-4 h-4 mr-2" />
          Add Keywords
        </Button>
        <Button variant="outline" data-testid="button-refresh-all">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh All
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead className="text-right">Position</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right">Search Volume</TableHead>
                <TableHead>Last Checked</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleKeywords.map((kw) => (
                <TableRow key={kw.id} data-testid={`row-keyword-${kw.id}`}>
                  <TableCell className="font-medium" data-testid={`text-keyword-${kw.id}`}>
                    {kw.keyword}
                  </TableCell>
                  <TableCell className="text-right font-semibold" data-testid={`text-position-${kw.id}`}>
                    {kw.position}
                  </TableCell>
                  <TableCell data-testid={`text-change-${kw.id}`}>
                    {kw.change > 0 ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <ArrowUpRight className="w-4 h-4" />
                        {kw.change}
                      </span>
                    ) : kw.change < 0 ? (
                      <span className="flex items-center gap-1 text-red-600">
                        <ArrowDownRight className="w-4 h-4" />
                        {Math.abs(kw.change)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm" data-testid={`text-url-${kw.id}`}>
                    {kw.url}
                  </TableCell>
                  <TableCell className="text-right" data-testid={`text-volume-${kw.id}`}>
                    {kw.volume.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm" data-testid={`text-last-checked-${kw.id}`}>
                    {kw.lastChecked}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-keyword-actions-${kw.id}`}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem data-testid={`action-view-history-${kw.id}`}>
                          <History className="w-4 h-4 mr-2" />
                          View History
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" data-testid={`action-remove-${kw.id}`}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
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
