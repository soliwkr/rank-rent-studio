import { useEffect } from "react";
import { useLocation } from "wouter";

export default function DevClient() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Auto-login for dev access
    localStorage.setItem("indexflow_session", JSON.stringify({
      email: "client@demo.com",
      workspaces: [
        { id: "apex-digital-agency", name: "Apex Digital Agency" },
        { id: "jake-morrison-seo", name: "Jake Morrison SEO" },
      ]
    }));
    
    setLocation("/apex-digital-agency/today");
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to client dashboard...</p>
    </div>
  );
}
