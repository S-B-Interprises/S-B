/**
 * AI Provider - Base Interface
 * Defines contract for all AI provider implementations
 */

export interface IProviderCredentials {
  apiKey: string;
  endpoint?: string;
  organizationId?: string;
  metadata?: Record<string, unknown>;
}

export interface IProviderModel {
  name: string;
  displayName: string;
  maxTokens: number;
  costPer1kTokens: {
    input: number;
    output: number;
  };
}

export interface IGenerationOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string[];
}

export interface IGenerationResult {
  content: string;
  finishReason: 'stop' | 'length' | 'error' | 'unknown';
  tokensUsed: {
    input: number;
    output: number;
  };
  model: string;
}

/**
 * Base interface for all AI providers
 */
export interface IAIProvider {
  name: string;
  isConfigured: boolean;

  /**
   * Initialize provider with credentials
   */
  initialize(credentials: IProviderCredentials): Promise<void>;

  /**
   * Generate response
   */
  generate(prompt: string, options?: IGenerationOptions): Promise<IGenerationResult>;

  /**
   * Stream response
   */
  stream(
    prompt: string,
    onChunk: (chunk: string) => void,
    options?: IGenerationOptions
  ): Promise<void>;

  /**
   * Get available models
   */
  getAvailableModels(): Promise<IProviderModel[]>;

  /**
   * Validate credentials
   */
  validateCredentials(): Promise<boolean>;

  /**
   * Get provider health status
   */
  getHealth(): Promise<boolean>;
}

/**
 * Abstract base class for AI provider implementations
 */
export abstract class AIProviderBase implements IAIProvider {
  abstract name: string;
  protected credentials: IProviderCredentials | null = null;

  get isConfigured(): boolean {
    return this.credentials !== null && this.credentials.apiKey !== '';
  }

  abstract initialize(credentials: IProviderCredentials): Promise<void>;
  abstract generate(prompt: string, options?: IGenerationOptions): Promise<IGenerationResult>;
  abstract stream(
    prompt: string,
    onChunk: (chunk: string) => void,
    options?: IGenerationOptions
  ): Promise<void>;
  abstract getAvailableModels(): Promise<IProviderModel[]>;
  abstract validateCredentials(): Promise<boolean>;
  abstract getHealth(): Promise<boolean>;
}
