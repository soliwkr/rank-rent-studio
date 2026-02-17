import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import restoLogo from "@/assets/images/resto-logo.webp";
import {
  LayoutDashboard, Users, CreditCard, Globe, Bot, Phone, BarChart3,
  Bell, Settings, HelpCircle, Download, Search, FileText, MessageSquare,
  Megaphone, Menu
} from "lucide-react";
import { useState } from "react";
import type { AdminRole } from "@shared/schema";
import { adminRolePermissions } from "@shared/schema";

function getAdminRole(): AdminRole {
  try {
    const session = localStorage.getItem("resto_admin_session");
    if (session) {
      const parsed = JSON.parse(session);
      return (parsed.role as AdminRole) || "super_admin";
    }
  } catch {}
  return "super_admin";
}

function hasPermission(permission: string): boolean {
  const role = getAdminRole();
  const perms = adminRolePermissions[role];
  if (!perms) return false;
  if (perms.includes("*")) return true;
  return perms.includes(permission);
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, permission: "dashboard" },
  { label: "Clients", href: "/admin/clients", icon: Users, permission: "clients" },
  { label: "CRM", href: "/admin/crm", icon: MessageSquare, permission: "crm" },
  { label: "Users", href: "/admin/users", icon: Users, permission: "users" },
  { label: "Billing", href: "/admin/billing", icon: CreditCard, permission: "billing" },
  { label: "Websites", href: "/admin/websites", icon: Globe, permission: "websites" },
  { label: "Website Changes", href: "/admin/website-changes", icon: FileText, permission: "website-changes" },
  { label: "Widgets", href: "/admin/widgets", icon: Bot, permission: "widgets" },
  { label: "Twilio", href: "/admin/twilio", icon: Phone, permission: "twilio" },
  { label: "Calls", href: "/admin/calls", icon: Phone, permission: "calls" },
  { label: "Content", href: "/admin/content", icon: Megaphone, permission: "content" },
  { label: "SEO", href: "/admin/seo", icon: Search, permission: "seo" },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3, permission: "analytics" },
  { label: "Support", href: "/admin/support", icon: HelpCircle, permission: "support" },
  { label: "Notifications", href: "/admin/notifications", icon: Bell, permission: "notifications" },
  { label: "Export Data", href: "/admin/export-data", icon: Download, permission: "export-data" },
  { label: "Settings", href: "/admin/settings", icon: Settings, permission: "settings" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const visibleItems = navItems.filter(item => hasPermission(item.permission));

  return (
    <div className="flex h-screen w-full" data-testid="admin-layout">
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 w-64 h-full bg-sidebar border-r flex flex-col transition-transform`}>
        <div className="p-4 border-b flex items-center gap-2">
          <img src={restoLogo} alt="indexFlow" className="h-8 w-8" />
          <span className="font-bold text-lg">indexFlow</span>
          <span className="text-xs text-muted-foreground ml-1">Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {visibleItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/admin" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-2 px-4 py-1.5 mx-2 rounded-md text-sm cursor-pointer ${isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : 'text-sidebar-foreground hover-elevate'}`}
                  data-testid={`nav-admin-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t">
          <Button variant="outline" className="w-full" onClick={() => { localStorage.removeItem("resto_admin_session"); window.location.href = "/"; }} data-testid="button-admin-logout">
            Logout
          </Button>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between gap-2 p-3 border-b sticky top-0 z-20 bg-background">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)} data-testid="button-admin-mobile-menu">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
