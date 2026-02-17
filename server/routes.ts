import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertClientSchema,
  insertArticleSchema,
  insertKeywordSchema,
  insertGridResultSchema,
  insertLeadSchema,
  insertGscDataSchema,
} from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/clients", async (_req, res) => {
    const clients = await storage.getClients();
    res.json(clients);
  });

  app.get("/api/clients/:id", async (req, res) => {
    const client = await storage.getClient(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  });

  app.post("/api/clients", async (req, res) => {
    const parsed = insertClientSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: fromError(parsed.error).toString() });
    }
    const client = await storage.createClient(parsed.data);
    res.status(201).json(client);
  });

  app.get("/api/articles", async (_req, res) => {
    const articles = await storage.getArticles();
    res.json(articles);
  });

  app.post("/api/articles", async (req, res) => {
    const parsed = insertArticleSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: fromError(parsed.error).toString() });
    }
    const article = await storage.createArticle(parsed.data);
    res.status(201).json(article);
  });

  app.get("/api/keywords", async (_req, res) => {
    const keywords = await storage.getKeywords();
    res.json(keywords);
  });

  app.post("/api/keywords", async (req, res) => {
    const parsed = insertKeywordSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: fromError(parsed.error).toString() });
    }
    const keyword = await storage.createKeyword(parsed.data);
    res.status(201).json(keyword);
  });

  app.get("/api/grid-results", async (_req, res) => {
    const results = await storage.getGridResults();
    res.json(results);
  });

  app.post("/api/grid-results", async (req, res) => {
    const parsed = insertGridResultSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: fromError(parsed.error).toString() });
    }
    const result = await storage.createGridResult(parsed.data);
    res.status(201).json(result);
  });

  app.get("/api/leads", async (_req, res) => {
    const leads = await storage.getLeads();
    res.json(leads);
  });

  app.post("/api/leads", async (req, res) => {
    const parsed = insertLeadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: fromError(parsed.error).toString() });
    }
    const lead = await storage.createLead(parsed.data);
    res.status(201).json(lead);
  });

  app.get("/api/gsc-data", async (_req, res) => {
    const data = await storage.getGscData();
    res.json(data);
  });

  app.post("/api/gsc-data", async (req, res) => {
    const parsed = insertGscDataSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: fromError(parsed.error).toString() });
    }
    const data = await storage.createGscData(parsed.data);
    res.status(201).json(data);
  });

  return httpServer;
}
