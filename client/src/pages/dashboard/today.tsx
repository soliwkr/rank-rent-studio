import { ClientLayout } from "@/components/client-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  ArrowRight,
  BarChart3,
  Settings,
  BookOpen,
  TrendingUp,
  Globe,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  PhoneCall,
  Users,
  Brain,
  Megaphone,
  LifeBuoy,
  Search,
  Activity,
  Receipt,
  MapPin,
} from "lucide-react";
import { Link } from "wouter";
import { useWorkspace } from "@/lib/workspace-context";

type Trend = "up" | "down" | "neutral";

const stats: Array<{
  label: string;
  value: string;
  change: string;
  changeLabel: string;
  trend: Trend;
  icon: typeof FileText;
  color: string;
  module: string;
}> = [
  {
    label: "Content Posts",
    value: "24",
    change: "+3",
    changeLabel: "this week",
    trend: "up",
    icon: FileText,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    module: "Content Engine",
  },
  {
    label: "Active Campaigns",
    value: "4",
    change: "+1",
    changeLabel: "new",
    trend: "up",
    icon: Megaphone,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    module: "Content Engine",
  },
  {
    label: "Keywords Tracked",
    value: "142",
    change: "+12",
    changeLabel: "this month",
    trend: "up",
    icon: TrendingUp,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    module: "Rank Tracker",
  },
  {
    label: "Grid Locations",
    value: "8",
    change: "3",
    changeLabel: "scanned today",
    trend: "neutral",
    icon: MapPin,
    color: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    module: "Local Search Grid",
  },
  {
    label: "CRM Contacts",
    value: "63",
    change: "+5",
    changeLabel: "this week",
    trend: "up",
    icon: Users,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    module: "CRM",
  },
  {
    label: "Pipeline Deals",
    value: "12",
    change: "$34.2k",
    changeLabel: "pipeline value",
    trend: "up",
    icon: Receipt,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    module: "CRM",
  },
  {
    label: "Widget Chats",
    value: "38",
    change: "7",
    changeLabel: "last 7 days",
    trend: "neutral",
    icon: MessageSquare,
    color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    module: "AI Widget",
  },
  {
    label: "AI Calls Handled",
    value: "156",
    change: "+23",
    changeLabel: "this month",
    trend: "up",
    icon: PhoneCall,
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    module: "Twilio",
  },
  {
    label: "Knowledge Items",
    value: "18",
    change: "+2",
    changeLabel: "added",
    trend: "up",
    icon: Brain,
    color: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
    module: "AI Training",
  },
  {
    label: "SEO Score",
    value: "87",
    change: "+4",
    changeLabel: "pts this month",
    trend: "up",
    icon: Search,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    module: "SEO Health",
  },
];

const recentActivity = [
  { action: "Blog post published", detail: "10 Best SEO Strategies for 2026", time: "2h ago", status: "success" as const },
  { action: "Keyword rank improved", detail: "\"seo agency\" moved to #3", time: "5h ago", status: "success" as const },
  { action: "CRM deal updated", detail: "Acme Corp moved to Negotiation stage", time: "8h ago", status: "info" as const },
  { action: "Widget chat completed", detail: "Customer inquiry about pricing", time: "1d ago", status: "info" as const },
  { action: "Campaign draft generated", detail: "Q1 Content Blitz — 12 posts created", time: "1d ago", status: "success" as const },
  { action: "AI call handled", detail: "Inbound call routed to voicemail", time: "2d ago", status: "info" as const },
  { action: "Support ticket resolved", detail: "TKT-1021: Webhook configuration", time: "2d ago", status: "success" as const },
];

const quickLinks = [
  { label: "Content Engine", description: "Create & manage posts", href: "content-engine?tab=posts", icon: FileText, iconColor: "text-blue-500" },
  { label: "Rank Tracker", description: "Track keyword positions", href: "rank-tracker/track-keywords", icon: BarChart3, iconColor: "text-emerald-500" },
  { label: "CRM Pipeline", description: "Manage deals & contacts", href: "crm/pipeline", icon: Users, iconColor: "text-violet-500" },
  { label: "AI Widget", description: "Monitor chat interactions", href: "widget/monitoring", icon: Activity, iconColor: "text-sky-500" },
  { label: "Twilio Voice", description: "Call logs & settings", href: "twilio/call-logs", icon: PhoneCall, iconColor: "text-cyan-500" },
  { label: "Knowledge Base", description: "Train your AI assistant", href: "ai-training/knowledge-base", icon: Brain, iconColor: "text-fuchsia-500" },
  { label: "Analytics", description: "Performance overview", href: "analytics/overview", icon: BarChart3, iconColor: "text-amber-500" },
  { label: "Settings", description: "Setup & configuration", href: "settings/setup-guide", icon: Settings, iconColor: "text-slate-500" },
];

function getStatusIcon(status: string) {
  switch (status) {
    case "success":
      return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
    case "warning":
      return <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />;
    default:
      return <Zap className="w-4 h-4 text-blue-500 shrink-0" />;
  }
}

export default function Today() {
  const { selectedWorkspace } = useWorkspace();
  const workspaceName = selectedWorkspace?.name || "Your Workspace";

  return (
    <ClientLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight" data-testid="text-page-title">
              Dashboard Overview
            </h1>
            <p className="text-sm text-muted-foreground mt-1" data-testid="text-page-subtitle">
              {workspaceName} &mdash; at a glance
            </p>
          </div>
          <Badge variant="outline" className="gap-1.5" data-testid="badge-last-updated">
            <Clock className="w-3 h-3" />
            Updated just now
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} data-testid={`card-stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className={`p-1.5 rounded-md ${stat.color}`}>
                    <stat.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider truncate">
                    {stat.module}
                  </span>
                </div>
                <p className="text-2xl font-bold tracking-tight" data-testid={`text-stat-value-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate" data-testid={`text-stat-label-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  {stat.label}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === "up" && <ArrowUpRight className="w-3 h-3 text-emerald-500" />}
                  {stat.trend === "down" && <ArrowDownRight className="w-3 h-3 text-rose-500" />}
                  <span className={`text-[11px] font-medium ${stat.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : stat.trend === "down" ? "text-rose-600 dark:text-rose-400" : "text-muted-foreground"}`}>
                    {stat.change}
                  </span>
                  <span className="text-[11px] text-muted-foreground truncate">{stat.changeLabel}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2" data-testid="card-recent-activity">
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h2 className="font-semibold" data-testid="text-recent-activity-title">Recent Activity</h2>
                <Badge variant="secondary" data-testid="badge-activity-count">
                  {recentActivity.length} events
                </Badge>
              </div>
              <div className="space-y-0.5">
                {recentActivity.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 py-2 px-2 rounded-md hover-elevate"
                    data-testid={`activity-item-${index}`}
                  >
                    {getStatusIcon(item.status)}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium" data-testid={`text-activity-action-${index}`}>
                        {item.action}
                      </p>
                      <p className="text-xs text-muted-foreground truncate" data-testid={`text-activity-detail-${index}`}>
                        {item.detail}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-quick-links">
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h2 className="font-semibold" data-testid="text-quick-links-title">Quick Links</h2>
                <Globe className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-0.5">
                {quickLinks.map((link) => {
                  const basePath = selectedWorkspace ? `/${selectedWorkspace.id}/${link.href}` : `/${link.href}`;
                  return (
                    <Link key={link.href} href={basePath}>
                      <div
                        className="flex items-center gap-3 py-2 px-2 rounded-md hover-elevate cursor-pointer"
                        data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <link.icon className={`w-4 h-4 ${link.iconColor} shrink-0`} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{link.label}</p>
                          <p className="text-xs text-muted-foreground">{link.description}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
}
