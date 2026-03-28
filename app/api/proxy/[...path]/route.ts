/**
 * /api/proxy/[...path]
 *
 * API Gateway — proxies all browser requests to the real upstream API.
 * The upstream URL (UPSTREAM_API_URL) lives only in server environment variables
 * and is never exposed to the browser's network tab.
 *
 * Currently returns 503 "not configured" until UPSTREAM_API_URL is set.
 * Wire up your real backend by setting the env var in .env.local.
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

const UPSTREAM_BASE   = process.env.UPSTREAM_API_URL ?? '';
const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET ?? '';

// Headers we strip before forwarding to upstream
const STRIP_REQUEST_HEADERS = new Set([
  'host', 'x-forwarded-for', 'x-real-ip', 'cookie', 'authorization',
]);

// Headers we strip before returning to the browser
const STRIP_RESPONSE_HEADERS = new Set([
  'x-powered-by', 'server', 'x-aspnet-version',
]);

function getIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

async function handler(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  const path   = '/' + (params.path ?? []).join('/');
  const ip     = getIp(req);
  const start  = Date.now();

  // Not yet configured — return a clear message instead of crashing
  if (!UPSTREAM_BASE) {
    logger.warn('Proxy called but UPSTREAM_API_URL not set', { path, ip });
    return NextResponse.json(
      { error: 'API backend not configured. Set UPSTREAM_API_URL in .env.local.' },
      { status: 503 }
    );
  }

  // Build upstream URL
  const upstreamUrl = new URL(`${UPSTREAM_BASE}${path}`);
  req.nextUrl.searchParams.forEach((v, k) => upstreamUrl.searchParams.set(k, v));

  // Forward safe headers
  const forwardHeaders = new Headers();
  req.headers.forEach((value, key) => {
    if (!STRIP_REQUEST_HEADERS.has(key.toLowerCase())) {
      forwardHeaders.set(key, value);
    }
  });
  if (INTERNAL_SECRET) forwardHeaders.set('X-API-Key', INTERNAL_SECRET);
  forwardHeaders.set('X-Request-ID', crypto.randomUUID());

  let body: string | undefined;
  if (!['GET', 'HEAD'].includes(req.method)) {
    try { body = await req.text(); } catch { /* ignore */ }
  }

  let upstream: Response;
  try {
    upstream = await fetch(upstreamUrl.toString(), {
      method: req.method,
      headers: forwardHeaders,
      body,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Upstream unreachable';
    logger.error('Proxy upstream fetch failed', { path, ip, error: msg });
    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
  }

  const elapsed = Date.now() - start;
  const logLevel = upstream.status >= 500 ? 'error' : upstream.status >= 400 ? 'warn' : 'info';
  logger[logLevel]('Proxy request', { ip, method: req.method, path, status: upstream.status, elapsed });

  // Clean response headers
  const resHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    if (!STRIP_RESPONSE_HEADERS.has(key.toLowerCase())) resHeaders.set(key, value);
  });
  resHeaders.set('X-Content-Type-Options', 'nosniff');

  return new NextResponse(await upstream.text(), {
    status: upstream.status,
    headers: resHeaders,
  });
}

export const GET    = handler;
export const POST   = handler;
export const PUT    = handler;
export const PATCH  = handler;
export const DELETE = handler;
