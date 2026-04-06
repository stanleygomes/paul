import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { projects } from "./projects.js";

export const tasks = pgTable(
  "tasks",
  {
    id: text("id").primaryKey(),
    user_id: text("user_id").notNull(),
    project_id: text("project_id").references(() => projects.id, {
      onDelete: "set null",
    }),
    parent_id: text("parent_id").references((): any => tasks.id, {
      onDelete: "cascade",
    }),
    title: text("title").notNull(),
    content: text("content"),
    description: text("description"),
    notes: text("notes"),
    is_completed: boolean("is_completed").default(false).notNull(),
    is_important: boolean("is_important").default(false).notNull(),
    is_pinned: boolean("is_pinned").default(false).notNull(),
    due_date: timestamp("due_date", { precision: 3 }),
    due_time: text("due_time"),
    url: text("url"),
    tags: text("tags").array(),
    completed_at: timestamp("completed_at", { precision: 3 }),
    created_at: timestamp("created_at", { precision: 3 })
      .defaultNow()
      .notNull(),
    updated_at: timestamp("updated_at", { precision: 3 })
      .defaultNow()
      .notNull(),
    is_deleted: boolean("is_deleted").default(false).notNull(),
    deleted_at: timestamp("deleted_at", { precision: 3 }),
    zen_mode: boolean("zen_mode").default(false).notNull(),
    color: text("color"),
  },
  (table) => [
    index("tasks_user_id_idx").on(table.user_id),
    index("tasks_project_id_idx").on(table.project_id),
    index("tasks_parent_id_idx").on(table.parent_id),
  ],
);
