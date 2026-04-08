import type { SessionData } from "../types/session.types";
import { SESSION_FILE_PATH } from "../utils/path-utils";
import { readJsonFile, writeJsonFile } from "../utils/json-storage";

export async function getSession(): Promise<SessionData | null> {
  return readJsonFile<SessionData>(SESSION_FILE_PATH);
}

export async function saveSession(session: SessionData): Promise<void> {
  await writeJsonFile(SESSION_FILE_PATH, session);
}

export async function clearSession(): Promise<void> {
  await writeJsonFile(SESSION_FILE_PATH, null);
}
