import { clearSession } from "../../store/session-store";
import { t } from "../../utils/i18n";
import { renderError } from "../../utils/output";

export async function runTokenRefreshFailureModule() {
  await clearSession();
  renderError(await t("sessionExpired"));
  renderError(await t("loginAgain"));
}
