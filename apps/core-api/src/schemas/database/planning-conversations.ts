import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const planning_conversations = pgTable("planning_conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(),
  title: text("title").notNull().default(""),
  status: text("status").notNull().default("active"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
