import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"),
});

export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  domain: text("domain").notNull(),
  industry: text("industry"),
  status: text("status").notNull().default("active"),
  articlesPublished: integer("articles_published").notNull().default(0),
  keywordsTracked: integer("keywords_tracked").notNull().default(0),
  leadsGenerated: integer("leads_generated").notNull().default(0),
  avgPosition: real("avg_position"),
  logoUrl: text("logo_url"),
});

export const articles = pgTable("articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  targetKeyword: text("target_keyword").notNull(),
  status: text("status").notNull().default("draft"),
  wordCount: integer("word_count"),
  publishedAt: timestamp("published_at"),
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  position: real("position"),
});

export const keywords = pgTable("keywords", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull(),
  keyword: text("keyword").notNull(),
  currentPosition: real("current_position"),
  previousPosition: real("previous_position"),
  searchVolume: integer("search_volume"),
  difficulty: integer("difficulty"),
  url: text("url"),
  trend: text("trend").default("stable"),
});

export const gridResults = pgTable("grid_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull(),
  keyword: text("keyword").notNull(),
  location: text("location").notNull(),
  gridData: jsonb("grid_data").notNull(),
  avgRank: real("avg_rank"),
  visibility: real("visibility"),
  checkedAt: timestamp("checked_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  source: text("source").notNull(),
  landingPage: text("landing_page"),
  keyword: text("keyword"),
  status: text("status").notNull().default("new"),
  bookedAt: timestamp("booked_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const gscData = pgTable("gsc_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull(),
  date: text("date").notNull(),
  query: text("query").notNull(),
  page: text("page"),
  clicks: integer("clicks").default(0),
  impressions: integer("impressions").default(0),
  ctr: real("ctr"),
  position: real("position"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
export const insertClientSchema = createInsertSchema(clients).omit({ id: true });
export const insertArticleSchema = createInsertSchema(articles).omit({ id: true });
export const insertKeywordSchema = createInsertSchema(keywords).omit({ id: true });
export const insertGridResultSchema = createInsertSchema(gridResults).omit({ id: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true });
export const insertGscDataSchema = createInsertSchema(gscData).omit({ id: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;
export type InsertKeyword = z.infer<typeof insertKeywordSchema>;
export type Keyword = typeof keywords.$inferSelect;
export type InsertGridResult = z.infer<typeof insertGridResultSchema>;
export type GridResult = typeof gridResults.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertGscData = z.infer<typeof insertGscDataSchema>;
export type GscData = typeof gscData.$inferSelect;
