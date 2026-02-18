import {
  Building2,
  Layers,
  DollarSign,
  Users,
  Activity,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AdminLayout } from "@/components/admin-layout";

const COLORS = {
  primary: "hsl(221, 83%, 53%)",
  green: "hsl(160, 60%, 45%)",
  orange: "hsl(35, 85%, 55%)",
  purple: "hsl(280, 60%, 55%)",
};

const mrrData = [
  { month: "Jan", mrr: 8200 },
  { month: "Feb", mrr: 8900 },
  { month: "Mar", mrr: 9400 },
  { month: "Apr", mrr: 10100 },
  { month: "May", mrr: 10800 },
  { month: "Jun", mrr: 11200 },
  { month: "Jul", mrr: 11900 },
  { month: "Aug", mrr: 12400 },
  { month: "Sep", mrr: 13000 },
  { month: "Oct", mrr: 13500 },
  { month: "Nov", mrr: 14100 },
  { month: "Dec", mrr: 14750 },
];

const newAgenciesData = [
  { month: "Jan", agencies: 3 },
  { month: "Feb", agencies: 5 },
  { month: "Mar", agencies: 4 },
  { month: "Apr", agencies: 6 },
  { month: "May", agencies: 5 },
  { month: "Jun", agencies: 7 },
  { month: "Jul", agencies: 4 },
  { month: "Aug", agencies: 6 },
  { month: "Sep", agencies: 5 },
  { month: "Oct", agencies: 3 },
  { month: "Nov", agencies: 4 },
  { month: "Dec", agencies: 5 },
];

const planDistribution = [
  { name: "Solo", value: 22 },
  { name: "Pro", value: 15 },
  { name: "White Label", value: 7 },
  { name: "Enterprise", value: 3 },
];

const planColors = [COLORS.primary, COLORS.green, COLORS.orange, COLORS.purple];

const recentActivity = [
  { description: "New agency registered: Acme Digital", time: "2 minutes ago", icon: Building2 },
  { description: "Content published: SEO Guide 2026", time: "15 minutes ago", icon: Layers },
  { description: "Plan upgraded: Solo to Pro", time: "1 hour ago", icon: ArrowUpRight },
  { description: "New workspace created: Coastal Media", time: "3 hours ago", icon: Layers },
  { description: "New agency registered: Summit Marketing", time: "5 hours ago", icon: Building2 },
];

const recentAgencies = [
  { name: "Acme Digital", plan: "Pro", owner: "John Smith", workspaces: 4, created: "Feb 15, 2026", status: "Active" },
  { name: "Dragon Media", plan: "Enterprise", owner: "Sarah Chen", workspaces: 12, created: "Feb 12, 2026", status: "Active" },
  { name: "Coastal SEO", plan: "White Label", owner: "Mike Johnson", workspaces: 8, created: "Feb 10, 2026", status: "Active" },
  { name: "Summit Marketing", plan: "Solo", owner: "Lisa Park", workspaces: 1, created: "Feb 8, 2026", status: "Pending" },
  { name: "Riverside Agency", plan: "Pro", owner: "Tom Davis", workspaces: 3, created: "Feb 5, 2026", status: "Active" },
];

function getPlanVariant(plan: string) {
  switch (plan) {
    case "Enterprise": return "default";
    case "Pro": return "secondary";
    case "White Label": return "outline";
    default: return "secondary";
  }
}

function formatMrr(value: number) {
  return `$${(value / 1000).toFixed(1)}K`;
}

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold" data-testid="text-page-title">Platform Overview</h1>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
          <Card data-testid="card-total-agencies">
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Agencies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-agencies">47</div>
              <p className="text-xs flex items-center gap-1" style={{ color: COLORS.green }}>
                <ArrowUpRight className="h-3 w-3" />
                +12%
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-total-workspaces">
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Workspaces</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-workspaces">183</div>
              <p className="text-xs flex items-center gap-1" style={{ color: COLORS.green }}>
                <ArrowUpRight className="h-3 w-3" />
                +8%
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-mrr">
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">MRR</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-mrr">$14,750</div>
              <p className="text-xs flex items-center gap-1" style={{ color: COLORS.green }}>
                <ArrowUpRight className="h-3 w-3" />
                +15.3%
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-active-users">
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-active-users">312</div>
              <p className="text-xs flex items-center gap-1" style={{ color: COLORS.green }}>
                <ArrowUpRight className="h-3 w-3" />
                +5%
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-system-health">
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">System Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS.green }}
                  data-testid="indicator-system-health"
                />
                <span className="text-2xl font-bold" data-testid="text-system-health">Healthy</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <Card data-testid="card-mrr-growth">
            <CardHeader>
              <CardTitle>MRR Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mrrData}>
                    <defs>
                      <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis className="text-xs" tickFormatter={formatMrr} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "MRR"]}
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Area type="monotone" dataKey="mrr" stroke={COLORS.primary} fill="url(#mrrGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-new-agencies-chart">
            <CardHeader>
              <CardTitle>New Agencies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={newAgenciesData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Bar dataKey="agencies" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <Card data-testid="card-recent-activity">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex items-start gap-3" data-testid={`activity-item-${index}`}>
                    <div className="mt-0.5 rounded-md p-1.5 bg-muted">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.description}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-plan-distribution">
            <CardHeader>
              <CardTitle>Plan Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {planDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={planColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card data-testid="card-recent-agencies-table">
          <CardHeader>
            <CardTitle>Recent Agencies</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agency Name</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Workspaces</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentAgencies.map((agency, index) => (
                  <TableRow key={agency.name} data-testid={`row-agency-${index}`}>
                    <TableCell className="font-medium" data-testid={`text-agency-name-${index}`}>{agency.name}</TableCell>
                    <TableCell>
                      <Badge variant={getPlanVariant(agency.plan)} data-testid={`badge-plan-${index}`}>
                        {agency.plan}
                      </Badge>
                    </TableCell>
                    <TableCell data-testid={`text-agency-owner-${index}`}>{agency.owner}</TableCell>
                    <TableCell data-testid={`text-agency-workspaces-${index}`}>{agency.workspaces}</TableCell>
                    <TableCell data-testid={`text-agency-created-${index}`}>{agency.created}</TableCell>
                    <TableCell>
                      <Badge
                        variant={agency.status === "Active" ? "default" : "secondary"}
                        data-testid={`badge-status-${index}`}
                      >
                        {agency.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
