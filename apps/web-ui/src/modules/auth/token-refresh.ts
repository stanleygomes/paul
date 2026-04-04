import { authService } from "./auth-api.service";

export async function refreshTokens() {
  const refreshTokenStr = localStorage.getItem("app-refresh-token");
  if (!refreshTokenStr) {
    throw new Error("No refresh token found");
  }

  const parsedRefreshToken = JSON.parse(refreshTokenStr);
  const result = await authService.refreshToken(parsedRefreshToken);

  localStorage.setItem("app-token", JSON.stringify(result.token));
  localStorage.setItem(
    "app-refresh-token",
    JSON.stringify(result.refreshToken),
  );

  window.dispatchEvent(new Event("storage"));

  return result.token;
}

export function handleRefreshFailure() {
  localStorage.removeItem("app-token");
  localStorage.removeItem("app-refresh-token");
  window.dispatchEvent(new Event("storage"));
  window.location.href = "/login";
}
