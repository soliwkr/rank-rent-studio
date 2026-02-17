import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Globe, Key, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your IndexFlow configuration</p>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Domain Configuration</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage Cloudflare Custom Hostnames and SSL certificates for client domains.
            </p>
            <Button variant="outline" className="mt-4" data-testid="button-manage-domains">
              Manage Domains
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
            <Key className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">API Keys</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure API keys for Google Search Console, GitHub, and Cloudflare integrations.
            </p>
            <div className="mt-4 space-y-2">
              {["Google Search Console", "GitHub", "Cloudflare"].map((service) => (
                <div key={service} className="flex items-center justify-between gap-4 py-2 border-b last:border-0">
                  <span className="text-sm">{service}</span>
                  <Badge variant="secondary" className="text-xs">Not Connected</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Notifications</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure alerts for ranking changes, new leads, and deployment status.
            </p>
            <Button variant="outline" className="mt-4" data-testid="button-manage-notifications">
              Configure Alerts
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Security</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage team access, roles, and authentication settings.
            </p>
            <Button variant="outline" className="mt-4" data-testid="button-manage-security">
              Security Settings
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
