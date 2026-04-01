import { Logger as PinoLoggerInstance } from "pino";

import { Logger } from "@paul/node-utils";
import { config } from "./environment.js";

export class PinoLogger {
  private static instance = Logger.getLogger(config.logger, "core-ai-api");

  static getLogger(): PinoLoggerInstance {
    return PinoLogger.instance;
  }
}
