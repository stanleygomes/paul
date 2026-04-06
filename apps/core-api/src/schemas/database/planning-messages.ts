import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { planning_conversations } from "./planning-conversations";

export const planning_messages = pgTable("planning_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversation_id: uuid("conversation_id")
    .references(() => planning_conversations.id, { onDelete: "cascade" })
    .notNull(),
  role: text("role", { enum: ["user", "assistant"] }).notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
