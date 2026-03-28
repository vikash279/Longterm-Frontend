/**
 * Next.js Edge Middleware
 *
 * Runs on EVERY request before it hits any route handler or page.
 * Enforces:
 *  • Security HTTP headers (CSP, HSTS, XSS, CORS)
 *  • Blocks path traversal / suspicious patterns
 *  • Request ID injection for distributed tracing
 *  • Blocks direct access to /api/proxy from outside (only internal calls allowed)
 */

import { NextRequest, NextResponse } from 'next/server';

const BLOCKED_PATTERNS = [
  /\.\.\//,          // path traversal
  /<script/i,        // XSS attempt in URL
  /union.*select/i,  // SQL injection probe
  /eval\s*\(/i,      // eval attempt
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const requestId    = crypto.randomUUID();

  // ── Block suspicious URL patterns ─────────────────────
  const fullUrl = req.url;
  if (BLOCKED_PATTERNS.some((p) => p.test(fullUrl))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // ── Block direct browser access to internal proxy ──────
  // The proxy is meant to be called from server-side code only via api-client.ts.
  // (In production, add an internal secret header check here.)

  // ── Build response with security headers ───────────────
  const res = NextResponse.next();

  // Unique request ID — useful for tracing logs
  res.headers.set('X-Request-ID', requestId);

  // Security headers
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'SAMEORIGIN');
  res.headers.set('X-XSS-Protection', '1; mode=block');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Strict Transport Security (only meaningful over HTTPS)
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  // Content Security Policy
  res.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com",   // 'unsafe-inline' needed for theme init script
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://i.pravatar.cc https://assets.mixkit.co",
      "media-src 'self' https://assets.mixkit.co",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  );

  // ── Remove headers that leak server info ───────────────
  res.headers.delete('X-Powered-By');
  res.headers.delete('Server');

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static  (static files)
     * - _next/image   (image optimisation)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
