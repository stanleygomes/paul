import type { SessionData } from "../types/session.type";
import { SESSION_FILE_PATH } from "../utils/path.util";
import { readJsonFile, writeJsonFile } from "../utils/json-storage.util";

export class SessionStore {
  constructor(private readonly filePath: string) {}

  async get(): Promise<SessionData | null> {
    return readJsonFile<SessionData>(this.filePath);
  }

  async save(session: SessionData): Promise<void> {
    await writeJsonFile(this.filePath, session);
  }

  async clear(): Promise<void> {
    await writeJsonFile(this.filePath, null);
  }
}

export const sessionStore = new SessionStore(SESSION_FILE_PATH);
