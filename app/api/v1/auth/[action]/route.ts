import { NextRequest, NextResponse } from 'next/server';

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status });
}

function getAuthServiceUrl() {
  return process.env.AUTH_SERVICE_URL ?? process.env.UPSTREAM_API_URL ?? null;
}

async function proxyToAuthService(action: string, payload: unknown) {
  const authUrl = getAuthServiceUrl();
  const isDev = process.env.NODE_ENV === 'development';

  if (!authUrl) {
    const message = 'Missing AUTH_SERVICE_URL environment variable.';
    if (isDev) {
      throw new Error(message);
    }
    return json({ error: 'Authentication service unavailable' }, 503);
  }

  const url = `${authUrl.replace(/\/$/, '')}/api/v1/auth/${action}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let data: unknown = text;
  try {
    data = JSON.parse(text);
  } catch {
    // ignore parse failure
  }

  if (isDev) {
    console.log(`[AUTH PROXY] ${action} -> ${url}`, data);
  }

  return new NextResponse(text, {
    status: response.status,
    headers: { 'Content-Type': response.headers.get('content-type') ?? 'application/json' },
  });
}

async function handler(req: NextRequest, context: { params: { action: string } }) {
  const action = context.params.action;
  const body = await req.json().catch(() => null);

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  if (action === 'login' || action === 'verify-otp') {
    return proxyToAuthService(action, body);
  }

  return json({ error: 'Not found' }, 404);
}

export const POST = handler;
