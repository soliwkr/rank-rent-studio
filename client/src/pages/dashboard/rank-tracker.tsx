import { useState } from "react";
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
import { Plus, RefreshCw, ArrowUpRight, ArrowDownRight, MoreHorizontal, History, Trash2, CreditCard, Search } from "lucide-react";

const initialKeywords = [
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
  const { toast } = useToast();

  const [keywords, setKeywords] = useState(initialKeywords);
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [buyCreditsDialogOpen, setBuyCreditsDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<typeof initialKeywords[0] | null>(null);

  const [newKeyword, setNewKeyword] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [creditAmount, setCreditAmount] = useState("10");

  const filteredKeywords = keywords.filter((kw) =>
    kw.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kw.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return;
    const newId = Math.max(...keywords.map((k) => k.id), 0) + 1;
    setKeywords([
      ...keywords,
      {
        id: newId,
        keyword: newKeyword.trim(),
        position: Math.floor(Math.random() * 50) + 1,
        change: 0,
        url: newUrl.trim() || "/",
        volume: Math.floor(Math.random() * 3000) + 100,
        lastChecked: "2026-02-18",
      },
    ]);
    setNewKeyword("");
    setNewUrl("");
    setAddDialogOpen(false);
    toast({ title: "Keyword added", description: `"${newKeyword.trim()}" has been added to tracking.` });
  };

  const handleRemoveKeyword = () => {
    if (!selectedKeyword) return;
    setKeywords(keywords.filter((k) => k.id !== selectedKeyword.id));
    setDeleteDialogOpen(false);
    toast({ title: "Keyword removed", description: `"${selectedKeyword.keyword}" has been removed.` });
    setSelectedKeyword(null);
  };

  const handleRefreshAll = () => {
    toast({ title: "Refreshing rankings", description: "All keyword positions are being updated..." });
  };

  const handleBuyCredits = () => {
    setBuyCreditsDialogOpen(false);
    toast({ title: "Credits purchased", description: `${creditAmount} credits have been added to your account.` });
    setCreditAmount("10");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold" data-testid="text-page-title">Track Keywords</h1>
          <Badge variant="secondary" data-testid="badge-credits-remaining">15 credits remaining</Badge>
        </div>
        <Button variant="outline" data-testid="button-buy-credits" onClick={() => setBuyCreditsDialogOpen(true)}>
          <CreditCard className="w-4 h-4 mr-2" />
          Buy Credits
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button data-testid="button-add-keywords" onClick={() => setAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Keywords
        </Button>
        <Button variant="outline" data-testid="button-refresh-all" onClick={handleRefreshAll}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh All
        </Button>
        <div className="relative ml-auto">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-[220px]"
            data-testid="input-search-keywords"
          />
        </div>
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
              {filteredKeywords.map((kw) => (
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
                        <DropdownMenuItem
                          data-testid={`action-view-history-${kw.id}`}
                          onClick={() => {
                            setSelectedKeyword(kw);
                            setHistoryDialogOpen(true);
                          }}
                        >
                          <History className="w-4 h-4 mr-2" />
                          View History
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          data-testid={`action-remove-${kw.id}`}
                          onClick={() => {
                            setSelectedKeyword(kw);
                            setDeleteDialogOpen(true);
                          }}
                        >
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

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Keywords</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="new-keyword">Keyword</Label>
              <Input
                id="new-keyword"
                placeholder="Enter keyword to track"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                data-testid="input-new-keyword"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-url">Target URL</Label>
              <Input
                id="new-url"
                placeholder="/page-url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                data-testid="input-new-url"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)} data-testid="button-cancel-add">Cancel</Button>
            <Button onClick={handleAddKeyword} data-testid="button-confirm-add">Add Keyword</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={buyCreditsDialogOpen} onOpenChange={setBuyCreditsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy Credits</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="credit-amount">Number of Credits</Label>
              <Input
                id="credit-amount"
                type="number"
                min="1"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                data-testid="input-credit-amount"
              />
            </div>
            <p className="text-sm text-muted-foreground">Each credit allows one keyword position check.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBuyCreditsDialogOpen(false)} data-testid="button-cancel-buy">Cancel</Button>
            <Button onClick={handleBuyCredits} data-testid="button-confirm-buy">Purchase</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ranking History: {selectedKeyword?.keyword}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {[
              { date: "2026-02-17", position: selectedKeyword?.position ?? 0 },
              { date: "2026-02-14", position: (selectedKeyword?.position ?? 0) + 2 },
              { date: "2026-02-10", position: (selectedKeyword?.position ?? 0) + 5 },
              { date: "2026-02-07", position: (selectedKeyword?.position ?? 0) + 1 },
              { date: "2026-02-03", position: (selectedKeyword?.position ?? 0) + 8 },
            ].map((entry) => (
              <div key={entry.date} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{entry.date}</span>
                <span className="font-semibold">Position {entry.position}</span>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setHistoryDialogOpen(false)} data-testid="button-close-history">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Keyword</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-2">
            Are you sure you want to remove "{selectedKeyword?.keyword}" from tracking? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} data-testid="button-cancel-delete">Cancel</Button>
            <Button variant="destructive" onClick={handleRemoveKeyword} data-testid="button-confirm-delete">Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
