/**
 * POST /api/log
 * Receives client-side log entries and writes them server-side via the date-based logger.
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger, LogLevel } from '@/lib/logger';

const VALID_LEVELS = new Set<LogLevel>(['debug', 'info', 'warn', 'error']);
const BLOCKED_META_KEYS = new Set(['password', 'token', 'secret', 'authorization', 'cookie']);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.message || typeof body.message !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const level: LogLevel = VALID_LEVELS.has(body.level) ? body.level : 'info';
    const message = `[CLIENT] ${body.message.slice(0, 500)}`;

    // Strip sensitive keys from meta
    let meta: Record<string, unknown> | undefined;
    if (body.meta && typeof body.meta === 'object') {
      meta = Object.fromEntries(
        Object.entries(body.meta as Record<string, unknown>)
          .filter(([k]) => !BLOCKED_META_KEYS.has(k.toLowerCase()))
      );
    }

    logger[level](message, meta);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
