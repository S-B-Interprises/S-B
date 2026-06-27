import { OpenAIProvider } from '../../providers/openai/OpenAIProvider';
import { AIProviderBase } from '../../providers/base/AIProvider';

/**
 * AI Router
 * Routes requests to appropriate AI provider
 */
export interface IRoutingStrategy {
  type: 'cost' | 'speed' | 'quality' | 'custom';
  weight?: Record<string, number>;
}

/**
 * AIRouter intelligently routes requests to AI providers
 */
export class AIRouter {
  private providers: Map<string, AIProviderBase> = new Map();
  private strategy: IRoutingStrategy;
  private preferredProvider: string | null = null;

  constructor(strategy?: IRoutingStrategy) {
    this.strategy = strategy || { type: 'quality' };
    this.registerProvider(new OpenAIProvider());
  }

  /**
   * Register provider
   */
  registerProvider(provider: AIProviderBase): void {
    this.providers.set(provider.name, provider);
  }

  /**
   * Route request to best provider
   */
  async route(_query: string): Promise<AIProviderBase> {
    const providerName = this.getCurrentProviderName();

    if (!providerName) {
      throw new Error('No AI provider is available');
    }

    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`Provider not found: ${providerName}`);
    }

    return provider;
  }

  /**
   * Get available providers
   */
  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  /**
   * Set preferred provider
   */
  setPreferredProvider(providerName: string): void {
    if (!this.providers.has(providerName)) {
      throw new Error(`Provider is not registered: ${providerName}`);
    }

    this.preferredProvider = providerName;
  }

  /**
   * Get current preferred provider
   */
  getCurrentProviderName(): string | null {
    if (
      this.preferredProvider &&
      this.providers.has(this.preferredProvider)
    ) {
      return this.preferredProvider;
    }

    // Return the first registered provider as a default
    const availableProviders = this.getAvailableProviders();
    return availableProviders.length > 0 ? availableProviders[0] : null;
  }

  /**
   * Get provider metrics
   */
  getProviderMetrics(providerName: string): Record<string, unknown> {
    const provider = this.providers.get(providerName);

    if (!provider) {
      throw new Error(`Provider is not registered: ${providerName}`);
    }

    return {
      strategy: this.strategy.type,
      preferred: this.preferredProvider === providerName
    };
  }
}
