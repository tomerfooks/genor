import type { IHttpClient } from './IHttpClient';

/**
 * HTTP Client Error
 */
export class HttpClientError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly url?: string
  ) {
    super(message);
    this.name = 'HttpClientError';
  }
}

/**
 * Fetch-based HTTP Client Implementation
 * Uses native fetch API for HTTP operations
 */
export class FetchHttpClient implements IHttpClient {
  constructor(private readonly baseUrl: string) {}

  async get<T>(url: string): Promise<T> {
    return this.request<T>('GET', url);
  }

  async post<T, B>(url: string, body: B): Promise<T> {
    return this.request<T>('POST', url, body);
  }

  async put<T, B>(url: string, body: B): Promise<T> {
    return this.request<T>('PUT', url, body);
  }

  async patch<T, B>(url: string, body: B): Promise<T> {
    return this.request<T>('PATCH', url, body);
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>('DELETE', url);
  }

  private async request<T>(
    method: string,
    url: string,
    body?: unknown
  ): Promise<T> {
    const fullUrl = `${this.baseUrl}${url}`;

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new HttpClientError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          fullUrl
        );
      }

      return response.json() as Promise<T>;
    } catch (error) {
      if (error instanceof HttpClientError) {
        throw error;
      }
      throw new HttpClientError(
        `Failed to fetch ${fullUrl}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        fullUrl
      );
    }
  }
}
