/**
 * OpenAI Provider
 * Implementation for OpenAI API integration
 */

import OpenAI from 'openai';
import {
  AIProviderBase,
  IProviderCredentials,
  IGenerationOptions,
  IGenerationResult,
  IProviderModel,
} from '../base/AIProvider';

/**
 * OpenAI provider implementation
 */
export class OpenAIProvider extends AIProviderBase {
  name = 'OpenAI';
  private client: OpenAI | null = null;
  private currentModel: string = 'gpt-4-turbo';

  /**
   * Initialize OpenAI provider
   */
  async initialize(credentials: IProviderCredentials): Promise<void> {
    const apiKey = credentials.apiKey.trim();

    if (!apiKey) {
      throw new Error('Missing OpenAI API key. Add it in VS Code settings: universal-ai-agent.openaiApiKey.');
    }

    this.credentials = {
      ...credentials,
      apiKey
    };
    this.currentModel = typeof credentials.metadata?.model === 'string'
      ? credentials.metadata.model
      : this.currentModel;
    this.client = new OpenAI({
      apiKey,
      organization: credentials.organizationId,
      baseURL: credentials.endpoint
    });
  }

  /**
   * Generate response from OpenAI
   */
  async generate(
    prompt: string,
    options?: IGenerationOptions
  ): Promise<IGenerationResult> {
    if (!this.client || !this.isConfigured) {
      throw new Error('OpenAI provider is not configured. Add your API key in VS Code settings.');
    }

    try {
      const response = await this.client.chat.completions.create({
        model: this.currentModel,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: options?.temperature,
        max_tokens: options?.maxTokens,
        top_p: options?.topP,
        frequency_penalty: options?.frequencyPenalty,
        presence_penalty: options?.presencePenalty,
        stop: options?.stopSequences
      });

      return {
        content: response.choices[0]?.message?.content ?? '',
        finishReason: mapFinishReason(response.choices[0]?.finish_reason),
        tokensUsed: {
          input: response.usage?.prompt_tokens ?? 0,
          output: response.usage?.completion_tokens ?? 0
        },
        model: response.model
      };
    } catch (error) {
      throw new Error(getOpenAIErrorMessage(error));
    }
  }

  /**
   * Stream response from OpenAI
   */
  async stream(
    prompt: string,
    onChunk: (chunk: string) => void,
    options?: IGenerationOptions
  ): Promise<void> {
    if (!this.client || !this.isConfigured) {
      throw new Error('OpenAI provider is not configured. Add your API key in VS Code settings.');
    }

    try {
      const stream = await this.client.chat.completions.create({
        model: this.currentModel,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: options?.temperature,
        max_tokens: options?.maxTokens,
        stream: true
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;

        if (content) {
          onChunk(content);
        }
      }
    } catch (error) {
      throw new Error(getOpenAIErrorMessage(error));
    }
  }

  /**
   * Get available OpenAI models
   */
  async getAvailableModels(): Promise<IProviderModel[]> {
    if (!this.client) {
      return this.getHardcodedModels();
    }

    try {
      const models = await this.client.models.list();
      return models.data
        .filter(model => model.id.startsWith('gpt'))
        .map(model => ({
          name: model.id,
          displayName: model.id,
          maxTokens: 0, // OpenAI API doesn't provide maxTokens in model list
          costPer1kTokens: { input: 0, output: 0 } // Pricing info not available from API
        }));
    } catch (error) {
      console.error('Failed to fetch models from OpenAI API, returning hardcoded models.', error);
      return this.getHardcodedModels();
    }
  }

  private getHardcodedModels(): IProviderModel[] {
    return [
      {
        name: 'gpt-4-turbo',
        displayName: 'GPT-4 Turbo',
        maxTokens: 128000,
        costPer1kTokens: {
          input: 0.01,
          output: 0.03
        }
      },
      {
        name: 'gpt-4o-mini',
        displayName: 'GPT-4o Mini',
        maxTokens: 128000,
        costPer1kTokens: {
          input: 0.00015,
          output: 0.0006
        }
      }
    ];
  }

  /**
   * Validate OpenAI credentials
   */
  async validateCredentials(): Promise<boolean> {
    return this.isConfigured;
  }

  /**
   * Get OpenAI API health
   */
  async getHealth(): Promise<boolean> {
    return this.isConfigured;
  }
}

function mapFinishReason(
  reason: string | null | undefined
): IGenerationResult['finishReason'] {
  if (reason === 'stop' || reason === 'length') {
    return reason;
  }

  if (reason === 'content_filter') {
    return 'error';
  }

  return 'unknown';
}

function getOpenAIErrorMessage(error: unknown): string {
  if (error instanceof OpenAI.APIError) {
    return `OpenAI API error: ${error.message}`;
  }

  if (error instanceof Error) {
    return `OpenAI request failed: ${error.message}`;
  }

  return 'OpenAI request failed. Please check your network connection and API key.';
}
