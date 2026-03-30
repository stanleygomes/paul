import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const projects = pgTable(
  "projects",
  {
    id: text("id").primaryKey(),
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    color: text("color").notNull(),
    created_at: timestamp("created_at", { mode: "date" }).notNull(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull(),
    is_deleted: boolean("is_deleted").notNull().default(false),
    deleted_at: timestamp("deleted_at", { mode: "date" }),
  },
  (table) => [
    index("projects_user_id_idx").on(table.user_id),
    index("projects_user_id_is_deleted_idx").on(
      table.user_id,
      table.is_deleted,
    ),
  ],
);
