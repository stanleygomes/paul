import { refreshToken as refreshTokenApi } from "../../api/resources/auth";
import { getSession, saveSession } from "../../store/session-store";

export async function runTokenRefreshModule() {
  const session = await getSession();
  if (!session?.refreshToken) {
    throw new Error("No refresh token found");
  }

  const result = await refreshTokenApi(session.refreshToken);

  await saveSession({
    ...session,
    token: result.token,
    refreshToken: result.refreshToken,
  });

  return result.token;
}
