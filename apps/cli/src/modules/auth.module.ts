import { input } from "@inquirer/prompts";
import ora from "ora";
import { sendLoginCode, verifyLoginCode } from "../api/auth-api";
import { emailInputSchema, otpCodeSchema } from "../validators/auth.validators";
import { saveSession } from "../utils/session-store";
import { renderInfo, renderSuccess } from "../utils/output";
import { t } from "../utils/i18n";

export async function runLoginModule(): Promise<void> {
  const rawEmail = await input({ message: await t("askEmail") });
  const email = emailInputSchema.parse({ email: rawEmail }).email;

  const sendCodeSpinner = ora(await t("loading")).start();
  const sendCodeResult = await sendLoginCode(email);
  sendCodeSpinner.succeed();

  renderInfo(
    sendCodeResult.isRegistered
      ? await t("codeSentExisting")
      : await t("codeSentNew"),
  );

  const rawCode = await input({ message: await t("askCode") });
  const code = otpCodeSchema.parse(rawCode);

  const verifyCodeSpinner = ora(await t("loading")).start();
  const verifyCodeResult = await verifyLoginCode(email, code);
  verifyCodeSpinner.succeed();

  await saveSession({
    token: verifyCodeResult.token,
    refreshToken: verifyCodeResult.refreshToken,
    email,
  });

  renderSuccess(await t("loginSuccess"));
}
