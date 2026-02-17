import type { Express, RequestHandler } from "express";

export function setupAuth(app: Express): void {
  // Auth middleware placeholder - no-op in development
}

export function registerAuthRoutes(app: Express): void {
  app.get("/api/auth/session", (req, res) => {
    res.json({ authenticated: false, user: null });
  });

  app.post("/api/auth/login", (req, res) => {
    res.json({ success: true, message: "Login endpoint ready" });
  });

  app.post("/api/auth/logout", (req, res) => {
    res.json({ success: true });
  });
}
