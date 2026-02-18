import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  FileText,
  FileIcon,
  Megaphone,
  Globe,
  Link as LinkIcon,
  HeartPulse,
  RefreshCw,
  ClipboardList,
  Receipt,
  TrendingUp,
  MapPin,
  Monitor,
  PhoneCall,
  Mic,
  MessageCircle,
  Activity,
  Code,
  Kanban,
  Contact,
  BarChart3,
  Download,
  Brain,
  Cpu,
  ImageIcon,
  CreditCard,
  Phone,
  Sparkles,
  BookOpen,
  Users,
  Palette,
  Wallet,
  ListChecks,
  LifeBuoy,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useWorkspace } from "@/lib/workspace-context";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Dashboard",
    items: [
      { title: "Overview", path: "/today", icon: LayoutDashboard },
    ],
  },
  {
    label: "Content Engine",
    items: [
      { title: "Posts", path: "/content/posts", icon: FileText },
      { title: "Pages", path: "/content/pages", icon: FileIcon },
      { title: "Campaigns", path: "/content/campaigns", icon: Megaphone },
      { title: "Domains", path: "/content/domains", icon: Globe },
    ],
  },
  {
    label: "SEO",
    items: [
      { title: "Links", path: "/seo/links", icon: LinkIcon },
      { title: "Health", path: "/seo/health", icon: HeartPulse },
      { title: "CMS", path: "/seo/cms", icon: RefreshCw },
      { title: "Reports", path: "/seo/reports", icon: ClipboardList },
      { title: "Invoices", path: "/seo/invoices", icon: Receipt },
    ],
  },
  {
    label: "Rank Tracker",
    items: [
      { title: "Track Keywords", path: "/rank-tracker/track-keywords", icon: TrendingUp },
      { title: "Local Search Grid", path: "/rank-tracker/local-search-grid", icon: MapPin },
      { title: "Google Search Console", path: "/rank-tracker/google-search-console", icon: Monitor },
    ],
  },
  {
    label: "Twilio",
    items: [
      { title: "Call Logs", path: "/twilio/call-logs", icon: PhoneCall },
      { title: "Voice Settings", path: "/twilio/voice", icon: Mic },
      { title: "SMS Settings", path: "/twilio/sms", icon: MessageCircle },
    ],
  },
  {
    label: "Widget",
    items: [
      { title: "Monitoring", path: "/widget/monitoring", icon: Activity },
      { title: "Widget Code", path: "/widget/code", icon: Code },
    ],
  },
  {
    label: "CRM",
    items: [
      { title: "Pipeline", path: "/crm/pipeline", icon: Kanban },
      { title: "Contacts", path: "/crm/contacts", icon: Contact },
    ],
  },
  {
    label: "Analytics",
    items: [
      { title: "Overview", path: "/analytics/overview", icon: BarChart3 },
      { title: "Export Data", path: "/analytics/export", icon: Download },
    ],
  },
  {
    label: "Connections",
    items: [
      { title: "AI Providers", path: "/connections/ai-providers", icon: Sparkles },
      { title: "Image Banks", path: "/connections/image-banks", icon: ImageIcon },
      { title: "Payments", path: "/connections/payments", icon: CreditCard },
      { title: "Twilio Account", path: "/connections/twilio", icon: Phone },
    ],
  },
  {
    label: "AI Training",
    items: [
      { title: "Knowledge Base", path: "/ai-training/knowledge-base", icon: Brain },
      { title: "Channels", path: "/ai-training/channels", icon: Cpu },
    ],
  },
  {
    label: "Settings",
    items: [
      { title: "Team & Invites", path: "/settings/team", icon: Users },
      { title: "White Label", path: "/settings/white-label", icon: Palette },
      { title: "Billing & Usage", path: "/settings/billing", icon: Wallet },
      { title: "Setup Guide", path: "/settings/setup-guide", icon: ListChecks },
    ],
  },
  {
    label: "Support",
    items: [
      { title: "Documentation", path: "/support/documentation", icon: BookOpen },
      { title: "Support Tickets", path: "/support/tickets", icon: LifeBuoy },
    ],
  },
];

export function ClientSidebar() {
  const [location] = useLocation();
  const { workspaces, selectedWorkspace, selectWorkspace } = useWorkspace();

  const base = selectedWorkspace ? `/${selectedWorkspace.id}` : "";

  const isActive = (path: string) => {
    const fullPath = `${base}${path}`;
    if (path === "/today") return location === fullPath;
    return location.startsWith(fullPath);
  };

  const isGroupActive = (group: NavGroup) => {
    return group.items.some((item) => isActive(item.path));
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <span className="text-sm font-semibold truncate" data-testid="text-client-title">
            {selectedWorkspace?.name ?? "indexFlow"}
          </span>
        </div>
        <Select
          value={selectedWorkspace?.id ?? ""}
          onValueChange={(val) => {
            const workspace = workspaces.find((w) => w.id === val) ?? null;
            selectWorkspace(workspace);
          }}
        >
          <SelectTrigger data-testid="select-workspace" className="w-full bg-sidebar border-sidebar-border text-sidebar-foreground text-xs h-8">
            <SelectValue placeholder="Select workspace" />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            {workspaces.map((workspace) => (
              <SelectItem
                key={workspace.id}
                value={workspace.id}
                data-testid={`select-workspace-option-${workspace.id}`}
              >
                {workspace.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <Collapsible defaultOpen={isGroupActive(group) || group.label === "Dashboard"} className="group/collapsible">
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="cursor-pointer" data-testid={`group-${group.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  {group.label}
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive(item.path)}
                          tooltip={item.title}
                          data-testid={`link-${item.path.split("/").filter(Boolean).join("-")}`}
                        >
                          <Link href={`${base}${item.path}`}>
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

      <SidebarFooter />
    </Sidebar>
  );
}
