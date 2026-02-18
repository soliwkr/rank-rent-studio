import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ConnectionsTwilio() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">Twilio Account</h1>

      <Card data-testid="card-twilio">
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>Account Configuration</CardTitle>
          <Badge data-testid="badge-twilio-status">Connected</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Account SID</Label>
            <Input defaultValue="AC1234567890abcdef1234567890abcdef" data-testid="input-account-sid" />
          </div>

          <div className="space-y-2">
            <Label>Auth Token</Label>
            <Input type="password" defaultValue="••••••••••••••••••••" data-testid="input-auth-token" />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input defaultValue="+1 (555) 987-6543" data-testid="input-phone-number" />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button data-testid="button-save-twilio">Save</Button>
            <Button variant="outline" data-testid="button-test-twilio">Test Connection</Button>
          </div>

          <p className="text-xs text-muted-foreground" data-testid="text-last-verified">Last verified: 2026-02-18 09:30</p>
        </CardContent>
      </Card>
    </div>
  );
}
