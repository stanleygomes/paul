import { httpClient } from "@paul/http";
import { handleResponseError } from "./http-client-error-handler";
import { tokenStorage } from "../auth/token-storage";

let initialized = false;

export function setupHttpClient() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  httpClient.interceptors.request.use((config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  httpClient.interceptors.response.use(
    (response) => response,
    handleResponseError,
  );
}
