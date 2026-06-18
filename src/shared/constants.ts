/**
 * Shared Constants
 * Application-wide constants and configuration values
 */

export const EXTENSION_NAME = 'universal-ai-agent';
export const EXTENSION_DISPLAY_NAME = 'Universal AI Agent';
export const EXTENSION_VERSION = '0.1.0';

export const STORAGE_KEYS = {
  API_KEYS: 'api-keys',
  PREFERENCES: 'preferences',
  CHAT_HISTORY: 'chat-history',
  PROJECT_CONTEXT: 'project-context',
  PERMISSIONS: 'permissions',
} as const;

export const PROVIDERS = {
  OPENAI: 'openai',
  GEMINI: 'gemini',
  CLAUDE: 'claude',
} as const;

export const DEFAULT_MODELS = {
  OPENAI: 'gpt-4-turbo',
  GEMINI: 'gemini-pro',
  CLAUDE: 'claude-3-opus',
} as const;

export const LIMITS = {
  MAX_CONTEXT_LENGTH: 4000,
  MAX_CHAT_HISTORY: 100,
  MAX_CACHED_PROJECTS: 10,
  REQUEST_TIMEOUT_MS: 30000,
} as const;

export const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
} as const;
