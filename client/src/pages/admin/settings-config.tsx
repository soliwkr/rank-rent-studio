import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, AlertTriangle } from "lucide-react";

const plans = [
  { id: 1, name: "Solo", price: "$49/mo", workspaces: 2, posts: 20, keywords: 50, users: 3 },
  { id: 2, name: "Pro", price: "$199/mo", workspaces: 10, posts: 100, keywords: 250, users: 15 },
  { id: 3, name: "White Label", price: "$299/mo", workspaces: 25, posts: 300, keywords: 500, users: 30 },
  { id: 4, name: "Enterprise", price: "$499/mo", workspaces: -1, posts: -1, keywords: 1000, users: -1 },
];

const featureFlags = [
  { id: "white_label", name: "White Label", description: "Allow agencies to fully rebrand the platform with their own logo and domain", enabled: true },
  { id: "crm", name: "CRM", description: "Built-in customer relationship management for agency clients", enabled: true },
  { id: "widget", name: "Widget", description: "Embeddable AI chat widget for agency client websites", enabled: true },
  { id: "twilio", name: "Twilio", description: "Voice and SMS integration via Twilio for lead capture", enabled: false },
  { id: "cms_sync", name: "CMS Sync", description: "Automatic content sync with WordPress, Webflow, and other CMS platforms", enabled: true },
  { id: "schema_detection", name: "Schema Detection", description: "Auto-detect and suggest structured data markup for published content", enabled: true },
  { id: "link_builder", name: "Link Builder", description: "Automated internal and external link suggestion engine", enabled: false },
];

const qualityDefaults = [
  { id: "min_words", label: "Min Words", value: "800" },
  { id: "max_words", label: "Max Words", value: "3000" },
  { id: "min_headings", label: "Min Headings", value: "4" },
  { id: "min_images", label: "Min Images", value: "2" },
];

const creditDefaults = [
  { plan: "Solo", credits: 100 },
  { plan: "Pro", credits: 500 },
  { plan: "White Label", credits: 1200 },
  { plan: "Enterprise", credits: 5000 },
];

export default function AdminSettingsConfig() {
  const [flags, setFlags] = useState(featureFlags.map((f) => ({ ...f })));
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const toggleFlag = (id: string) => {
    setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
  };

  return (
    <AdminLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">Platform Configuration</h1>

      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList data-testid="tabs-config">
          <TabsTrigger value="plans" data-testid="tab-plans">Plans & Limits</TabsTrigger>
          <TabsTrigger value="flags" data-testid="tab-flags">Feature Flags</TabsTrigger>
          <TabsTrigger value="defaults" data-testid="tab-defaults">Defaults</TabsTrigger>
          <TabsTrigger value="danger" data-testid="tab-danger">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle>Plans & Limits</CardTitle>
              <CardDescription>Configure subscription plans and their resource limits</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Workspaces</TableHead>
                    <TableHead className="text-right">Posts/mo</TableHead>
                    <TableHead className="text-right">Keywords</TableHead>
                    <TableHead className="text-right">Users</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id} data-testid={`row-plan-${plan.id}`}>
                      <TableCell className="font-medium">
                        <Badge variant="outline">{plan.name}</Badge>
                      </TableCell>
                      <TableCell>{plan.price}</TableCell>
                      <TableCell className="text-right">{plan.workspaces === -1 ? "Unlimited" : plan.workspaces}</TableCell>
                      <TableCell className="text-right">{plan.posts === -1 ? "Unlimited" : plan.posts}</TableCell>
                      <TableCell className="text-right">{plan.keywords.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{plan.users === -1 ? "Unlimited" : plan.users}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" data-testid={`button-edit-plan-${plan.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flags">
          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
              <CardDescription>Toggle platform features on and off for all agencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {flags.map((flag) => (
                  <div key={flag.id} className="flex items-center justify-between gap-4" data-testid={`row-flag-${flag.id}`}>
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">{flag.name}</Label>
                      <p className="text-sm text-muted-foreground">{flag.description}</p>
                    </div>
                    <Switch
                      checked={flag.enabled}
                      onCheckedChange={() => toggleFlag(flag.id)}
                      data-testid={`switch-flag-${flag.id}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="defaults">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quality Gate</CardTitle>
                <CardDescription>Minimum content quality requirements before publishing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualityDefaults.map((qd) => (
                    <div key={qd.id} className="flex items-center justify-between gap-4">
                      <Label htmlFor={qd.id}>{qd.label}</Label>
                      <Input
                        id={qd.id}
                        defaultValue={qd.value}
                        className="w-[100px] text-right"
                        data-testid={`input-quality-${qd.id}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Credit Defaults</CardTitle>
                <CardDescription>Monthly AI credit allocation per plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creditDefaults.map((cd) => (
                    <div key={cd.plan} className="flex items-center justify-between gap-4">
                      <Label>{cd.plan}</Label>
                      <Input
                        defaultValue={cd.credits}
                        className="w-[100px] text-right"
                        data-testid={`input-credits-${cd.plan.toLowerCase().replace(/\s+/g, "-")}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="danger">
          <Card className="border-destructive/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </div>
              <CardDescription>Irreversible and destructive actions. Proceed with caution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-medium">Purge Old Data</p>
                  <p className="text-sm text-muted-foreground">Remove all data older than 12 months including logs, analytics, and archived posts</p>
                </div>
                <Button variant="destructive" data-testid="button-purge-data">Purge Old Data</Button>
              </div>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">Take the platform offline for all agencies while performing updates</p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                  data-testid="switch-maintenance-mode"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </AdminLayout>
  );
}
