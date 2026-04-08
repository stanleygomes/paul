import { httpClient } from "@paul/http";
import { AuthInterceptor } from "../interceptors/auth.interceptor";

export class HttpManager {
  private static initialized = false;

  public static setup(): void {
    if (HttpManager.initialized) return;
    HttpManager.initialized = true;

    const authInterceptor = new AuthInterceptor(httpClient);
    authInterceptor.setup();
  }
}
