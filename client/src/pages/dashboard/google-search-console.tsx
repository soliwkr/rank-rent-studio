import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MousePointerClick, Eye, TrendingUp, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const chartData = [
  { date: "Feb 1", clicks: 380, impressions: 7800 },
  { date: "Feb 3", clicks: 420, impressions: 8200 },
  { date: "Feb 5", clicks: 390, impressions: 7500 },
  { date: "Feb 7", clicks: 450, impressions: 8900 },
  { date: "Feb 9", clicks: 480, impressions: 9200 },
  { date: "Feb 11", clicks: 440, impressions: 8600 },
  { date: "Feb 13", clicks: 510, impressions: 9800 },
  { date: "Feb 15", clicks: 490, impressions: 9400 },
  { date: "Feb 17", clicks: 530, impressions: 10200 },
  { date: "Feb 18", clicks: 520, impressions: 9900 },
];

const topQueries = [
  { id: 1, query: "content management platform", clicks: 2840, impressions: 52000, ctr: "5.5%", position: 6.2, change: 1.3 },
  { id: 2, query: "seo tools for agencies", clicks: 2210, impressions: 48000, ctr: "4.6%", position: 7.8, change: -0.5 },
  { id: 3, query: "rank tracking software", clicks: 1890, impressions: 41000, ctr: "4.6%", position: 9.1, change: 2.1 },
  { id: 4, query: "white label seo platform", clicks: 1560, impressions: 32000, ctr: "4.9%", position: 8.5, change: 0.7 },
  { id: 5, query: "ai content generator", clicks: 1340, impressions: 28000, ctr: "4.8%", position: 10.2, change: -1.2 },
];

const dateRanges = ["7d", "28d", "3mo", "6mo", "12mo"];

export default function GoogleSearchConsole() {
  const [connected] = useState(true);
  const [dateRange, setDateRange] = useState("28d");

  if (!connected) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Google Search Console</h1>
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <p className="text-muted-foreground">Connect your Google Search Console account to view search performance data, top queries, and indexing status.</p>
            <Button data-testid="button-connect-gsc">Connect GSC</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">Google Search Console</h1>

      <div className="flex items-center gap-2 flex-wrap">
        {dateRanges.map((r) => (
          <Button
            key={r}
            variant={dateRange === r ? "default" : "outline"}
            size="sm"
            onClick={() => setDateRange(r)}
            data-testid={`button-range-${r}`}
          >
            {r}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MousePointerClick className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold" data-testid="text-total-clicks">12,450</p>
                <p className="text-xs text-muted-foreground">Total Clicks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold" data-testid="text-impressions">245,000</p>
                <p className="text-xs text-muted-foreground">Impressions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold" data-testid="text-avg-ctr">5.1%</p>
                <p className="text-xs text-muted-foreground">Avg CTR</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ArrowUpDown className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold" data-testid="text-avg-position">8.3</p>
                <p className="text-xs text-muted-foreground">Avg Position</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]" data-testid="chart-performance">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="hsl(var(--primary))" strokeWidth={2} name="Clicks" />
                <Line yAxisId="right" type="monotone" dataKey="impressions" stroke="hsl(var(--muted-foreground))" strokeWidth={2} name="Impressions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Query</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Impressions</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topQueries.map((q) => (
                <TableRow key={q.id} data-testid={`row-query-${q.id}`}>
                  <TableCell className="font-medium" data-testid={`text-query-${q.id}`}>{q.query}</TableCell>
                  <TableCell>{q.clicks.toLocaleString()}</TableCell>
                  <TableCell>{q.impressions.toLocaleString()}</TableCell>
                  <TableCell>{q.ctr}</TableCell>
                  <TableCell>{q.position}</TableCell>
                  <TableCell>
                    <span className={`flex items-center gap-1 text-sm ${q.change > 0 ? "text-green-600" : "text-red-500"}`}>
                      {q.change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {Math.abs(q.change)}
                    </span>
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
