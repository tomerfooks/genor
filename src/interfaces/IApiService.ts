/**
 * API Service Interface
 * Generic contract for HTTP operations
 */
export interface IApiService {
  get<T>(endpoint: string): Promise<T>;
}
