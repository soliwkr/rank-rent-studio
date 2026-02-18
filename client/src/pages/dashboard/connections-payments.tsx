import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ConnectionsPayments() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">Payment Connections</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card data-testid="card-payment-stripe">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base">Stripe</CardTitle>
            <Badge data-testid="badge-stripe-status">Connected</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input type="password" defaultValue="sk_live_••••••••••••" data-testid="input-stripe-api-key" />
            </div>

            <div className="space-y-2">
              <Label>Webhook URL</Label>
              <div className="p-2 rounded-md bg-muted/50 text-sm font-mono text-muted-foreground" data-testid="text-stripe-webhook">
                https://api.indexflow.cloud/webhooks/stripe/ws_abc123
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button size="sm" data-testid="button-save-stripe">Save</Button>
              <Button variant="outline" size="sm" data-testid="button-test-stripe">Test Connection</Button>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-payment-paypal">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base">PayPal</CardTitle>
            <Badge variant="secondary" data-testid="badge-paypal-status">Not Connected</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Client ID</Label>
              <Input placeholder="Enter PayPal Client ID" data-testid="input-paypal-client-id" />
            </div>

            <div className="space-y-2">
              <Label>Secret</Label>
              <Input type="password" placeholder="Enter PayPal Secret" data-testid="input-paypal-secret" />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button size="sm" data-testid="button-save-paypal">Save</Button>
              <Button variant="outline" size="sm" data-testid="button-test-paypal">Test Connection</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
