import { clearSession } from "../../store/session-store";
import { renderSuccess } from "../../utils/output";
import { t } from "../../utils/i18n";

export async function runLogoutModule(): Promise<void> {
  await clearSession();
  renderSuccess(await t("logoutSuccess"));
}
