import { sessionStore } from "../store/session.store";
import { runLoginModule } from "../modules/auth";
import { t } from "./i18n/i18n.util";
import { renderInfo } from "./output.util";

export async function requireSessionToken(): Promise<string> {
  let session = await sessionStore.get();

  if (!session?.token) {
    renderInfo(await t("loginRequired"));
    await runLoginModule();
    session = await sessionStore.get();
  }

  if (!session?.token) {
    throw new Error(await t("loginRequired"));
  }

  return session.token;
}
