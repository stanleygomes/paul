CREATE TABLE `prompt_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`user_email` text NOT NULL,
	`prompt` text NOT NULL,
	`response` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `prompt_logs_user_id_idx` ON `prompt_logs` (`user_id`);--> statement-breakpoint
CREATE INDEX `prompt_logs_created_at_idx` ON `prompt_logs` (`created_at`);
