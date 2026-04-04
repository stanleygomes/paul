import { httpClient } from "@paul/http";
import { handleResponseError } from "./http-client-error-handler";

let initialized = false;

export function setupHttpClient() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  httpClient.interceptors.response.use(
    (response) => response,
    handleResponseError,
  );
}
