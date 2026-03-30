import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";

export const tasks = pgTable(
  "tasks",
  {
    id: text("id").primaryKey(),
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    done: boolean("done").notNull().default(false),
    created_at: timestamp("created_at", { mode: "date" }).notNull(),
    updated_at: timestamp("updated_at", { mode: "date" }).notNull(),
    notes: text("notes").notNull().default(""),
    important: boolean("important").notNull().default(false),
    due_date: text("due_date").notNull().default(""),
    due_time: text("due_time").notNull().default(""),
    url: text("url").notNull().default(""),
    subtasks: jsonb("subtasks").notNull().default([]),
    tags: text("tags").array().notNull().default([]),
    project_id: text("project_id").references(() => projects.id, {
      onDelete: "set null",
    }),
    is_deleted: boolean("is_deleted").notNull().default(false),
    deleted_at: timestamp("deleted_at", { mode: "date" }),
  },
  (table) => [
    index("tasks_user_id_idx").on(table.user_id),
    index("tasks_project_id_idx").on(table.project_id),
    index("tasks_user_id_is_deleted_updated_at_idx").on(
      table.user_id,
      table.is_deleted,
      table.updated_at,
    ),
  ],
);
