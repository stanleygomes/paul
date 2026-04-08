import { sessionStore } from "../../store/session.store";
import { Output } from "../../utils/output.util";
import { t } from "../../utils/i18n/i18n.util";

export class LogoutModule {
  public static async run(): Promise<void> {
    await sessionStore.clear();
    Output.success(await t("logoutSuccess"));
  }
}
