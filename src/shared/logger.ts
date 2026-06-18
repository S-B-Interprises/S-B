/**
 * Shared Logger
 * Centralized logging utility for the extension
 */

import { LOG_LEVELS } from './constants';

export type LogLevel = typeof LOG_LEVELS[keyof typeof LOG_LEVELS];

export interface ILogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  data?: unknown;
  error?: Error;
}

/**
 * Logger for extension-wide logging
 */
export class Logger {
  private static logs: ILogEntry[] = [];
  private static maxLogs = 1000;

  /**
   * Log debug message
   */
  static debug(message: string, data?: unknown): void {
    Logger.log(LOG_LEVELS.DEBUG, message, data);
  }

  /**
   * Log info message
   */
  static info(message: string, data?: unknown): void {
    Logger.log(LOG_LEVELS.INFO, message, data);
  }

  /**
   * Log warning message
   */
  static warn(message: string, data?: unknown): void {
    Logger.log(LOG_LEVELS.WARN, message, data);
  }

  /**
   * Log error message
   */
  static error(message: string, error?: Error | unknown): void {
    const err = error instanceof Error ? error : new Error(String(error));
    Logger.log(LOG_LEVELS.ERROR, message, undefined, err);
  }

  /**
   * Internal log method
   */
  private static log(
    level: LogLevel,
    message: string,
    data?: unknown,
    error?: Error
  ): void {
    const entry: ILogEntry = {
      timestamp: new Date(),
      level,
      message,
      data,
      error,
    };

    Logger.logs.push(entry);

    // Keep log size manageable
    if (Logger.logs.length > Logger.maxLogs) {
      Logger.logs = Logger.logs.slice(-Logger.maxLogs);
    }

    // Output to console
    const prefix = `[${level}]`;
    switch (level) {
      case LOG_LEVELS.DEBUG:
        console.debug(prefix, message, data);
        break;
      case LOG_LEVELS.INFO:
        console.info(prefix, message, data);
        break;
      case LOG_LEVELS.WARN:
        console.warn(prefix, message, data);
        break;
      case LOG_LEVELS.ERROR:
        console.error(prefix, message, error || data);
        break;
    }
  }

  /**
   * Get all logs
   */
  static getLogs(): ILogEntry[] {
    return [...Logger.logs];
  }

  /**
   * Clear logs
   */
  static clearLogs(): void {
    Logger.logs = [];
  }
}
