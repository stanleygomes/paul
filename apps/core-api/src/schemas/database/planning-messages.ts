import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { planning_conversations } from "./planning-conversations";

export const planning_messages = pgTable("planning_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversation_id: uuid("conversation_id")
    .notNull()
    .references(() => planning_conversations.id, { onDelete: "cascade" }),
  user_id: text("user_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
