import type { Language } from "../../types/language.type";
import { settingsStore } from "../../store/settings.store";

import { en } from "./locales/en";
import { pt } from "./locales/pt";

const dictionary = {
  en,
  pt,
} as const;

export const LANGUAGE_CHOICES = [
  { name: "English", value: "en" },
  { name: "Português", value: "pt" },
] as const;

export type DictionaryKey = keyof (typeof dictionary)["en"];
let currentLanguage: Language | null = null;

export async function initializeI18n(): Promise<void> {
  if (!currentLanguage) {
    const settings = await settingsStore.get();
    currentLanguage = settings.language;
  }
}

export async function t(key: DictionaryKey): Promise<string> {
  await initializeI18n();
  const language = currentLanguage ?? "en";
  return dictionary[language][key];
}

export function setCurrentLanguage(language: Language): void {
  currentLanguage = language;
}

export function languageLabel(language: Language): string {
  return language === "pt" ? "Português" : "English";
}
