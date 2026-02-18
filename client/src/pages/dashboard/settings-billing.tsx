import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreditCard } from "lucide-react";

const usageItems = [
  { label: "Workspaces", used: 3, total: 50 },
  { label: "Posts", used: 127, total: 500 },
  { label: "Keywords", used: 45, total: 200 },
  { label: "Users", used: 4, total: 5 },
];

export default function SettingsBilling() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">Billing & Usage</h1>

      <Card data-testid="card-current-plan">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Badge data-testid="badge-plan-name">Pro</Badge>
            <span className="text-2xl font-bold" data-testid="text-plan-price">$99/mo</span>
          </div>
          <p className="text-sm text-muted-foreground" data-testid="text-next-billing">Next billing date: March 1, 2026</p>
          <div className="flex items-center gap-2 flex-wrap">
            <Button data-testid="button-change-plan">Change Plan</Button>
            <Button variant="outline" data-testid="button-cancel-plan">Cancel</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {usageItems.map((item) => (
            <div key={item.label} className="space-y-2" data-testid={`usage-${item.label.toLowerCase()}`}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm text-muted-foreground">{item.used} of {item.total}</span>
              </div>
              <Progress value={(item.used / item.total) * 100} />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card data-testid="card-credits-rank-tracker">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-medium">Rank Tracker Credits</p>
                <p className="text-2xl font-bold" data-testid="text-rank-tracker-credits">15</p>
                <p className="text-xs text-muted-foreground">remaining</p>
              </div>
              <Button variant="outline" size="sm" data-testid="button-buy-rank-credits">Buy Credits</Button>
            </div>
          </CardContent>
        </Card>
        <Card data-testid="card-credits-grid-scan">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-medium">Grid Scan Credits</p>
                <p className="text-2xl font-bold" data-testid="text-grid-scan-credits">10</p>
                <p className="text-xs text-muted-foreground">remaining</p>
              </div>
              <Button variant="outline" size="sm" data-testid="button-buy-grid-credits">Buy Credits</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card data-testid="card-payment-method">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm" data-testid="text-card-number">**** **** **** 4242</span>
            </div>
            <Button variant="outline" size="sm" data-testid="button-update-payment">Update</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
