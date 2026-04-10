import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import Fastify, { FastifyInstance } from "fastify";
import { corsOptions } from "./config/cors.js";
import { Docs } from "./config/docs.js";
import { config } from "./config/environment.js";
import { rateLimitOptions } from "./config/rate-limit.js";
import { setupErrorHandler } from "./middlewares/error-handler.middleware.js";
import { authCookiePlugin } from "./plugins/auth-cookie.plugin.js";
import { AppRouter } from "./router.js";

const app: FastifyInstance = Fastify();

app.register(cookie);
app.register(authCookiePlugin);
app.register(rateLimit, rateLimitOptions);
app.register(cors, corsOptions);

setupErrorHandler(app);

app.register(async (instance) => {
  await Docs.register(instance);

  const router = new AppRouter();
  router.register(instance, config.app.server.path);
});

export default app;
