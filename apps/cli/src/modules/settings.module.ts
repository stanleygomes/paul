import { select } from "@inquirer/prompts";
import { languageSchema } from "../validators/settings.validators";
import { languageLabel, setCurrentLanguage, t } from "../utils/i18n";
import { getSettings, saveSettings } from "../utils/settings-store";
import type { Language } from "../types/language.types";
import { renderInfo, renderSuccess } from "../utils/output";

async function askLanguage(): Promise<Language> {
  return select({
    message: "Language",
    choices: [
      { name: "English", value: "en" },
      { name: "Português", value: "pt" },
    ],
  });
}

export async function runSetLanguageModule(
  languageArg?: string,
): Promise<void> {
  const settings = await getSettings();
  const languageValue = languageArg ?? (await askLanguage());
  const language = languageSchema.parse(languageValue);

  await saveSettings({
    ...settings,
    language,
  });
  setCurrentLanguage(language);

  renderSuccess(await t("languageUpdated"));
  renderInfo(languageLabel(language));
}
