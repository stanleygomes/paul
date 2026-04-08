import { createApiClient } from "../../api/api";
import { askAndParse } from "../../utils/prompt";
import { runWithLoading } from "../../utils/spinner";
import { AuthValidator } from "../../validators/auth.validators";
import { sessionStore } from "../../store/session-store";
import { renderInfo, renderSuccess } from "../../utils/output";
import { t } from "../../utils/i18n";

export async function runLoginModule(): Promise<void> {
  const email = await askAndParse({
    messageKey: "askEmail",
    schema: AuthValidator.email,
  });

  const api = createApiClient();
  const sendCodeResult = await runWithLoading(() =>
    api.auth.sendLoginCode(email),
  );

  renderInfo(
    sendCodeResult.isRegistered
      ? await t("codeSentExisting")
      : await t("codeSentNew"),
  );

  const code = await askAndParse({
    messageKey: "askCode",
    schema: AuthValidator.otpCode,
  });

  const verifyCodeResult = await runWithLoading(() =>
    api.auth.verifyLoginCode(email, code),
  );

  await sessionStore.save({
    token: verifyCodeResult.token,
    refreshToken: verifyCodeResult.refreshToken,
    email,
  });

  renderSuccess(await t("loginSuccess"));
}
