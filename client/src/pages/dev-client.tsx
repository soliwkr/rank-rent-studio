import { useEffect } from "react";
import { useLocation } from "wouter";

export default function DevClient() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Auto-login for dev access
    localStorage.setItem("resto_session", JSON.stringify({
      email: "client@demo.com",
      venues: [
        { id: "venue-1", name: "La Bella Italia" },
        { id: "venue-2", name: "The Golden Dragon" },
      ]
    }));
    
    // Redirect to dashboard
    setLocation("/venue-1/today");
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to client dashboard...</p>
    </div>
  );
}
