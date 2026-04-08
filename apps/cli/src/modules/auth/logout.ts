import { sessionStore } from "../../store/session.store";
import { renderSuccess } from "../../utils/output.util";
import { t } from "../../utils/i18n/i18n.util";

export async function runLogoutModule(): Promise<void> {
  await sessionStore.clear();
  renderSuccess(await t("logoutSuccess"));
}
