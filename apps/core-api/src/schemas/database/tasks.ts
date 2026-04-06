import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const tasks = pgTable(
  "tasks",
  {
    id: text("id").primaryKey(),
    user_id: text("user_id").notNull(),
    content: text("content").notNull(),
    title: text("title").default("").notNull(),
    done: boolean("done").default(false).notNull(),
    created_at: timestamp("created_at", { precision: 3 }).notNull(),
    updated_at: timestamp("updated_at", { precision: 3 }).notNull(),
    notes: text("notes").default("").notNull(),
    important: boolean("important").default(false).notNull(),
    due_date: text("due_date").default("").notNull(),
    due_time: text("due_time").default("").notNull(),
    url: text("url").default("").notNull(),
    tags: text("tags").array().default([]).notNull(),
    project_id: text("project_id").references(() => projects.id, {
      onDelete: "set null",
    }),
    parent_id: text("parent_id").references((): any => tasks.id, {
      onDelete: "cascade",
    }),
    is_deleted: boolean("is_deleted").default(false).notNull(),
    deleted_at: timestamp("deleted_at", { precision: 3 }),
    is_pinned: boolean("is_pinned").default(false).notNull(),
    color: text("color"),
  },
  (table) => [
    index("tasks_user_id_idx").on(table.user_id),
    index("tasks_project_id_idx").on(table.project_id),
    index("tasks_parent_id_idx").on(table.parent_id),
    index("tasks_user_id_is_deleted_updated_at_idx").on(
      table.user_id,
      table.is_deleted,
      table.updated_at,
    ),
  ],
);
