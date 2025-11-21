import type { ArrayResponse, StandardResponse } from "./types.js";

import { getMetadata } from "./loaders.js";

/**
 * Create a standard array response
 *
 * @example
 * ```typescript
 * return createArrayResponse(results);
 * // Returns: { _meta: {...}, count: 5, data: [...] }
 *
 * return createArrayResponse(results, { query: "button" });
 * // Returns: { _meta: {...}, count: 5, data: [...], query: "button" }
 * ```
 */
export function createArrayResponse<T>(
  data: T[],
  options?: {
    /** Optional count override (defaults to data.length) */
    count?: number;
    /** Optional search query that produced these results */
    query?: string;
  },
): ArrayResponse<T> {
  const response: ArrayResponse<T> = {
    _meta: getMetadata(),
    count: options?.count ?? data.length,
    data,
  };

  if (options?.query !== undefined) {
    response.query = options.query;
  }

  return response;
}

/**
 * Create a standard single-item response
 *
 * @example
 * ```typescript
 * return createResponse(component);
 * // Returns: { _meta: {...}, data: component }
 * ```
 */
export function createResponse<T>(data: T): StandardResponse<T> {
  return {
    _meta: getMetadata(),
    data,
  };
}
