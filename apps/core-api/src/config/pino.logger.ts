import { Logger as AppLogger } from "@paul/node-utils";
import type { Logger as PinoLoggerType } from "pino";
import { config } from "./environment";

export class PinoLogger {
  private static instance = AppLogger.getLogger(config.logger, "auth-api");

  static getLogger(): PinoLoggerType {
    return PinoLogger.instance;
  }
}
