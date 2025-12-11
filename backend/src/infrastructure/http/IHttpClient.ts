/**
 * HTTP Client Interface
 * Abstraction for HTTP operations
 */
export interface IHttpClient {
  get<T>(url: string): Promise<T>;
  post<T, B>(url: string, body: B): Promise<T>;
  put<T, B>(url: string, body: B): Promise<T>;
  patch<T, B>(url: string, body: B): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
