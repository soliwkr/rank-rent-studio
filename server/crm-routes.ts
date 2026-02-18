import type { Express, Request, Response } from "express";
import { storage } from "./storage";
import { insertCrmContactSchema, insertCrmDealSchema, insertCrmPipelineStageSchema } from "@shared/schema";

function isSuperAdmin(req: Request): boolean {
  const session = (req as any).session;
  if (session?.adminRole === "super_admin") return true;
  const authHeader = req.headers["x-admin-role"];
  if (authHeader === "super_admin") return true;
  return false;
}

function requireSuperAdmin(req: Request, res: Response): boolean {
  if (process.env.NODE_ENV === "production" && !isSuperAdmin(req)) {
    res.status(403).json({ error: "Forbidden: super_admin required" });
    return false;
  }
  return true;
}

export function registerCrmRoutes(app: Express) {

  app.get("/api/admin/crm/contacts", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const workspaceId = req.query.workspaceId as string | undefined;
      const contacts = await storage.getCrmContacts(workspaceId);
      res.json(contacts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/crm/contacts/:id", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const contact = await storage.getCrmContact(Number(req.params.id));
      if (!contact) return res.status(404).json({ error: "Contact not found" });
      res.json(contact);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/admin/crm/contacts", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const parsed = insertCrmContactSchema.parse(req.body);
      const contact = await storage.createCrmContact(parsed);
      res.status(201).json(contact);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/admin/crm/contacts/:id", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const contact = await storage.updateCrmContact(Number(req.params.id), req.body);
      if (!contact) return res.status(404).json({ error: "Contact not found" });
      res.json(contact);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/admin/crm/contacts/:id", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const deleted = await storage.deleteCrmContact(Number(req.params.id));
      if (!deleted) return res.status(404).json({ error: "Contact not found" });
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/crm/stages", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const workspaceId = req.query.workspaceId as string | undefined;
      const stages = await storage.getCrmPipelineStages(workspaceId);
      res.json(stages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/admin/crm/stages", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const parsed = insertCrmPipelineStageSchema.parse(req.body);
      const stage = await storage.createCrmPipelineStage(parsed);
      res.status(201).json(stage);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/admin/crm/stages/:id", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const stage = await storage.updateCrmPipelineStage(Number(req.params.id), req.body);
      if (!stage) return res.status(404).json({ error: "Stage not found" });
      res.json(stage);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/admin/crm/stages/:id", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const deleted = await storage.deleteCrmPipelineStage(Number(req.params.id));
      if (!deleted) return res.status(404).json({ error: "Stage not found" });
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/crm/deals", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const workspaceId = req.query.workspaceId as string | undefined;
      const deals = await storage.getCrmDeals(workspaceId);
      res.json(deals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/crm/deals/:id", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const deal = await storage.getCrmDeal(Number(req.params.id));
      if (!deal) return res.status(404).json({ error: "Deal not found" });
      res.json(deal);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/admin/crm/deals", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const parsed = insertCrmDealSchema.parse(req.body);
      const deal = await storage.createCrmDeal(parsed);
      res.status(201).json(deal);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/admin/crm/deals/:id", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const deal = await storage.updateCrmDeal(Number(req.params.id), req.body);
      if (!deal) return res.status(404).json({ error: "Deal not found" });
      res.json(deal);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/admin/crm/deals/:id", async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;
    try {
      const deleted = await storage.deleteCrmDeal(Number(req.params.id));
      if (!deleted) return res.status(404).json({ error: "Deal not found" });
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}
