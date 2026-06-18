/**
 * Shared Error Definitions
 * Custom error classes for the extension
 */

export class ExtensionError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'ExtensionError';
  }
}

export class ProviderError extends ExtensionError {
  constructor(
    message: string,
    code: string = 'PROVIDER_ERROR',
    details?: unknown
  ) {
    super(message, code, details);
    this.name = 'ProviderError';
  }
}

export class PermissionError extends ExtensionError {
  constructor(
    message: string,
    code: string = 'PERMISSION_DENIED',
    details?: unknown
  ) {
    super(message, code, details);
    this.name = 'PermissionError';
  }
}

export class ConfigurationError extends ExtensionError {
  constructor(
    message: string,
    code: string = 'CONFIGURATION_ERROR',
    details?: unknown
  ) {
    super(message, code, details);
    this.name = 'ConfigurationError';
  }
}

export class TimeoutError extends ExtensionError {
  constructor(
    message: string = 'Operation timeout',
    code: string = 'TIMEOUT',
    details?: unknown
  ) {
    super(message, code, details);
    this.name = 'TimeoutError';
  }
}

export class ValidationError extends ExtensionError {
  constructor(
    message: string,
    code: string = 'VALIDATION_ERROR',
    details?: unknown
  ) {
    super(message, code, details);
    this.name = 'ValidationError';
  }
}
