/**
 * Shared Type Definitions
 * Common interfaces and types used across the extension
 */

export interface IResult<T, E = Error> {
  success: boolean;
  data?: T;
  error?: E;
}

export interface IPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedResult<T> {
  items: T[];
  pagination: IPagination;
}

export interface IConfig {
  [key: string]: unknown;
}

export interface IEventEmitter<T> {
  on(event: string, listener: (data: T) => void): void;
  off(event: string, listener: (data: T) => void): void;
  emit(event: string, data: T): void;
}

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncFunction<T = void> = () => Promise<T>;
