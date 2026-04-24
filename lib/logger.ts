/**
 * WanderWealth Server Logger
 *
 * SERVER-ONLY. Writes JSON-lines to logs/YYYY-MM-DD.log (one file per day).
 * Import this only in server-side files: API routes, middleware, server components.
 * Never import in 'use client' files.
 *
 * Usage:
 *   import { logger } from '@/lib/logger';
 *   logger.info('Hotel searched', { destination: 'Dubai' });
 */

import fs   from 'fs';
import path from 'path';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  meta?: Record<string, unknown>;
  context?: string;
}

const LOG_DIR = path.join(process.cwd(), 'logs');

function getLogFilePath(): string {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return path.join(LOG_DIR, `${date}.log`);
}

function write(entry: LogEntry): void {
  try {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
    fs.appendFileSync(getLogFilePath(), JSON.stringify(entry) + '\n', 'utf8');
  } catch {
    // Never crash the app over a logging failure
  }
}

function log(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    meta,
    context: 'server',
  };

  write(entry);

  // Coloured stdout in development
  if (process.env.NODE_ENV !== 'production') {
    const colours: Record<LogLevel, string> = {
      debug: '\x1b[36m',
      info:  '\x1b[32m',
      warn:  '\x1b[33m',
      error: '\x1b[31m',
    };
    const reset = '\x1b[0m';
    console.log(
      `${colours[level]}[${level.toUpperCase()}]${reset} ${entry.timestamp} — ${message}`,
      meta ? JSON.stringify(meta) : ''
    );
  }
}

export const logger = {
  debug: (msg: string, meta?: Record<string, unknown>) => log('debug', msg, meta),
  info:  (msg: string, meta?: Record<string, unknown>) => log('info',  msg, meta),
  warn:  (msg: string, meta?: Record<string, unknown>) => log('warn',  msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => log('error', msg, meta),
};
