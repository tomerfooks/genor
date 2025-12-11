import type { IApiService } from '@/domain';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * API Error class for handling HTTP errors
 */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * HTTP API Service Implementation
 * Implements IApiService interface
 * Single Responsibility: Only handles HTTP communication
 */
class HttpApiService implements IApiService {
  constructor(private baseUrl: string) {}

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }
}

// Export singleton instance (can be replaced for testing)
export const apiService: IApiService = new HttpApiService(API_BASE_URL);
