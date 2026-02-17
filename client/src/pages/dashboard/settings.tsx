import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, Globe, Key, Bell, Shield, Plus, Trash2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useWorkspace } from "@/lib/workspace-context";
import type { Domain, SeoSettings } from "@shared/schema";

function DomainManager({ workspaceId }: { workspaceId: string }) {
  const [addOpen, setAddOpen] = useState(false);
  const [newDomain, setNewDomain] = useState("");
  const [blogTemplate, setBlogTemplate] = useState("editorial");
  const [accentColor, setAccentColor] = useState("#0ea5e9");
  const { toast } = useToast();

  const { data: allDomains = [], isLoading } = useQuery<Domain[]>({
    queryKey: ["/api/domains"],
  });

  const domains = allDomains.filter((d) => d.workspaceId === workspaceId);

  const createMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/domains", {
        workspaceId,
        domain: newDomain,
        blogTemplate,
        accentColor,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/domains"] });
      toast({ title: "Domain added" });
      setAddOpen(false);
      setNewDomain("");
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/domains/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/domains"] });
      toast({ title: "Domain removed" });
    },
  });

  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
          <Globe className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h3 className="font-semibold">Domain Configuration</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage custom domains and blog templates
              </p>
            </div>
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" data-testid="button-add-domain">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Domain
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Domain</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                  <div className="space-y-1.5">
                    <Label>Domain</Label>
                    <Input
                      placeholder="blog.example.com"
                      value={newDomain}
                      onChange={(e) => setNewDomain(e.target.value)}
                      data-testid="input-domain-name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Blog Template</Label>
                    <Select value={blogTemplate} onValueChange={setBlogTemplate}>
                      <SelectTrigger data-testid="select-blog-template">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="editorial">Editorial</SelectItem>
                        <SelectItem value="magazine">Magazine</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="grid">Grid</SelectItem>
                        <SelectItem value="brutalist">Brutalist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-9 h-9 rounded-md border cursor-pointer"
                        data-testid="input-accent-color"
                      />
                      <Input
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => createMutation.mutate()}
                    disabled={!newDomain || createMutation.isPending}
                    data-testid="button-submit-domain"
                  >
                    {createMutation.isPending ? "Adding..." : "Add Domain"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="mt-4 space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : domains.length === 0 ? (
            <p className="text-sm text-muted-foreground mt-4">No domains configured yet.</p>
          ) : (
            <div className="mt-4 space-y-2">
              {domains.map((d) => (
                <div key={d.id} className="flex items-center justify-between gap-4 py-3 border-b last:border-0" data-testid={`row-domain-${d.id}`}>
                  <div className="flex items-center gap-3 min-w-0">
                    {d.accentColor && (
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.accentColor }} />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{d.domain}</span>
                        {d.isPrimary && <Badge variant="secondary" className="text-xs">Primary</Badge>}
                      </div>
                      <span className="text-xs text-muted-foreground">{d.blogTemplate} template</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant={d.sslStatus === "active" ? "default" : "secondary"}
                      className={`text-xs ${d.sslStatus === "active" ? "bg-green-600 text-white" : ""}`}
                    >
                      SSL: {d.sslStatus}
                    </Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteMutation.mutate(d.id)}
                      data-testid={`button-delete-domain-${d.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function SeoSettingsCard({ workspaceId }: { workspaceId: string }) {
  const { data: allSettings = [] } = useQuery<SeoSettings[]>({
    queryKey: ["/api/seo-settings"],
  });

  const settings = allSettings.find((s) => s.workspaceId === workspaceId);

  const [defaultTitle, setDefaultTitle] = useState(settings?.defaultTitle || "");
  const [defaultDescription, setDefaultDescription] = useState(settings?.defaultDescription || "");
  const [robotsTxt, setRobotsTxt] = useState(settings?.robotsTxt || "");
  const [sitemapEnabled, setSitemapEnabled] = useState(settings?.sitemapEnabled ?? true);
  const [schemaMarkupEnabled, setSchemaMarkupEnabled] = useState(settings?.schemaMarkupEnabled ?? true);
  const [canonicalBaseUrl, setCanonicalBaseUrl] = useState(settings?.canonicalBaseUrl || "");
  const { toast } = useToast();

  const saveMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("PUT", "/api/seo-settings", {
        workspaceId,
        defaultTitle,
        defaultDescription,
        robotsTxt,
        sitemapEnabled,
        schemaMarkupEnabled,
        canonicalBaseUrl,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo-settings"] });
      toast({ title: "SEO settings saved" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
          <ExternalLink className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-semibold">SEO Settings</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Default SEO configuration for this workspace
            </p>
          </div>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Default Title Tag</Label>
              <Input
                value={defaultTitle}
                onChange={(e) => setDefaultTitle(e.target.value)}
                placeholder="{{page_title}} | {{workspace_name}}"
                data-testid="input-seo-title"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Default Meta Description</Label>
              <Textarea
                value={defaultDescription}
                onChange={(e) => setDefaultDescription(e.target.value)}
                placeholder="Default meta description template..."
                className="min-h-[80px]"
                data-testid="textarea-seo-description"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Canonical Base URL</Label>
              <Input
                value={canonicalBaseUrl}
                onChange={(e) => setCanonicalBaseUrl(e.target.value)}
                placeholder="https://example.com"
                data-testid="input-seo-canonical"
              />
            </div>
            <div className="space-y-1.5">
              <Label>robots.txt</Label>
              <Textarea
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
                placeholder="User-agent: *&#10;Allow: /"
                className="min-h-[80px] font-mono text-sm"
                data-testid="textarea-seo-robots"
              />
            </div>
            <div className="flex items-center justify-between gap-4 py-2">
              <div>
                <p className="text-sm font-medium">Sitemap Generation</p>
                <p className="text-xs text-muted-foreground">Auto-generate sitemap.xml</p>
              </div>
              <Switch
                checked={sitemapEnabled}
                onCheckedChange={setSitemapEnabled}
                data-testid="switch-sitemap"
              />
            </div>
            <div className="flex items-center justify-between gap-4 py-2">
              <div>
                <p className="text-sm font-medium">Schema Markup</p>
                <p className="text-xs text-muted-foreground">Add structured data to posts</p>
              </div>
              <Switch
                checked={schemaMarkupEnabled}
                onCheckedChange={setSchemaMarkupEnabled}
                data-testid="switch-schema-markup"
              />
            </div>
          </div>
          <Button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            data-testid="button-save-seo-settings"
          >
            {saveMutation.isPending ? "Saving..." : "Save SEO Settings"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function SettingsPage() {
  const { selectedWorkspace } = useWorkspace();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your IndexFlow configuration
          {selectedWorkspace && (
            <span className="ml-1">
              for <span className="font-medium text-foreground">{selectedWorkspace.name}</span>
            </span>
          )}
        </p>
      </div>

      {selectedWorkspace ? (
        <>
          <DomainManager workspaceId={selectedWorkspace.id} />
          <SeoSettingsCard workspaceId={selectedWorkspace.id} />
        </>
      ) : (
        <Card className="p-8 text-center">
          <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Select a workspace from the sidebar to manage settings.</p>
        </Card>
      )}

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
