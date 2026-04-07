import { getSession } from "./session-store";
import { t } from "./i18n";

export async function requireSessionToken(): Promise<string> {
  const session = await getSession();

  if (!session?.token) {
    throw new Error(await t("loginRequired"));
  }

  return session.token;
}
