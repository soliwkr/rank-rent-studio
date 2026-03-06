import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, navigate] = useLocation();
  const { isAuthenticated, isLoading, login, isLoggingIn } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/select-workspace");
    }
  }, [isAuthenticated, isLoading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/select-workspace");
    } catch (err: any) {
      toast({
        title: "Accesso negato",
        description: err?.message || "Credenziali non valide",
        variant: "destructive",
      });
    }
  }

  if (isLoading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Accedi</CardTitle>
          <CardDescription>Inserisci le tue credenziali per continuare</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoggingIn}>
              {isLoggingIn ? "Accesso in corso..." : "Accedi"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
