import {
  httpClient,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "@paul/http";
import { CORE_API_URL } from "../../environment";

export class CoreHttpClient {
  public get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return httpClient.get<T>(`${CORE_API_URL}${url}`, config);
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return httpClient.post<T>(`${CORE_API_URL}${url}`, data, config);
  }

  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return httpClient.put<T>(`${CORE_API_URL}${url}`, data, config);
  }

  public patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return httpClient.patch<T>(`${CORE_API_URL}${url}`, data, config);
  }

  public delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return httpClient.delete<T>(`${CORE_API_URL}${url}`, config);
  }
}

export const coreClient = new CoreHttpClient();
