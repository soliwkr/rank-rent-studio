import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  MessageSquare,
  Globe,
  BarChart3,
  CalendarCheck,
  Image,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useVenue } from "@/lib/venue-context";
import type { Venue, BlogPost, ContactMessage, ContentAsset } from "@shared/schema";

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  loading,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: typeof FileText;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <Card className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1" data-testid={`text-metric-${title.replace(/\s+/g, '-').toLowerCase()}`}>{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    </Card>
  );
}

export default function AdminOverview() {
  const { venues } = useVenue();

  const { data: allVenues = [], isLoading: venuesLoading } = useQuery<Venue[]>({
    queryKey: ["/api/venues"],
  });

  const { data: allPosts = [], isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const { data: allMessages = [], isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact-messages"],
  });

  const { data: allAssets = [], isLoading: assetsLoading } = useQuery<ContentAsset[]>({
    queryKey: ["/api/content-assets"],
  });

  const loading = venuesLoading || postsLoading || messagesLoading || assetsLoading;

  const totalVenues = allVenues.length;
  const activeVenues = allVenues.filter((v) => v.status === "active").length;
  const totalPosts = allPosts.length;
  const totalMessages = allMessages.length;
  const totalAssets = allAssets.length;

  const publishedPosts = allPosts.filter((p) => p.status === "published");
  const draftPosts = allPosts.filter((p) => p.status === "draft");

  const venuePostChart = useMemo(() => {
    const counts: Record<string, number> = {};
    allPosts.forEach((p) => {
      const venue = allVenues.find((v) => v.id === p.venueId);
      const name = venue?.name || p.venueId?.slice(0, 12) || "Unknown";
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([venue, count]) => ({ venue, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [allPosts, allVenues]);

  const recentPosts = allPosts.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Aggregate overview across all venues
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Venues"
          value={totalVenues}
          subtitle={`${activeVenues} active`}
          icon={Globe}
          loading={loading}
        />
        <MetricCard
          title="Total Posts"
          value={totalPosts}
          subtitle={`${publishedPosts.length} published, ${draftPosts.length} drafts`}
          icon={FileText}
          loading={loading}
        />
        <MetricCard
          title="Total Messages"
          value={totalMessages}
          icon={MessageSquare}
          loading={loading}
        />
        <MetricCard
          title="Content Assets"
          value={totalAssets}
          icon={Image}
          loading={loading}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="font-semibold">Posts by Venue</h3>
            <Badge variant="secondary">{allPosts.length} total</Badge>
          </div>
          <div className="h-64">
            {venuePostChart.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                No posts across any venue yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={venuePostChart} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} allowDecimals={false} />
                  <YAxis type="category" dataKey="venue" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(197, 90%, 50%)"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="font-semibold">Recent Posts</h3>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : recentPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No posts yet.</p>
          ) : (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between gap-4 py-2 border-b last:border-0">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" data-testid={`text-post-${post.id}`}>{post.title}</p>
                    <p className="text-xs text-muted-foreground">{post.primaryKeyword}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">
                    {post.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
