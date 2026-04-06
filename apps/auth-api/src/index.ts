import app from "./server";
import { config } from "./config/environment";
import { PinoLogger } from "./config/pino.logger";

const logger = PinoLogger.getLogger();

const start = async () => {
  try {
    const port = config.app.server.port ? Number(config.app.server.port) : 5000;
    const { url, path } = config.app.server;
    const { path: pathDocs } = config.app.docs;

    const address = await app.listen({
      port,
      host: "0.0.0.0",
    });

    logger.info(`Fastify server running on ${address}${path}`);
    logger.info(`Swagger docs available at ${url}:${port}${pathDocs}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

start();
