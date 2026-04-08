import { httpClient } from "@paul/http";
import { setupAuthInterceptor } from "../interceptors/auth.interceptor";

let initialized = false;

export function setupHttpClient() {
  if (initialized) return;
  initialized = true;

  setupAuthInterceptor(httpClient);
}
