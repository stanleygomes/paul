import { sessionStore } from "../../store/session.store";
import { t } from "../../utils/i18n/i18n.util";
import { renderError } from "../../utils/output.util";

export async function runTokenRefreshFailureModule() {
  await sessionStore.clear();
  renderError(await t("sessionExpired"));
  renderError(await t("loginAgain"));
}
