import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "../schemas/database/index.js";
import { config } from "./environment.js";
import { PinoLogger } from "./pino.logger.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const isDevelopment = config.app.env === "development";

const pool = new Pool({
  connectionString: config.database.url,
  ssl: isDevelopment ? false : { rejectUnauthorized: false },
});

export const db = drizzle(pool, { schema });

const logger = PinoLogger.getLogger();

export async function runMigrations() {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const migrationsPath = join(currentDir, "../database/migrations");

  logger.info(`Running database migrations from ${migrationsPath}...`);
  await migrate(db, {
    migrationsFolder: migrationsPath,
    migrationsTable: "__drizzle_migrations",
    migrationsSchema: "public",
  });
  logger.info("Database migrations completed");
}
