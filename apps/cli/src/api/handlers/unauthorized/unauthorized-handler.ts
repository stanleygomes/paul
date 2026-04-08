import type { AxiosInstance } from "axios";
import {
  runTokenRefreshFailureModule,
  runTokenRefreshModule,
} from "../../../modules/auth";

import { retryRequest } from "../../config/retry-request";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

export async function handleUnauthorized(
  httpClient: AxiosInstance,
  originalRequest: any,
) {
  if (isRefreshing) {
    return new Promise((resolve) => {
      addRefreshSubscriber((token: string) => {
        resolve(retryRequest(httpClient, originalRequest, token));
      });
    });
  }

  originalRequest._retry = true;
  isRefreshing = true;

  try {
    const newToken = await runTokenRefreshModule();
    onRefreshed(newToken);
    isRefreshing = false;
    return retryRequest(httpClient, originalRequest, newToken);
  } catch (error) {
    isRefreshing = false;
    await runTokenRefreshFailureModule();
    return Promise.reject(error);
  }
}
