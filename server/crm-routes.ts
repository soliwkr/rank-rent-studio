import type { Express, Request, Response } from "express";
import { storage } from "./storage";
import { insertCrmContactSchema, insertCrmDealSchema, insertCrmPipelineStageSchema } from "@shared/schema";

export function registerCrmRoutes(app: Express) {

  app.get("/api/crm/contacts", async (req, res) => {
    try {
      const workspaceId = req.query.workspaceId as string | undefined;
      const contacts = await storage.getCrmContacts(workspaceId);
      res.json(contacts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/crm/contacts/:id", async (req, res) => {
    try {
      const contact = await storage.getCrmContact(Number(req.params.id));
      if (!contact) return res.status(404).json({ error: "Contact not found" });
      res.json(contact);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/crm/contacts", async (req, res) => {
    try {
      const parsed = insertCrmContactSchema.parse(req.body);
      const contact = await storage.createCrmContact(parsed);
      res.status(201).json(contact);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/crm/contacts/:id", async (req, res) => {
    try {
      const contact = await storage.updateCrmContact(Number(req.params.id), req.body);
      if (!contact) return res.status(404).json({ error: "Contact not found" });
      res.json(contact);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/crm/contacts/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteCrmContact(Number(req.params.id));
      if (!deleted) return res.status(404).json({ error: "Contact not found" });
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/crm/stages", async (req, res) => {
    try {
      const workspaceId = req.query.workspaceId as string | undefined;
      const stages = await storage.getCrmPipelineStages(workspaceId);
      res.json(stages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/crm/stages", async (req, res) => {
    try {
      const parsed = insertCrmPipelineStageSchema.parse(req.body);
      const stage = await storage.createCrmPipelineStage(parsed);
      res.status(201).json(stage);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/crm/stages/:id", async (req, res) => {
    try {
      const stage = await storage.updateCrmPipelineStage(Number(req.params.id), req.body);
      if (!stage) return res.status(404).json({ error: "Stage not found" });
      res.json(stage);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/crm/stages/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteCrmPipelineStage(Number(req.params.id));
      if (!deleted) return res.status(404).json({ error: "Stage not found" });
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/crm/deals", async (req, res) => {
    try {
      const workspaceId = req.query.workspaceId as string | undefined;
      const deals = await storage.getCrmDeals(workspaceId);
      res.json(deals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/crm/deals/:id", async (req, res) => {
    try {
      const deal = await storage.getCrmDeal(Number(req.params.id));
      if (!deal) return res.status(404).json({ error: "Deal not found" });
      res.json(deal);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/crm/deals", async (req, res) => {
    try {
      const parsed = insertCrmDealSchema.parse(req.body);
      const deal = await storage.createCrmDeal(parsed);
      res.status(201).json(deal);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/crm/deals/:id", async (req, res) => {
    try {
      const deal = await storage.updateCrmDeal(Number(req.params.id), req.body);
      if (!deal) return res.status(404).json({ error: "Deal not found" });
      res.json(deal);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/crm/deals/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteCrmDeal(Number(req.params.id));
      if (!deleted) return res.status(404).json({ error: "Deal not found" });
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}
