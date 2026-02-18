import { useWorkspace } from "@/lib/workspace-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, FileText, CheckCircle, Type, Image, Search, Target, TrendingUp, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const categoryData = [
  { name: "SEO", posts: 34 },
  { name: "Technical", posts: 22 },
  { name: "Content", posts: 28 },
  { name: "Link Building", posts: 18 },
  { name: "Local SEO", posts: 15 },
  { name: "Analytics", posts: 10 },
];

const monthlyData = [
  { name: "Sep", posts: 8 },
  { name: "Oct", posts: 12 },
  { name: "Nov", posts: 15 },
  { name: "Dec", posts: 10 },
  { name: "Jan", posts: 18 },
  { name: "Feb", posts: 14 },
];

interface StatCardProps {
  icon: typeof FileText;
  label: string;
  value: string;
  testId: string;
}

function StatCard({ icon: Icon, label, value, testId }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold" data-testid={testId}>{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SeoReports() {
  const { selectedWorkspace } = useWorkspace();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Reports</h1>
        <Button variant="outline" data-testid="button-save-report">
          <Save className="w-4 h-4 mr-2" />
          Save Report
        </Button>
      </div>

      <Tabs defaultValue="content" data-testid="tabs-reports">
        <TabsList>
          <TabsTrigger value="content" data-testid="tab-content">Content</TabsTrigger>
          <TabsTrigger value="seo" data-testid="tab-seo">SEO</TabsTrigger>
          <TabsTrigger value="revenue" data-testid="tab-revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={FileText} label="Total Posts" value="127" testId="text-stat-total-posts" />
            <StatCard icon={CheckCircle} label="Published" value="89" testId="text-stat-published" />
            <StatCard icon={Type} label="Avg Word Count" value="2,150" testId="text-stat-avg-words" />
            <StatCard icon={Image} label="Image Coverage" value="87%" testId="text-stat-image-coverage" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Posts by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]" data-testid="chart-posts-by-category">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs" tick={{ fontSize: 12 }} />
                      <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="posts" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Posts by Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]" data-testid="chart-posts-by-month">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs" tick={{ fontSize: 12 }} />
                      <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="posts" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6 mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Search} label="Pages Audited" value="45" testId="text-stat-pages-audited" />
            <StatCard icon={Target} label="Avg SEO Score" value="78" testId="text-stat-avg-seo-score" />
            <StatCard icon={TrendingUp} label="Keywords Tracked" value="45" testId="text-stat-keywords-tracked" />
            <StatCard icon={TrendingUp} label="Avg Position" value="8.3" testId="text-stat-avg-position" />
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6 mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={DollarSign} label="Total Invoiced" value="$87,800" testId="text-stat-total-invoiced" />
            <StatCard icon={CheckCircle} label="Paid" value="$67,800" testId="text-stat-paid" />
            <StatCard icon={Clock} label="Outstanding" value="$16,800" testId="text-stat-outstanding" />
            <StatCard icon={AlertTriangle} label="Overdue" value="$3,200" testId="text-stat-overdue" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
