import { createApiClient } from "../../api";
import { getSession, saveSession } from "../../store/session-store";

export async function runTokenRefreshModule() {
  const session = await getSession();
  if (!session?.refreshToken) {
    throw new Error("No refresh token found");
  }

  const api = createApiClient();
  const result = await api.auth.refreshToken(session.refreshToken);

  await saveSession({
    ...session,
    token: result.token,
    refreshToken: result.refreshToken,
  });

  return result.token;
}
