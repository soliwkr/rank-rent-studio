import { eq } from "drizzle-orm";
import { db } from "./db";
import {
  users, clients, articles, keywords, gridResults, leads, gscData,
  type User, type InsertUser,
  type Client, type InsertClient,
  type Article, type InsertArticle,
  type Keyword, type InsertKeyword,
  type GridResult, type InsertGridResult,
  type Lead, type InsertLead,
  type GscData, type InsertGscData,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;

  getArticles(): Promise<Article[]>;
  getArticlesByClient(clientId: string): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;

  getKeywords(): Promise<Keyword[]>;
  getKeywordsByClient(clientId: string): Promise<Keyword[]>;
  createKeyword(keyword: InsertKeyword): Promise<Keyword>;

  getGridResults(): Promise<GridResult[]>;
  getGridResultsByClient(clientId: string): Promise<GridResult[]>;
  createGridResult(result: InsertGridResult): Promise<GridResult>;

  getLeads(): Promise<Lead[]>;
  getLeadsByClient(clientId: string): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;

  getGscData(): Promise<GscData[]>;
  getGscDataByClient(clientId: string): Promise<GscData[]>;
  createGscData(data: InsertGscData): Promise<GscData>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getClients(): Promise<Client[]> {
    return db.select().from(clients);
  }

  async getClient(id: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client;
  }

  async createClient(client: InsertClient): Promise<Client> {
    const [result] = await db.insert(clients).values(client).returning();
    return result;
  }

  async getArticles(): Promise<Article[]> {
    return db.select().from(articles);
  }

  async getArticlesByClient(clientId: string): Promise<Article[]> {
    return db.select().from(articles).where(eq(articles.clientId, clientId));
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const [result] = await db.insert(articles).values(article).returning();
    return result;
  }

  async getKeywords(): Promise<Keyword[]> {
    return db.select().from(keywords);
  }

  async getKeywordsByClient(clientId: string): Promise<Keyword[]> {
    return db.select().from(keywords).where(eq(keywords.clientId, clientId));
  }

  async createKeyword(keyword: InsertKeyword): Promise<Keyword> {
    const [result] = await db.insert(keywords).values(keyword).returning();
    return result;
  }

  async getGridResults(): Promise<GridResult[]> {
    return db.select().from(gridResults);
  }

  async getGridResultsByClient(clientId: string): Promise<GridResult[]> {
    return db.select().from(gridResults).where(eq(gridResults.clientId, clientId));
  }

  async createGridResult(result: InsertGridResult): Promise<GridResult> {
    const [r] = await db.insert(gridResults).values(result).returning();
    return r;
  }

  async getLeads(): Promise<Lead[]> {
    return db.select().from(leads);
  }

  async getLeadsByClient(clientId: string): Promise<Lead[]> {
    return db.select().from(leads).where(eq(leads.clientId, clientId));
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [result] = await db.insert(leads).values(lead).returning();
    return result;
  }

  async getGscData(): Promise<GscData[]> {
    return db.select().from(gscData);
  }

  async getGscDataByClient(clientId: string): Promise<GscData[]> {
    return db.select().from(gscData).where(eq(gscData.clientId, clientId));
  }

  async createGscData(data: InsertGscData): Promise<GscData> {
    const [result] = await db.insert(gscData).values(data).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
