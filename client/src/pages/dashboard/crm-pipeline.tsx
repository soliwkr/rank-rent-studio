import { useState } from "react";
import { useWorkspace } from "@/lib/workspace-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List } from "lucide-react";

interface Deal {
  id: number;
  name: string;
  value: number;
  closeDate: string;
}

const pipelineData: { key: string; label: string; color: string; borderColor: string; deals: Deal[] }[] = [
  {
    key: "leads",
    label: "Leads",
    color: "text-blue-700 dark:text-blue-400",
    borderColor: "border-t-blue-500",
    deals: [
      { id: 1, name: "James Carter", value: 4500, closeDate: "2026-03-15" },
      { id: 2, name: "Olivia Martinez", value: 3200, closeDate: "2026-03-20" },
      { id: 3, name: "Noah Williams", value: 6800, closeDate: "2026-04-01" },
    ],
  },
  {
    key: "demo",
    label: "Demo",
    color: "text-purple-700 dark:text-purple-400",
    borderColor: "border-t-purple-500",
    deals: [
      { id: 4, name: "Emma Thompson", value: 12000, closeDate: "2026-03-10" },
      { id: 5, name: "Liam Anderson", value: 8500, closeDate: "2026-03-25" },
    ],
  },
  {
    key: "proposal",
    label: "Proposal",
    color: "text-orange-700 dark:text-orange-400",
    borderColor: "border-t-orange-500",
    deals: [
      { id: 6, name: "Sophia Davis", value: 15000, closeDate: "2026-02-28" },
      { id: 7, name: "Mason Garcia", value: 9200, closeDate: "2026-03-05" },
    ],
  },
  {
    key: "closed",
    label: "Closed Won",
    color: "text-green-700 dark:text-green-400",
    borderColor: "border-t-green-500",
    deals: [
      { id: 8, name: "Ava Robinson", value: 22000, closeDate: "2026-02-12" },
    ],
  },
];

export default function CrmPipeline() {
  const { selectedWorkspace } = useWorkspace();
  const [view, setView] = useState<"board" | "list">("board");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Sales Pipeline</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center border rounded-md">
            <Button
              variant={view === "board" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("board")}
              data-testid="button-board-view"
              className="rounded-r-none"
            >
              <LayoutGrid className="w-4 h-4 mr-1" />
              Board
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
              data-testid="button-list-view"
              className="rounded-l-none"
            >
              <List className="w-4 h-4 mr-1" />
              List
            </Button>
          </div>
          <Button data-testid="button-add-deal">
            <Plus className="w-4 h-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto" data-testid="pipeline-board">
        <div className="flex gap-4 min-w-[900px]">
          {pipelineData.map((col) => {
            const totalValue = col.deals.reduce((s, d) => s + d.value, 0);
            return (
              <div key={col.key} className="flex-1 min-w-[220px]" data-testid={`column-${col.key}`}>
                <Card className={`border-t-4 ${col.borderColor}`}>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`font-semibold ${col.color}`} data-testid={`text-column-title-${col.key}`}>
                        {col.label}
                      </h3>
                      <span className="text-xs text-muted-foreground" data-testid={`text-column-count-${col.key}`}>
                        {col.deals.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {col.deals.map((deal) => (
                        <Card key={deal.id} className="hover-elevate cursor-pointer" data-testid={`card-deal-${deal.id}`}>
                          <CardContent className="p-3 space-y-1">
                            <p className="font-medium text-sm" data-testid={`text-deal-name-${deal.id}`}>{deal.name}</p>
                            <p className="text-sm font-semibold" data-testid={`text-deal-value-${deal.id}`}>
                              ${deal.value.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground" data-testid={`text-deal-date-${deal.id}`}>
                              Close: {deal.closeDate}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="pt-2 border-t text-xs text-muted-foreground flex items-center justify-between gap-2">
                      <span>{col.deals.length} deal{col.deals.length !== 1 ? "s" : ""}</span>
                      <span className="font-medium" data-testid={`text-column-total-${col.key}`}>
                        ${totalValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
