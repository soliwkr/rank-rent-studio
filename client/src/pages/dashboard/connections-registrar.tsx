import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Key, CheckCircle, ExternalLink, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegistrarSetting {
  id: number;
  workspaceId: string;
  provider: string;
  apiKey: string | null;
  secretKey: string | null;
  ovhAppKey: string | null;
  ovhAppSecret: string | null;
  ovhConsumerKey: string | null;
  ovhEndpoint: string | null;
  isEnabled: boolean | null;
}

function maskKey(key: string | null): string {
  if (!key || key.length < 8) return key ? "••••••••" : "";
  return key.slice(0, 4) + "••••••••" + key.slice(-4);
}

export default function ConnectionsRegistrar() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { toast } = useToast();

  const [porkbunKey, setPorkbunKey] = useState("");
  const [porkbunSecret, setPorkbunSecret] = useState("");
  const [ovhAppKey, setOvhAppKey] = useState("");
  const [ovhAppSecret, setOvhAppSecret] = useState("");
  const [ovhConsumerKey, setOvhConsumerKey] = useState("");
  const [ovhEndpoint, setOvhEndpoint] = useState("ovh-eu");

  const { data: settings = [] } = useQuery<RegistrarSetting[]>({
    queryKey: ["/api/workspaces", workspaceId, "registrar-settings"],
    queryFn: () => apiRequest("GET", `/api/workspaces/${workspaceId}/registrar-settings`).then(r => r.json()),
    enabled: !!workspaceId,
  });

  const porkbunSetting = settings.find(s => s.provider === "porkbun");
  const ovhSetting = settings.find(s => s.provider === "ovh");

  const saveMutation = useMutation({
    mutationFn: (data: Partial<RegistrarSetting> & { provider: string }) =>
      apiRequest("PUT", `/api/workspaces/${workspaceId}/registrar-settings`, data).then(r => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workspaces", workspaceId, "registrar-settings"] });
      toast({ title: "Credenziali salvate", description: "Registrar configurato correttamente." });
    },
    onError: (e: any) => toast({ title: "Errore", description: e.message, variant: "destructive" }),
  });

  function savePorkbun() {
    if (!porkbunKey || !porkbunSecret) {
      toast({ title: "Campi obbligatori", description: "Inserisci API Key e Secret Key.", variant: "destructive" });
      return;
    }
    saveMutation.mutate({ provider: "porkbun", apiKey: porkbunKey, secretKey: porkbunSecret, isEnabled: true });
    setPorkbunKey("");
    setPorkbunSecret("");
  }

  function saveOvh() {
    if (!ovhAppKey || !ovhAppSecret || !ovhConsumerKey) {
      toast({ title: "Campi obbligatori", description: "Inserisci App Key, App Secret e Consumer Key.", variant: "destructive" });
      return;
    }
    saveMutation.mutate({ provider: "ovh", ovhAppKey, ovhAppSecret, ovhConsumerKey, ovhEndpoint, isEnabled: true });
    setOvhAppKey("");
    setOvhAppSecret("");
    setOvhConsumerKey("");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Globe className="w-7 h-7 text-primary" />
        <div>
          <h1 className="text-xl font-semibold">Domain Registrar</h1>
          <p className="text-sm text-muted-foreground">
            Collega Porkbun o OVH per registrare domini direttamente dalla piattaforma.
          </p>
        </div>
      </div>

      <Tabs defaultValue="porkbun">
        <TabsList>
          <TabsTrigger value="porkbun">Porkbun</TabsTrigger>
          <TabsTrigger value="ovh">OVH</TabsTrigger>
        </TabsList>

        {/* ── PORKBUN ── */}
        <TabsContent value="porkbun" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Porkbun API</CardTitle>
                  <CardDescription>
                    Registrar americano, ottimo per domini .com/.net/.io. Prezzi competitivi.
                  </CardDescription>
                </div>
                {porkbunSetting?.isEnabled && (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle className="w-3 h-3" /> Attivo
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {porkbunSetting?.isEnabled && (
                <div className="bg-muted/50 rounded-md p-3 text-sm space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Key className="w-3.5 h-3.5" />
                    API Key: <span className="font-mono">{maskKey(porkbunSetting.apiKey)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Key className="w-3.5 h-3.5" />
                    Secret: <span className="font-mono">{maskKey(porkbunSetting.secretKey)}</span>
                  </div>
                </div>
              )}

              <div className="grid gap-3">
                <div>
                  <Label>API Key</Label>
                  <Input
                    placeholder="pk1_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    value={porkbunKey}
                    onChange={e => setPorkbunKey(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <Label>Secret API Key</Label>
                  <Input
                    type="password"
                    placeholder="sk1_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    value={porkbunSecret}
                    onChange={e => setPorkbunSecret(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={savePorkbun} disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "Salvataggio..." : "Salva credenziali"}
                </Button>
                <a
                  href="https://porkbun.com/account/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  Ottieni API Key <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="border-t pt-3 text-xs text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">Come configurare Porkbun:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Vai su porkbun.com → Account → API Access</li>
                  <li>Abilita l'accesso API per il tuo account</li>
                  <li>Copia API Key e Secret Key qui sopra</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── OVH ── */}
        <TabsContent value="ovh" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">OVH API</CardTitle>
                  <CardDescription>
                    Registrar europeo, ideale per domini .it/.fr/.eu. Pagamento con credito OVH esistente.
                  </CardDescription>
                </div>
                {ovhSetting?.isEnabled && (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle className="w-3 h-3" /> Attivo
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {ovhSetting?.isEnabled && (
                <div className="bg-muted/50 rounded-md p-3 text-sm space-y-1 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Key className="w-3.5 h-3.5" />
                    App Key: <span className="font-mono">{maskKey(ovhSetting.ovhAppKey)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Key className="w-3.5 h-3.5" />
                    Consumer Key: <span className="font-mono">{maskKey(ovhSetting.ovhConsumerKey)}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md text-sm text-amber-800 dark:text-amber-200">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                OVH richiede Consumer Key via token di autenticazione. Segui la guida qui sotto.
              </div>

              <div className="grid gap-3">
                <div>
                  <Label>Endpoint</Label>
                  <select
                    value={ovhEndpoint}
                    onChange={e => setOvhEndpoint(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                  >
                    <option value="ovh-eu">ovh-eu (Europa)</option>
                    <option value="ovh-ca">ovh-ca (Canada)</option>
                    <option value="ovh-us">ovh-us (USA)</option>
                  </select>
                </div>
                <div>
                  <Label>Application Key</Label>
                  <Input
                    placeholder="xxxxxxxxxxxxxxxx"
                    value={ovhAppKey}
                    onChange={e => setOvhAppKey(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <Label>Application Secret</Label>
                  <Input
                    type="password"
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    value={ovhAppSecret}
                    onChange={e => setOvhAppSecret(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <Label>Consumer Key</Label>
                  <Input
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    value={ovhConsumerKey}
                    onChange={e => setOvhConsumerKey(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={saveOvh} disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "Salvataggio..." : "Salva credenziali"}
                </Button>
                <a
                  href="https://eu.api.ovh.com/createToken/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  Genera token OVH <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="border-t pt-3 text-xs text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">Come configurare OVH:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Vai su eu.api.ovh.com/createToken</li>
                  <li>Crea un'applicazione con diritti: POST /order/*, POST /domain/zone/*/record</li>
                  <li>Copia App Key, App Secret e Consumer Key</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
