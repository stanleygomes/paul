import { SettingsValidator } from "../../validators/settings.validators";
import { I18n, t } from "../../utils/i18n/i18n.util";
import { settingsStore } from "../../store/settings.store";
import { Output } from "../../utils/output.util";
import { AskLanguageModule } from "./ask-language.module";

export class SetLanguageModule {
  public static async run(languageArg?: string): Promise<void> {
    const settings = await settingsStore.get();
    const languageValue = languageArg ?? (await AskLanguageModule.run());
    const language = SettingsValidator.language.parse(languageValue);

    await settingsStore.save({
      ...settings,
      language,
    });
    I18n.setLanguage(language);

    Output.success(await t("languageUpdated"));
    Output.info(I18n.getLabel(language));
  }
}
