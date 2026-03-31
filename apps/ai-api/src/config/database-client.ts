import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import * as schema from "../schemas/database/index.js";
import { config } from "./environment.js";
import { PinoLogger } from "./pino.logger.js";

const logger = PinoLogger.getLogger();

const client = createClient({
  url: config.database.url,
  authToken: config.database.authToken,
});

export const db = drizzle(client, { schema });

export async function runMigrations() {
  logger.info("Running database migrations...");
  await migrate(db, { migrationsFolder: config.database.migrationsFolder });
  logger.info("Database migrations completed");
}
