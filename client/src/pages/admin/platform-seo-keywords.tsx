import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Building2, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Total Keywords Tracked", value: "1,234", icon: Search },
  { label: "Active Agencies Using SEO", value: "38", icon: Building2 },
  { label: "Keywords Added This Month", value: "156", icon: TrendingUp },
];

const chartData = [
  { agency: "Blue Digital", keywords: 89 },
  { agency: "Northstar", keywords: 76 },
  { agency: "Cascade", keywords: 68 },
  { agency: "Vertex", keywords: 62 },
  { agency: "Lunar Labs", keywords: 55 },
  { agency: "Spark Digital", keywords: 48 },
  { agency: "Summit Co.", keywords: 42 },
  { agency: "Peak Media", keywords: 38 },
  { agency: "Nova Group", keywords: 34 },
  { agency: "Atlas SEO", keywords: 29 },
];

const keywordTable = [
  { agency: "Blue Digital Agency", workspace: "Marketing Hub", keywords: 89, lastRefresh: "2 hours ago", credits: 450 },
  { agency: "Northstar Media", workspace: "SEO Portal", keywords: 76, lastRefresh: "4 hours ago", credits: 320 },
  { agency: "Cascade Creative", workspace: "Content Studio", keywords: 68, lastRefresh: "1 day ago", credits: 280 },
  { agency: "Vertex Solutions", workspace: "Growth Engine", keywords: 62, lastRefresh: "6 hours ago", credits: 200 },
  { agency: "Lunar Labs", workspace: "Rank Tracker", keywords: 55, lastRefresh: "12 hours ago", credits: 150 },
];

export default function AdminPlatformSeoKeywords() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Platform Keyword Usage</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label} data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid={`stat-value-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Keywords Per Agency (Top 10)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80" data-testid="chart-keywords-per-agency">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="agency" className="text-xs fill-muted-foreground" />
                <YAxis className="text-xs fill-muted-foreground" />
                <Tooltip />
                <Bar dataKey="keywords" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keyword Usage by Agency</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agency</TableHead>
                <TableHead>Workspace</TableHead>
                <TableHead>Keywords Tracked</TableHead>
                <TableHead>Last Refresh</TableHead>
                <TableHead>Credits Remaining</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywordTable.map((row) => (
                <TableRow key={row.agency} data-testid={`row-keyword-${row.agency.toLowerCase().replace(/\s+/g, "-")}`}>
                  <TableCell className="font-medium">{row.agency}</TableCell>
                  <TableCell>{row.workspace}</TableCell>
                  <TableCell>{row.keywords}</TableCell>
                  <TableCell className="text-muted-foreground">{row.lastRefresh}</TableCell>
                  <TableCell>{row.credits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}