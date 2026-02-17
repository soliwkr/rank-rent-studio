import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  Search,
  Globe,
  BarChart3,
  CalendarCheck,
  MessageSquare,
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
import type { BlogPost, RankKeyword, Reservation, ContactMessage } from "@shared/schema";

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

export default function DashboardOverview() {
  const { selectedVenue, venues } = useVenue();

  const { data: allPosts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: [`/api/blog-posts?venueId=${selectedVenue?.id}`],
    enabled: !!selectedVenue,
  });

  const { data: allKeywords, isLoading: keywordsLoading } = useQuery<RankKeyword[]>({
    queryKey: [`/api/rank-keywords?venueId=${selectedVenue?.id}`],
    enabled: !!selectedVenue,
  });

  const { data: allReservations, isLoading: reservationsLoading } = useQuery<Reservation[]>({
    queryKey: [`/api/reservations?venueId=${selectedVenue?.id}`],
    enabled: !!selectedVenue,
  });

  const { data: allMessages, isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact-messages"],
  });

  const loading = postsLoading || keywordsLoading || reservationsLoading || messagesLoading;

  const posts = allPosts || [];
  const keywords = allKeywords || [];
  const reservationsList = allReservations || [];
  const messages = allMessages || [];

  const totalPosts = posts.length;
  const totalKeywords = keywords.length;
  const totalReservations = reservationsList.length;
  const totalMessages = messages.length;
  const activeVenues = venues.filter((v) => v.status === "active").length;

  const publishedPosts = posts.filter((p) => p.status === "published");
  const draftPosts = posts.filter((p) => p.status === "draft");

  const statusChartData = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    posts.forEach((p) => {
      const s = p.status || "draft";
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });
    return Object.entries(statusCounts).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
    }));
  }, [posts]);

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your SEO operations
          {selectedVenue && (
            <span className="ml-1">
              for <span className="font-medium text-foreground">{selectedVenue.name}</span>
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Active Venues"
          value={activeVenues}
          subtitle={`${venues.length} total`}
          icon={Globe}
          loading={loading}
        />
        <MetricCard
          title="Blog Posts"
          value={totalPosts}
          subtitle={`${publishedPosts.length} published, ${draftPosts.length} drafts`}
          icon={FileText}
          loading={loading}
        />
        <MetricCard
          title="Keywords Tracked"
          value={totalKeywords}
          icon={Search}
          loading={loading}
        />
        <MetricCard
          title="Reservations"
          value={totalReservations}
          subtitle={`${reservationsList.filter((r) => r.status === "confirmed").length} confirmed`}
          icon={CalendarCheck}
          loading={loading}
        />
        <MetricCard
          title="Contact Messages"
          value={totalMessages}
          icon={MessageSquare}
          loading={loading}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="font-semibold">Posts by Status</h3>
            <Badge variant="secondary">{totalPosts} total</Badge>
          </div>
          <div className="h-64">
            {statusChartData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                No posts yet for this venue.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="status" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} allowDecimals={false} />
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
                    radius={[4, 4, 0, 0]}
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
            <p className="text-sm text-muted-foreground py-4">No posts yet for this venue.</p>
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
