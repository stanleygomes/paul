import "dotenv/config";
import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { AppRouter } from "./router.js";
import { config } from "./config/environment.js";
import { Docs } from "./config/docs.js";
import { setupErrorHandler } from "./middlewares/error-handler.middleware.js";

const app: FastifyInstance = Fastify();

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
  await Docs.register(instance);

  const router = new AppRouter();
  router.register(instance, config.app.server.path);
});

export default app;
