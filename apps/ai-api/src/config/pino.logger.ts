import { Logger } from "@done/node-utils";
import { config } from "./environment.js";

export class PinoLogger {
  private static instance = Logger.getLogger(config.logger, "core-ai-api");

  static getLogger() {
    return PinoLogger.instance;
  }
}
