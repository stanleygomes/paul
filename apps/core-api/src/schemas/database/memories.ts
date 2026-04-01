import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";

export const memories = pgTable(
  "memories",
  {
    id: text("id").primaryKey(),
    user_id: text("user_id").notNull(),
    content: text("content").notNull(),
    color: text("color"),
    created_at: timestamp("created_at", { mode: "date" }).notNull(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull(),
  },
  (table) => [
    index("memories_user_id_idx").on(table.user_id),
    index("memories_user_id_updated_at_idx").on(
      table.user_id,
      table.updated_at,
    ),
  ],
);
