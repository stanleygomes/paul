CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp
);

CREATE TABLE "tasks" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"content" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"important" boolean DEFAULT false NOT NULL,
	"due_date" text DEFAULT '' NOT NULL,
	"due_time" text DEFAULT '' NOT NULL,
	"url" text DEFAULT '' NOT NULL,
	"subtasks" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"project_id" text,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp
);

ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;

CREATE INDEX "projects_user_id_idx" ON "projects" USING btree ("user_id");

CREATE INDEX "projects_user_id_is_deleted_idx" ON "projects" USING btree ("user_id","is_deleted");

CREATE INDEX "tasks_user_id_idx" ON "tasks" USING btree ("user_id");

CREATE INDEX "tasks_project_id_idx" ON "tasks" USING btree ("project_id");

CREATE INDEX "tasks_user_id_is_deleted_updated_at_idx" ON "tasks" USING btree ("user_id","is_deleted","updated_at");
