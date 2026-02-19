import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useWorkspace } from "@/lib/workspace-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CreditCard, CheckCircle, Building2, HelpCircle, X, ExternalLink, Loader2, Unlink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const paymentFeatures = [
  "Accept one-time payments from clients",
  "Recurring subscription billing",
  "Automated invoice generation",
  "Refund processing",
  "Payment analytics and reporting",
  "Multi-currency support",
];

const stripeSteps = [
  { step: "Go to dashboard.stripe.com and create an account", link: "https://dashboard.stripe.com/register" },
  { step: "Complete identity verification and business details" },
  { step: "Navigate to Developers > API Keys in your Stripe dashboard", link: "https://dashboard.stripe.com/apikeys" },
  { step: "Copy your Publishable Key (starts with pk_live_)" },
  { step: "Click 'Reveal live key' to copy your Secret Key (starts with sk_live_)" },
  { step: "Paste both keys in the fields above and click Connect" },
];

const paypalSteps = [
  { step: "Go to developer.paypal.com and log in with your PayPal account", link: "https://developer.paypal.com/" },
  { step: "Navigate to Apps & Credentials" },
  { step: "Click 'Create App' under the Live section" },
  { step: "Name your app and click Create" },
  { step: "Copy the Client ID from the app details" },
  { step: "Click 'Show' next to Secret to reveal and copy it" },
  { step: "Paste both values in the fields above and click Connect" },
];

export default function ConnectionsPayments() {
  const { toast } = useToast();
  const { selectedWorkspace } = useWorkspace();
  const wsId = selectedWorkspace?.id || "";

  const [stripePublishable, setStripePublishable] = useState("");
  const [stripeSecret, setStripeSecret] = useState("");
  const [paypalClientId, setPaypalClientId] = useState("");
  const [paypalSecret, setPaypalSecret] = useState("");
  const [showStripeGuide, setShowStripeGuide] = useState(false);
  const [showPaypalGuide, setShowPaypalGuide] = useState(false);

  const { data: settings, isLoading } = useQuery<any>({
    queryKey: ["/api/workspaces", wsId, "payment-settings"],
    queryFn: async () => {
      const res = await fetch(`/api/workspaces/${wsId}/payment-settings`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    enabled: !!wsId,
  });

  const stripeConnected = settings?.stripeConnected || false;
  const paypalConnected = settings?.paypalConnected || false;

  const connectMutation = useMutation({
    mutationFn: async (payload: any) => {
      return apiRequest("PUT", `/api/workspaces/${wsId}/payment-settings`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workspaces", wsId, "payment-settings"] });
    },
  });

  const handleConnectStripe = async () => {
    if (!stripePublishable.trim() || !stripeSecret.trim()) {
      toast({ title: "Missing fields", description: "Please enter both Stripe keys.", variant: "destructive" });
      return;
    }
    try {
      await connectMutation.mutateAsync({
        provider: "stripe",
        stripePublishableKey: stripePublishable,
        stripeSecretKey: stripeSecret,
      });
      toast({ title: "Stripe Connected", description: "Your Stripe account has been connected successfully." });
      setStripePublishable("");
      setStripeSecret("");
    } catch {
      toast({ title: "Connection failed", variant: "destructive" });
    }
  };

  const handleDisconnectStripe = async () => {
    try {
      await connectMutation.mutateAsync({ provider: "disconnect-stripe" });
      toast({ title: "Stripe Disconnected", description: "Your Stripe account has been disconnected." });
    } catch {
      toast({ title: "Disconnect failed", variant: "destructive" });
    }
  };

  const handleConnectPaypal = async () => {
    if (!paypalClientId.trim() || !paypalSecret.trim()) {
      toast({ title: "Missing fields", description: "Please enter both PayPal credentials.", variant: "destructive" });
      return;
    }
    try {
      await connectMutation.mutateAsync({
        provider: "paypal",
        paypalClientId,
        paypalClientSecret: paypalSecret,
      });
      toast({ title: "PayPal Connected", description: "Your PayPal account has been connected successfully." });
      setPaypalClientId("");
      setPaypalSecret("");
    } catch {
      toast({ title: "Connection failed", variant: "destructive" });
    }
  };

  const handleDisconnectPaypal = async () => {
    try {
      await connectMutation.mutateAsync({ provider: "disconnect-paypal" });
      toast({ title: "PayPal Disconnected", description: "Your PayPal account has been disconnected." });
    } catch {
      toast({ title: "Disconnect failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif italic font-semibold" data-testid="text-page-title">Payment Integration</h1>
        <p className="text-sm text-muted-foreground" data-testid="text-page-subtitle">Connect your payment provider to bill clients</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <Tabs defaultValue="stripe" data-testid="tabs-payment">
          <TabsList data-testid="tabs-list">
            <TabsTrigger value="stripe" data-testid="tab-stripe">
              Stripe
              {stripeConnected && <CheckCircle className="w-3 h-3 ml-1.5 text-emerald-600" />}
            </TabsTrigger>
            <TabsTrigger value="paypal" data-testid="tab-paypal">
              PayPal
              {paypalConnected && <CheckCircle className="w-3 h-3 ml-1.5 text-emerald-600" />}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stripe" className="mt-4 space-y-4">
            <Card data-testid="card-stripe-credentials">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-semibold">Stripe API Credentials</h3>
                  </div>
                  <Badge variant={stripeConnected ? "default" : "secondary"} data-testid="badge-stripe-status">
                    {stripeConnected ? "Connected" : "Not Connected"}
                  </Badge>
                </div>

                {stripeConnected ? (
                  <div className="space-y-3">
                    <div className="rounded-md bg-muted/50 p-3 space-y-1">
                      <p className="text-sm"><span className="text-muted-foreground">Publishable Key:</span> {settings?.stripePublishableKey ? `${settings.stripePublishableKey.substring(0, 12)}...` : "Set"}</p>
                      <p className="text-sm"><span className="text-muted-foreground">Secret Key:</span> ***</p>
                    </div>
                    <Button variant="outline" className="text-destructive" onClick={handleDisconnectStripe} disabled={connectMutation.isPending} data-testid="button-disconnect-stripe">
                      <Unlink className="h-4 w-4 mr-2" />
                      Disconnect Stripe
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="stripe-publishable">Publishable Key</Label>
                        <Input id="stripe-publishable" placeholder="pk_live_..." value={stripePublishable} onChange={(e) => setStripePublishable(e.target.value)} data-testid="input-stripe-publishable" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stripe-secret">Secret Key</Label>
                        <Input id="stripe-secret" type="password" placeholder="sk_live_..." value={stripeSecret} onChange={(e) => setStripeSecret(e.target.value)} data-testid="input-stripe-secret" />
                      </div>
                    </div>
                    <Button className="w-full" onClick={handleConnectStripe} disabled={connectMutation.isPending} data-testid="button-connect-stripe">
                      {connectMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                      Connect Stripe Account
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card data-testid="card-stripe-guide">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm">Stripe Setup Guide</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowStripeGuide(!showStripeGuide)} data-testid="button-stripe-guide">
                    {showStripeGuide ? <X className="h-3 w-3 mr-1" /> : <HelpCircle className="h-3 w-3 mr-1" />}
                    {showStripeGuide ? "Close" : "Show Steps"}
                  </Button>
                </div>
                {showStripeGuide && (
                  <ol className="mt-3 space-y-2">
                    {stripeSteps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted text-foreground flex items-center justify-center text-[10px] font-medium">{i + 1}</span>
                        <div className="pt-0.5">
                          <span className="text-muted-foreground">{s.step}</span>
                          {s.link && (
                            <a href={s.link} target="_blank" rel="noopener noreferrer" className="ml-1.5 inline-flex items-center text-muted-foreground text-xs underline hover:text-foreground">
                              Open <ExternalLink className="w-3 h-3 ml-0.5" />
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paypal" className="mt-4 space-y-4">
            <Card data-testid="card-paypal-credentials">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-semibold">PayPal API Credentials</h3>
                  </div>
                  <Badge variant={paypalConnected ? "default" : "secondary"} data-testid="badge-paypal-status">
                    {paypalConnected ? "Connected" : "Not Connected"}
                  </Badge>
                </div>

                {paypalConnected ? (
                  <div className="space-y-3">
                    <div className="rounded-md bg-muted/50 p-3 space-y-1">
                      <p className="text-sm"><span className="text-muted-foreground">Client ID:</span> {settings?.paypalClientId ? `${settings.paypalClientId.substring(0, 12)}...` : "Set"}</p>
                      <p className="text-sm"><span className="text-muted-foreground">Secret:</span> ***</p>
                    </div>
                    <Button variant="outline" className="text-destructive" onClick={handleDisconnectPaypal} disabled={connectMutation.isPending} data-testid="button-disconnect-paypal">
                      <Unlink className="h-4 w-4 mr-2" />
                      Disconnect PayPal
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="paypal-client-id">Client ID</Label>
                        <Input id="paypal-client-id" placeholder="Enter PayPal Client ID" value={paypalClientId} onChange={(e) => setPaypalClientId(e.target.value)} data-testid="input-paypal-client-id" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paypal-secret">Secret</Label>
                        <Input id="paypal-secret" type="password" placeholder="Enter PayPal Secret" value={paypalSecret} onChange={(e) => setPaypalSecret(e.target.value)} data-testid="input-paypal-secret" />
                      </div>
                    </div>
                    <Button className="w-full" onClick={handleConnectPaypal} disabled={connectMutation.isPending} data-testid="button-connect-paypal">
                      {connectMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                      Connect PayPal Account
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card data-testid="card-paypal-guide">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm">PayPal Setup Guide</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowPaypalGuide(!showPaypalGuide)} data-testid="button-paypal-guide">
                    {showPaypalGuide ? <X className="h-3 w-3 mr-1" /> : <HelpCircle className="h-3 w-3 mr-1" />}
                    {showPaypalGuide ? "Close" : "Show Steps"}
                  </Button>
                </div>
                {showPaypalGuide && (
                  <ol className="mt-3 space-y-2">
                    {paypalSteps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted text-foreground flex items-center justify-center text-[10px] font-medium">{i + 1}</span>
                        <div className="pt-0.5">
                          <span className="text-muted-foreground">{s.step}</span>
                          {s.link && (
                            <a href={s.link} target="_blank" rel="noopener noreferrer" className="ml-1.5 inline-flex items-center text-muted-foreground text-xs underline hover:text-foreground">
                              Open <ExternalLink className="w-3 h-3 ml-0.5" />
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <Card data-testid="card-payment-features">
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold">What Payment Integration Powers</h3>
          <div className="space-y-2">
            {paymentFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2" data-testid={`feature-payment-${idx}`}>
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card data-testid="card-banking-connection">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <p className="font-medium text-sm">Banking Connection</p>
              <p className="text-xs text-muted-foreground">Payments are deposited directly into your connected bank account via Stripe or PayPal. Manage payout settings in your payment provider dashboard.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
