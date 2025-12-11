/**
 * Common Domain Types
 * Shared types used across multiple entities
 */

export type { IApiService } from './IApiService';

export type SortField = 'name' | 'email' | 'company' | 'city';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  searchTerm: string;
}
