/**
 * /api/proxy/[...path]
 *
 * API Gateway — proxies all browser requests to the real upstream API.
 * The upstream URL (UPSTREAM_API_URL) lives only in server environment variables
 * and is never exposed to the browser's network tab.
 *
 * If no upstream URL is set, this handler returns a local stub API
 * for hotels, bookings, and auth so the frontend can run without
 * an external backend.
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import hotelsData from '@/data/hotels.json';

const UPSTREAM_BASE   = process.env.UPSTREAM_API_URL ?? 'http://52.63.164.194';
const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET ?? '';

// Headers we strip before forwarding to upstream
const STRIP_REQUEST_HEADERS = new Set([
  'host', 'x-forwarded-for', 'x-real-ip', 'cookie', 'authorization',
]);

// Headers we strip before returning to the browser
const STRIP_RESPONSE_HEADERS = new Set([
  'x-powered-by', 'server', 'x-aspnet-version',
]);

interface Hotel {
  id: number;
  name: string;
  city: string;
  price: number;
  rating: number;
  image: string;
}

type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

interface Booking {
  id: string;
  hotelId: number;
  hotelName: string;
  userEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: BookingStatus;
  createdAt: string;
}

interface User {
  email: string;
  password: string;
  name: string;
}

const hotels = hotelsData as Hotel[];
const users: User[] = [
  { email: 'demo@wanderwealth.com', password: 'Password123!', name: 'Demo Traveler' },
];
const bookings: Booking[] = [];

function getIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

function buildResponse(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function makeBookingId() {
  return `BKG-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function findHotel(id: string | number) {
  return hotels.find((hotel) => hotel.id === Number(id));
}

async function handleLocalAPI(req: NextRequest, path: string[], url: URL) {
  const method = req.method;
  const [resource, id] = path;

  if (resource === 'hotels') {
    if (method === 'GET' && path.length === 2 && id === 'search') {
      const destination = url.searchParams.get('destination')?.toLowerCase();
      const city = url.searchParams.get('city')?.toLowerCase();
      const results = hotels.filter((hotel) => {
        if (destination && !hotel.city.toLowerCase().includes(destination)) return false;
        if (city && !hotel.city.toLowerCase().includes(city)) return false;
        return true;
      });
      return buildResponse({ hotels: results });
    }

    if (method === 'GET' && path.length === 1) {
      return buildResponse({ hotels });
    }

    if (method === 'GET' && path.length === 2) {
      const hotel = findHotel(id);
      return hotel ? buildResponse(hotel) : buildResponse({ error: 'Hotel not found' }, 404);
    }
  }

  if (resource === 'bookings') {
    if (method === 'POST' && path.length === 1) {
      const body = await req.json().catch(() => null);
      if (!body || !body.hotelId || !body.checkIn || !body.checkOut || !body.userEmail) {
        return buildResponse({ error: 'Invalid booking payload' }, 400);
      }
      const hotel = findHotel(body.hotelId);
      if (!hotel) return buildResponse({ error: 'Hotel not found' }, 404);

      const booking: Booking = {
        id: makeBookingId(),
        hotelId: hotel.id,
        hotelName: hotel.name,
        userEmail: String(body.userEmail),
        checkIn: String(body.checkIn),
        checkOut: String(body.checkOut),
        guests: Number(body.guests ?? 1),
        total: hotel.price * (Number(body.guests ?? 1) || 1),
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      bookings.push(booking);
      return buildResponse({ booking }, 201);
    }

    if (method === 'GET' && path.length === 2) {
      const booking = bookings.find((item) => item.id === id);
      return booking ? buildResponse(booking) : buildResponse({ error: 'Booking not found' }, 404);
    }

    if (method === 'DELETE' && path.length === 2) {
      const booking = bookings.find((item) => item.id === id);
      if (!booking) return buildResponse({ error: 'Booking not found' }, 404);
      booking.status = 'cancelled';
      return buildResponse({ ok: true, booking });
    }
  }

  if (resource === 'auth') {
    if (method === 'POST' && path.length === 2) {
      const action = id;
      const body = await req.json().catch(() => null);
      if (action === 'login') {
        if (!body?.email || !body?.password) return buildResponse({ error: 'Missing credentials' }, 400);
        const user = users.find((u) => u.email === body.email && u.password === body.password);
        if (!user) return buildResponse({ error: 'Invalid credentials' }, 401);
        return buildResponse({ token: 'demo-token', user: { email: user.email, name: user.name } });
      }
      if (action === 'register') {
        if (!body?.email || !body?.password || !body?.name) return buildResponse({ error: 'Missing registration details' }, 400);
        if (users.some((u) => u.email === body.email)) return buildResponse({ error: 'Email already exists' }, 409);
        users.push({ email: body.email, password: body.password, name: body.name });
        return buildResponse({ token: 'demo-token', user: { email: body.email, name: body.name } }, 201);
      }
      if (action === 'logout') {
        return buildResponse({ ok: true });
      }
      if (action === 'refresh') {
        return buildResponse({ token: 'demo-token' });
      }
    }
  }

  return buildResponse({ error: 'Not found' }, 404);
}

async function forwardToUpstream(req: NextRequest, path: string[]) {
  const pathString = '/' + path.join('/');
  const upstreamUrl = new URL(`${UPSTREAM_BASE}${pathString}`);
  req.nextUrl.searchParams.forEach((v, k) => upstreamUrl.searchParams.set(k, v));

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
    body = await req.text().catch(() => undefined);
  }

  const start = Date.now();
  let upstream: Response;
  try {
    upstream = await fetch(upstreamUrl.toString(), {
      method: req.method,
      headers: forwardHeaders,
      body,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Upstream unreachable';
    logger.error('Proxy upstream fetch failed', { path: pathString, error: msg });
    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
  }

  const elapsed = Date.now() - start;
  const logLevel = upstream.status >= 500 ? 'error' : upstream.status >= 400 ? 'warn' : 'info';
  logger[logLevel]('Proxy request', { method: req.method, path: pathString, status: upstream.status, elapsed });

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

async function handler(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  const path = params.path ?? [];
  const ip = getIp(req);
  logger.info('Proxy entry', { ip, method: req.method, path: '/' + path.join('/') });

  if (UPSTREAM_BASE) {
    return forwardToUpstream(req, path);
  }

  return handleLocalAPI(req, path, req.nextUrl);
}

export const GET    = handler;
export const POST   = handler;
export const PUT    = handler;
export const PATCH  = handler;
export const DELETE = handler;
