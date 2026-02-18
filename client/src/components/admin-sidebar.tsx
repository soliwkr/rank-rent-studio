import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Building2,
  ClipboardCheck,
  FileText,
  Megaphone,
  ShieldAlert,
  TrendingUp,
  Activity,
  RefreshCw,
  DollarSign,
  Receipt,
  Banknote,
  Key,
  Phone,
  Mail,
  Server,
  Users,
  UserCog,
  LifeBuoy,
  PhoneCall,
  Bell,
  Settings,
  Palette,
  ChevronDown,
  Zap,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  icon: React.ComponentType<any>;
  path: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Dashboard",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    ],
  },
  {
    label: "Agencies",
    items: [
      { title: "All Agencies", icon: Building2, path: "/admin/agencies" },
      { title: "Pending Approvals", icon: ClipboardCheck, path: "/admin/agencies/pending" },
    ],
  },
  {
    label: "Content",
    items: [
      { title: "All Posts", icon: FileText, path: "/admin/content/posts" },
      { title: "All Campaigns", icon: Megaphone, path: "/admin/content/campaigns" },
      { title: "Content Moderation", icon: ShieldAlert, path: "/admin/content/moderation" },
    ],
  },
  {
    label: "Platform SEO",
    items: [
      { title: "Keyword Usage", icon: TrendingUp, path: "/admin/platform-seo/keywords" },
      { title: "API Usage", icon: Activity, path: "/admin/platform-seo/api-usage" },
    ],
  },
  {
    label: "Billing",
    items: [
      { title: "Subscriptions", icon: RefreshCw, path: "/admin/billing/subscriptions" },
      { title: "Revenue", icon: DollarSign, path: "/admin/billing/revenue" },
      { title: "Invoices", icon: Receipt, path: "/admin/billing/invoices" },
      { title: "Payouts", icon: Banknote, path: "/admin/billing/payouts" },
    ],
  },
  {
    label: "System",
    items: [
      { title: "API Keys", icon: Key, path: "/admin/system/api-keys" },
      { title: "Twilio", icon: Phone, path: "/admin/system/twilio" },
      { title: "Email", icon: Mail, path: "/admin/system/email" },
      { title: "Infrastructure", icon: Server, path: "/admin/system/infrastructure" },
    ],
  },
  {
    label: "Users",
    items: [
      { title: "All Users", icon: Users, path: "/admin/users/all" },
      { title: "Admin Users", icon: UserCog, path: "/admin/users/admins" },
    ],
  },
  {
    label: "Support",
    items: [
      { title: "All Tickets", icon: LifeBuoy, path: "/admin/support/tickets" },
      { title: "Call Logs", icon: PhoneCall, path: "/admin/support/call-logs" },
      { title: "Announcements", icon: Bell, path: "/admin/support/announcements" },
    ],
  },
  {
    label: "Settings",
    items: [
      { title: "Platform Config", icon: Settings, path: "/admin/settings/config" },
      { title: "Branding", icon: Palette, path: "/admin/settings/branding" },
    ],
  },
];

export function AdminSidebar() {
  const [location] = useLocation();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("indexflow_theme");
      if (saved) return saved === "dark";
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("indexflow_theme", isDark ? "dark" : "light");
  }, [isDark]);

  const isItemActive = (path: string) => {
    if (path === "/admin") return location === "/admin";
    return location === path || location.startsWith(path + "/");
  };

  const isGroupActive = (group: NavGroup) => {
    return group.items.some((item) => isItemActive(item.path));
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <Zap className="h-5 w-5 text-sidebar-primary" />
          <span className="text-base font-bold tracking-tight" data-testid="text-admin-title">
            IndexFlow
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label} className="py-0">
            <Collapsible
              defaultOpen={isGroupActive(group) || group.label === "Dashboard"}
              className="group/collapsible"
            >
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger
                  className="flex w-full items-center gap-1 cursor-pointer"
                  data-testid={`trigger-${group.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {group.label}
                  <ChevronDown className="ml-auto h-3.5 w-3.5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={isItemActive(item.path)}
                          tooltip={item.title}
                          data-testid={`link-${item.path.replace(/\//g, "-").slice(1)}`}
                        >
                          <Link href={item.path}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-1">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-xs bg-sidebar-accent text-sidebar-accent-foreground">
              SA
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-medium truncate" data-testid="text-admin-user">
              Super Admin
            </span>
            <Badge variant="secondary" className="w-fit text-[10px] px-1.5 py-0">
              Admin
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsDark(!isDark)}
            data-testid="button-theme-toggle"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
