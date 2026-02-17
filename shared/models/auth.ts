import { pgTable, varchar, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    email: varchar("email"),
    firstName: varchar("first_name"),
    lastName: varchar("last_name"),
    profileImageUrl: varchar("profile_image_url"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [
    uniqueIndex("users_email_unique").on(t.email),
  ]
);

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type UpsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
