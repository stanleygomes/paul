import { createApiClient } from "../../api/api";
import { sessionStore } from "../../store/session.store";

export class TokenRefreshModule {
  public static async run() {
    const session = await sessionStore.get();
    if (!session?.refreshToken) {
      throw new Error("No refresh token found");
    }

    const api = createApiClient();
    const result = await api.auth.refreshToken(session.refreshToken);

    await sessionStore.save({
      ...session,
      token: result.token,
      refreshToken: result.refreshToken,
    });

    return result.token;
  }
}
