import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialProviders = [
  { id: "openai", name: "OpenAI", models: ["GPT-4o", "GPT-4", "GPT-3.5 Turbo"], connected: true, lastTested: "2026-02-18" },
  { id: "grok", name: "Grok", models: ["Grok-2", "Grok-1"], connected: false, lastTested: null },
  { id: "anthropic", name: "Anthropic", models: ["Claude 3.5 Sonnet", "Claude 3 Opus", "Claude 3 Haiku"], connected: true, lastTested: "2026-02-17" },
  { id: "google", name: "Google AI", models: ["Gemini Pro", "Gemini Ultra"], connected: false, lastTested: null },
  { id: "mistral", name: "Mistral", models: ["Mistral Large", "Mistral Medium"], connected: false, lastTested: null },
  { id: "cohere", name: "Cohere", models: ["Command R+", "Command R"], connected: false, lastTested: null },
  { id: "perplexity", name: "Perplexity", models: ["Sonar Pro", "Sonar"], connected: false, lastTested: null },
];

export default function ConnectionsAi() {
  const { toast } = useToast();
  const [providers] = useState(initialProviders);

  const handleSave = (providerName: string) => {
    toast({ title: "Settings Saved", description: `${providerName} configuration has been saved.` });
  };

  const handleTest = (providerName: string) => {
    toast({ title: "Connection Test", description: `Testing ${providerName} connection... Success!` });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">AI Providers (BYOK)</h1>

      <Card>
        <CardContent className="p-4 flex items-center gap-3">
          <Info className="w-5 h-5 text-muted-foreground shrink-0" />
          <p className="text-sm text-muted-foreground" data-testid="text-note">Using platform defaults if no key provided</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {providers.map((p) => (
          <Card key={p.id} data-testid={`card-provider-${p.id}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <CardTitle className="text-base">{p.name}</CardTitle>
              <Badge variant={p.connected ? "default" : "secondary"} data-testid={`badge-provider-status-${p.id}`}>
                {p.connected ? "Connected" : "Not Connected"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input
                  type="password"
                  placeholder={`Enter ${p.name} API key`}
                  defaultValue={p.connected ? "sk-••••••••••••••••" : ""}
                  data-testid={`input-api-key-${p.id}`}
                />
              </div>

              {p.models.length > 0 && (
                <div className="space-y-2">
                  <Label>Model</Label>
                  <Select defaultValue={p.models[0]}>
                    <SelectTrigger data-testid={`select-model-${p.id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {p.models.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center gap-2 flex-wrap">
                <Button size="sm" data-testid={`button-save-${p.id}`} onClick={() => handleSave(p.name)}>Save</Button>
                <Button variant="outline" size="sm" data-testid={`button-test-${p.id}`} onClick={() => handleTest(p.name)}>Test</Button>
              </div>

              {p.lastTested && (
                <p className="text-xs text-muted-foreground">Last tested: {p.lastTested}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
