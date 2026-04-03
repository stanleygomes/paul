import { httpClient } from "@paul/http";
import { authService } from "./auth-api.service";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

let initialized = false;

export function setupHttpClient() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;
      const status = error.response?.status;
      const originalRequest = config;

      if (
        status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !originalRequest.url?.includes("/v1/auth/refresh-token")
      ) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            addRefreshSubscriber((token: string) => {
              originalRequest._retry = true;
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(httpClient(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem("done-refresh-token");
        if (!refreshToken) {
          isRefreshing = false;
          return Promise.reject(error);
        }

        try {
          const parsedRefreshToken = JSON.parse(refreshToken);
          const result = await authService.refreshToken(parsedRefreshToken);

          localStorage.setItem("done-token", JSON.stringify(result.token));
          localStorage.setItem(
            "done-refresh-token",
            JSON.stringify(result.refreshToken),
          );

          window.dispatchEvent(new Event("storage"));

          onRefreshed(result.token);
          isRefreshing = false;

          originalRequest.headers.Authorization = `Bearer ${result.token}`;
          return httpClient(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          localStorage.removeItem("done-token");
          localStorage.removeItem("done-refresh-token");
          window.dispatchEvent(new Event("storage"));
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
}
