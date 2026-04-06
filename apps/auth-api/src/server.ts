import "dotenv/config";
import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { AppRouter } from "./router";
import { PinoLogger } from "./config/pino.logger";
import { config } from "./config/environment";
import { Docs } from "./config/docs";
import { runMigrations } from "./config/database-client";
import { setupErrorHandler } from "./middlewares/error-handler.middleware";

const app: FastifyInstance = Fastify();
const logger = PinoLogger.getLogger();

app.register(rateLimit, {
  global: true,
  max: config.app.rateLimit.max,
  timeWindow: config.app.rateLimit.timeWindow,
});

app.register(cors, {
  origin: config.app.cors.allowedOrigin,
  methods: config.app.cors.allowedMethods.split(","),
  allowedHeaders: config.app.cors.allowedHeaders.split(","),
});

setupErrorHandler(app);

app.register(async (instance) => {
  try {
    await runMigrations();
  } catch (error) {
    logger.error(error, "Migration failed");
  }

  await Docs.register(instance);

  const router = new AppRouter();
  router.register(instance, config.app.server.path);
});

export default app;
