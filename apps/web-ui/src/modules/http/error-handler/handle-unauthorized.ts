import { httpClient } from "@paul/http";
import { handleRefreshFailure, refreshTokens } from "../../auth/token-refresh";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

export async function handleUnauthorized(originalRequest: any) {
  if (isRefreshing) {
    return waitAndRetry(originalRequest);
  }

  originalRequest._retry = true;
  isRefreshing = true;

  try {
    const newToken = await refreshTokens();
    onRefreshed(newToken);
    isRefreshing = false;
    return retryRequest(originalRequest, newToken);
  } catch (refreshError) {
    isRefreshing = false;
    handleRefreshFailure();
    return Promise.reject(refreshError);
  }
}

export function isUnauthorizedError(error: any) {
  const status = error.response?.status;
  const url = error.config?.url;
  const isRetry = error.config?._retry;

  return (
    status === 401 &&
    error.config &&
    !isRetry &&
    !url?.includes("/v1/auth/refresh-token")
  );
}

function onRefreshed(token: string) {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function waitAndRetry(originalRequest: any) {
  return new Promise((resolve) => {
    addRefreshSubscriber((token: string) => {
      resolve(retryRequest(originalRequest, token));
    });
  });
}

function retryRequest(originalRequest: any, token: string) {
  originalRequest._retry = true;

  if (originalRequest.headers) {
    originalRequest.headers["Authorization"] = `Bearer ${token}`;
  }

  return httpClient(originalRequest);
}
