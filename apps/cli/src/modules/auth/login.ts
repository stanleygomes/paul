import { createApiClient } from "../../api/api";
import { Prompt } from "../../utils/prompt.util";
import { Loader } from "../../utils/spinner.util";
import { AuthValidator } from "../../validators/auth.validators";
import { sessionStore } from "../../store/session.store";
import { Output } from "../../utils/output.util";
import { t } from "../../utils/i18n/i18n.util";

export class LoginModule {
  public static async run(): Promise<void> {
    const email = await Prompt.ask({
      messageKey: "askEmail",
      schema: AuthValidator.email,
    });

    const api = createApiClient();
    const sendCodeResult = await Loader.run(() =>
      api.auth.sendLoginCode(email),
    );

    Output.info(
      sendCodeResult.isRegistered
        ? await t("codeSentExisting")
        : await t("codeSentNew"),
    );

    const code = await Prompt.ask({
      messageKey: "askCode",
      schema: AuthValidator.otpCode,
    });

    const verifyCodeResult = await Loader.run(() =>
      api.auth.verifyLoginCode(email, code),
    );

    await sessionStore.save({
      token: verifyCodeResult.token,
      refreshToken: verifyCodeResult.refreshToken,
      email,
    });

    Output.success(await t("loginSuccess"));
  }
}
