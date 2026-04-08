import type { Language } from "./language.type";

export interface CliSettings {
  language: Language;
  activeProjectId?: string;
  activeProjectName?: string;
}
