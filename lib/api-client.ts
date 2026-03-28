/**
 * WanderWealth API Client
 *
 * ALL external/internal API calls MUST go through this module.
 * Real upstream URLs never leave the server — the browser only ever sees /api/proxy/*.
 *
 * Usage:
 *   import { apiClient } from '@/lib/api-client';
 *   const hotels = await apiClient.get('/hotels', { city: 'Dubai' });
 *   const booking = await apiClient.post('/bookings', { hotelId: 123, dates: [...] });
 */

import { logger } from './logger';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  status: number;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  cache?: RequestCache;
  revalidate?: number;
}

// ─────────────────────────────────────────────────────────
// Core fetch wrapper
// ─────────────────────────────────────────────────────────
async function request<T>(
  method: HttpMethod,
  endpoint: string,
  body?: unknown,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { params, headers: extraHeaders, cache = 'no-store' } = options;

  // All client requests route through /api/proxy — real upstream URL stays server-side
  const isServer = typeof window === 'undefined';
  const baseUrl  = isServer
    ? (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')
    : '';

  const url = new URL(`${baseUrl}/api/proxy${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Client-Version': '1.0.0',
    ...extraHeaders,
  };

  // Add CSRF token on client (read from meta tag set by layout)
  if (!isServer && typeof document !== 'undefined') {
    const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
    if (csrf) headers['X-CSRF-Token'] = csrf;
  }

  const startTime = Date.now();

  try {
    const res = await fetch(url.toString(), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache,
    });

    const elapsed = Date.now() - startTime;
    const contentType = res.headers.get('content-type') ?? '';
    let data: T | null = null;

    if (contentType.includes('application/json')) {
      data = await res.json() as T;
    }

    if (!res.ok) {
      const errorMsg = (data as any)?.error ?? res.statusText;
      logger.warn('API request failed', { method, endpoint, status: res.status, elapsed, error: errorMsg });
      return { data: null, error: errorMsg, status: res.status };
    }

    logger.debug('API request succeeded', { method, endpoint, status: res.status, elapsed });
    return { data, error: null, status: res.status };

  } catch (err) {
    const elapsed = Date.now() - startTime;
    const message = err instanceof Error ? err.message : 'Network error';
    logger.error('API request threw', { method, endpoint, elapsed, error: message });
    return { data: null, error: message, status: 0 };
  }
}

// ─────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────
export const apiClient = {
  get:    <T>(endpoint: string, params?: Record<string, string | number | boolean>, opts?: RequestOptions) =>
            request<T>('GET', endpoint, undefined, { ...opts, params }),

  post:   <T>(endpoint: string, body?: unknown, opts?: RequestOptions) =>
            request<T>('POST', endpoint, body, opts),

  put:    <T>(endpoint: string, body?: unknown, opts?: RequestOptions) =>
            request<T>('PUT', endpoint, body, opts),

  patch:  <T>(endpoint: string, body?: unknown, opts?: RequestOptions) =>
            request<T>('PATCH', endpoint, body, opts),

  delete: <T>(endpoint: string, opts?: RequestOptions) =>
            request<T>('DELETE', endpoint, undefined, opts),
};

// ─────────────────────────────────────────────────────────
// Domain-specific typed helpers (add more as backend grows)
// ─────────────────────────────────────────────────────────
export const hotelsApi = {
  search:  (params: { destination?: string; from?: string; to?: string; guests?: number }) =>
             apiClient.get('/hotels/search', params as any),
  getById: (id: string | number) =>
             apiClient.get(`/hotels/${id}`),
};

export const bookingsApi = {
  create:    (payload: unknown) => apiClient.post('/bookings', payload),
  getStatus: (id: string)       => apiClient.get(`/bookings/${id}`),
  cancel:    (id: string)       => apiClient.delete(`/bookings/${id}`),
};

export const authApi = {
  login:    (email: string, password: string) => apiClient.post('/auth/login',    { email, password }),
  register: (payload: unknown)                => apiClient.post('/auth/register', payload),
  logout:   ()                                => apiClient.post('/auth/logout'),
  refresh:  ()                                => apiClient.post('/auth/refresh'),
};
