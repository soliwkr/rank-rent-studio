import { useEffect } from "react";
import { FileText, CheckCircle, TrendingUp, Kanban, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useWorkspace } from "@/lib/workspace-context";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

const contentData = [
  { month: "Jul", posts: 12 },
  { month: "Aug", posts: 18 },
  { month: "Sep", posts: 15 },
  { month: "Oct", posts: 22 },
  { month: "Nov", posts: 19 },
  { month: "Dec", posts: 24 },
];

const statusData = [
  { name: "Draft", value: 23, color: "hsl(215, 16%, 47%)" },
  { name: "Review", value: 15, color: "hsl(35, 85%, 55%)" },
  { name: "Published", value: 89, color: "hsl(160, 60%, 45%)" },
  { name: "Scheduled", value: 12, color: "hsl(221, 83%, 53%)" },
];

const recentPosts = [
  { title: "10 Best SEO Strategies for 2026", status: "Published", date: "Jan 15" },
  { title: "Content Marketing Guide", status: "Draft", date: "Jan 18" },
  { title: "Local SEO Tips", status: "Published", date: "Jan 12" },
  { title: "Link Building Basics", status: "Review", date: "Jan 20" },
  { title: "Schema Markup Tutorial", status: "Scheduled", date: "Jan 25" },
];

const keywords = [
  { keyword: "seo agency", position: 3, change: 2 },
  { keyword: "content marketing", position: 7, change: -1 },
  { keyword: "rank tracker", position: 12, change: 5 },
  { keyword: "local seo", position: 5, change: 3 },
  { keyword: "link building", position: 15, change: -2 },
];

const pipelineStages = [
  { name: "Leads", count: 8, color: "hsl(221, 83%, 53%)" },
  { name: "Demo", count: 5, color: "hsl(280, 60%, 55%)" },
  { name: "Proposal", count: 3, color: "hsl(35, 85%, 55%)" },
  { name: "Closed Won", count: 2, color: "hsl(160, 60%, 45%)" },
];

const stats = [
  { label: "Total Posts", value: "127", icon: FileText },
  { label: "Published", value: "89", icon: CheckCircle },
  { label: "Keywords Tracked", value: "45", icon: TrendingUp },
  { label: "Open Deals", value: "12", icon: Kanban },
  { label: "Revenue", value: "$24,500", icon: DollarSign },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Draft":
      return <Badge variant="secondary" data-testid={`badge-status-draft`}>{status}</Badge>;
    case "Published":
      return <Badge variant="default" className="bg-green-600 text-white" data-testid={`badge-status-published`}>{status}</Badge>;
    case "Review":
      return <Badge variant="outline" data-testid={`badge-status-review`}>{status}</Badge>;
    case "Scheduled":
      return <Badge variant="default" data-testid={`badge-status-scheduled`}>{status}</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function Today() {
  const { selectedWorkspace } = useWorkspace();

  useEffect(() => {
    document.title = "Dashboard - indexFlow";
  }, []);

  const totalPipeline = pipelineStages.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold" data-testid="text-dashboard-title">Dashboard</h1>
        {selectedWorkspace && (
          <span className="text-2xl text-muted-foreground" data-testid="text-workspace-name">
            {selectedWorkspace.name}
          </span>
        )}
        <Badge variant="secondary" data-testid="badge-plan">Pro</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} data-testid={`card-stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold" data-testid={`stat-value-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3" data-testid="card-content-published">
          <CardHeader>
            <CardTitle>Content Published</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={contentData}>
                <defs>
                  <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="posts"
                  stroke="hsl(221, 83%, 53%)"
                  fillOpacity={1}
                  fill="url(#colorPosts)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2" data-testid="card-posts-by-status">
          <CardHeader>
            <CardTitle>Posts by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card data-testid="card-recent-posts">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPosts.map((post, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3"
                  data-testid={`recent-post-${index}`}
                >
                  <span className="text-sm font-medium truncate flex-1">{post.title}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    {getStatusBadge(post.status)}
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-seo-snapshot">
          <CardHeader>
            <CardTitle>SEO Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead className="text-right">Position</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.map((kw, index) => (
                  <TableRow key={index} data-testid={`keyword-row-${index}`}>
                    <TableCell className="font-medium">{kw.keyword}</TableCell>
                    <TableCell className="text-right">{kw.position}</TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex items-center gap-1 ${kw.change > 0 ? "text-green-600" : "text-red-500"}`}>
                        {kw.change > 0 ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {kw.change > 0 ? `+${kw.change}` : kw.change}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card data-testid="card-pipeline-summary">
        <CardHeader>
          <CardTitle>Pipeline Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex h-4 w-full rounded-md overflow-hidden">
              {pipelineStages.map((stage, index) => (
                <div
                  key={index}
                  style={{
                    width: `${(stage.count / totalPipeline) * 100}%`,
                    backgroundColor: stage.color,
                  }}
                  data-testid={`pipeline-bar-${stage.name.toLowerCase().replace(/\s+/g, "-")}`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {pipelineStages.map((stage, index) => (
                <div key={index} className="flex items-center gap-2" data-testid={`pipeline-label-${stage.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className="text-sm text-muted-foreground">{stage.name}</span>
                  <span className="text-sm font-semibold">{stage.count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
