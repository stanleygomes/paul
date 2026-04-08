import { sendLoginCode, verifyLoginCode } from "../../api/resources/auth";
import { askAndParse } from "../../utils/prompt";
import { runWithLoading } from "../../utils/spinner";
import { emailSchema, otpCodeSchema } from "../../validators/auth.validators";
import { saveSession } from "../../store/session-store";
import { renderInfo, renderSuccess } from "../../utils/output";
import { t } from "../../utils/i18n";

export async function runLoginModule(): Promise<void> {
  const email = await askAndParse({
    messageKey: "askEmail",
    schema: emailSchema,
  });

  const sendCodeResult = await runWithLoading(() => sendLoginCode(email));

  renderInfo(
    sendCodeResult.isRegistered
      ? await t("codeSentExisting")
      : await t("codeSentNew"),
  );

  const code = await askAndParse({
    messageKey: "askCode",
    schema: otpCodeSchema,
  });

  const verifyCodeResult = await runWithLoading(() =>
    verifyLoginCode(email, code),
  );

  await saveSession({
    token: verifyCodeResult.token,
    refreshToken: verifyCodeResult.refreshToken,
    email,
  });

  renderSuccess(await t("loginSuccess"));
}
