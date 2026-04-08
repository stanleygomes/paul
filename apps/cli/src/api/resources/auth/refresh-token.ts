import { authClient } from "../../client/auth";

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export async function refreshToken(
  refreshToken: string,
): Promise<RefreshTokenResponse> {
  const response = await authClient.post<RefreshTokenResponse>(
    "/v1/auth/refresh-token",
    {
      refreshToken,
    },
  );

  return response.data;
}
