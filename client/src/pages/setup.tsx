import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Setup() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [form, setForm] = useState({ email: "", password: "", firstName: "", lastName: "" });

  const registerMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/auth/register", form).then((r) => r.json()),
    onSuccess: () => navigate("/select-workspace"),
    onError: (e: any) =>
      toast({ title: "Errore", description: e.message, variant: "destructive" }),
  });

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Crea account admin</CardTitle>
          <CardDescription>Prima configurazione — nessun utente presente</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => { e.preventDefault(); registerMutation.mutate(); }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Nome</Label>
                <Input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Cognome</Label>
                <Input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Password</Label>
              <Input type="password" required minLength={8} value={form.password} onChange={(e) => set("password", e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? "Creazione..." : "Crea account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
