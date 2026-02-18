import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const [scanning, setScanning] = useState(false);
  const [buyCreditsDialogOpen, setBuyCreditsDialogOpen] = useState(false);
  const [cellDetailDialogOpen, setCellDetailDialogOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number; rank: number | null } | null>(null);
  const [creditAmount, setCreditAmount] = useState("10");
  const [selectedScan, setSelectedScan] = useState("latest");

  const handleRunScan = () => {
    setScanning(true);
    toast({ title: "Scan in progress", description: "Running local search grid scan..." });
    setTimeout(() => {
      setScanning(false);
      toast({ title: "Scan complete", description: "Local search grid has been updated with latest results." });
    }, 2000);
  };

  const handleBuyCredits = () => {
    setBuyCreditsDialogOpen(false);
    toast({ title: "Credits purchased", description: `${creditAmount} credits have been added to your account.` });
    setCreditAmount("10");
  };

  const handleCellClick = (row: number, col: number, rank: number | null) => {
    setSelectedCell({ row, col, rank });
    setCellDetailDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold" data-testid="text-page-title">Local Search Grid</h1>
          <Badge variant="secondary" data-testid="badge-credits-remaining">10 credits remaining</Badge>
        </div>
        <Button variant="outline" data-testid="button-buy-credits" onClick={() => setBuyCreditsDialogOpen(true)}>
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
            {gridData.flat().map((rank, idx) => {
              const row = Math.floor(idx / 5);
              const col = idx % 5;
              return (
                <div
                  key={idx}
                  className={`aspect-square rounded-md flex items-center justify-center font-semibold text-sm cursor-pointer transition-opacity hover:opacity-80 ${getCellStyle(rank)}`}
                  data-testid={`grid-cell-${idx}`}
                  onClick={() => handleCellClick(row, col, rank)}
                >
                  {rank !== null ? rank : "-"}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Select value={selectedScan} onValueChange={setSelectedScan}>
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
            <Button data-testid="button-run-new-scan" onClick={handleRunScan} disabled={scanning}>
              <RefreshCw className={`w-4 h-4 mr-2 ${scanning ? "animate-spin" : ""}`} />
              {scanning ? "Scanning..." : "Run New Scan"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={buyCreditsDialogOpen} onOpenChange={setBuyCreditsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy Credits</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="grid-credit-amount">Number of Credits</Label>
              <Input
                id="grid-credit-amount"
                type="number"
                min="1"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                data-testid="input-credit-amount"
              />
            </div>
            <p className="text-sm text-muted-foreground">Each credit allows one grid scan.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBuyCreditsDialogOpen(false)} data-testid="button-cancel-buy">Cancel</Button>
            <Button onClick={handleBuyCredits} data-testid="button-confirm-buy">Purchase</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={cellDetailDialogOpen} onOpenChange={setCellDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Grid Cell Detail</DialogTitle>
          </DialogHeader>
          {selectedCell && (
            <div className="space-y-3 py-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Grid Position</span>
                <span className="font-medium">Row {selectedCell.row + 1}, Col {selectedCell.col + 1}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Ranking</span>
                <span className="font-semibold">{selectedCell.rank !== null ? `#${selectedCell.rank}` : "Not found"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Keyword</span>
                <span className="font-medium">seo agency</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">New York, NY</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCellDetailDialogOpen(false)} data-testid="button-close-cell-detail">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
