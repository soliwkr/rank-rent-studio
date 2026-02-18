import { useWorkspace } from "@/lib/workspace-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, MapPin, RefreshCw } from "lucide-react";

const gridData: (number | null)[][] = [
  [2, 1, 3, 5, 8],
  [3, 1, 2, 7, 12],
  [5, 2, 1, 4, 15],
  [8, 4, 3, 6, null],
  [14, 9, 7, 11, 18],
];

function getCellStyle(rank: number | null) {
  if (rank === null) return "bg-muted text-muted-foreground";
  if (rank <= 3) return "bg-green-500/20 text-green-700 dark:text-green-400";
  if (rank <= 10) return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
  return "bg-red-500/20 text-red-700 dark:text-red-400";
}

export default function DashboardLocalSearchGrid() {
  const { selectedWorkspace } = useWorkspace();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold" data-testid="text-page-title">Local Search Grid</h1>
          <Badge variant="secondary" data-testid="badge-credits-remaining">10 credits remaining</Badge>
        </div>
        <Button variant="outline" data-testid="button-buy-credits">
          <CreditCard className="w-4 h-4 mr-2" />
          Buy Credits
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2" data-testid="text-business-name">
              <MapPin className="w-5 h-5" />
              Acme SEO Agency
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <span data-testid="text-location">New York, NY</span>
              <span data-testid="text-keyword">Keyword: <span className="font-medium text-foreground">seo agency</span></span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-green-500/20 border border-green-500/30" />
              <span>Rank 1-3</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-yellow-500/20 border border-yellow-500/30" />
              <span>Rank 4-10</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-red-500/20 border border-red-500/30" />
              <span>Rank 11+</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-muted border" />
              <span>Not found</span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 max-w-md" data-testid="grid-visualization">
            {gridData.flat().map((rank, idx) => (
              <div
                key={idx}
                className={`aspect-square rounded-md flex items-center justify-center font-semibold text-sm ${getCellStyle(rank)}`}
                data-testid={`grid-cell-${idx}`}
              >
                {rank !== null ? rank : "-"}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Select defaultValue="latest">
              <SelectTrigger className="w-[200px]" data-testid="select-scan-history">
                <SelectValue placeholder="Scan history" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Feb 17, 2026 (Latest)</SelectItem>
                <SelectItem value="feb10">Feb 10, 2026</SelectItem>
                <SelectItem value="feb03">Feb 3, 2026</SelectItem>
                <SelectItem value="jan27">Jan 27, 2026</SelectItem>
              </SelectContent>
            </Select>
            <Button data-testid="button-run-new-scan">
              <RefreshCw className="w-4 h-4 mr-2" />
              Run New Scan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
