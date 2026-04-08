import os from "node:os";
import path from "node:path";

export const CLI_HOME_DIR = path.join(os.homedir(), ".paul");
export const SESSION_FILE_PATH = path.join(CLI_HOME_DIR, "session.json");
export const SETTINGS_FILE_PATH = path.join(CLI_HOME_DIR, "settings.json");
