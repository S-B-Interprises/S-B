/**
 * Core AI Agent Engine
 * Orchestrates AI agent operations and task execution
 */

import * as vscode from 'vscode';
import { AIRouter } from '../router/AIRouter';
import { ChatMemory } from '../memory/ChatMemory';
import { ProjectMemory } from '../memory/ProjectMemory';
import { AIProviderBase, IGenerationOptions } from '../../providers/base/AIProvider';

export interface IAgentConfig {
  maxTokens?: number;
  temperature?: number;
  provider?: string;
  openAIApiKey?: string;
}

export interface IAgentResponse {
  content: string;
  provider: string;
  timestamp: Date;
  tokens?: {
    input: number;
    output: number;
  };
}

/**
 * AgentEngine orchestrates AI agent operations
 */
export class AgentEngine {
  private router: AIRouter;
  private chatMemory: ChatMemory;
  private projectMemory: ProjectMemory;
  private config: IAgentConfig;
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.config = this.loadConfig();
    this.router = new AIRouter();
    this.chatMemory = new ChatMemory(context);
    this.projectMemory = new ProjectMemory();
  }

  /**
   * Process user input and generate response
   */
  async processQuery(
    query: string,
    options?: IAgentConfig
  ): Promise<IAgentResponse> {
    const provider = await this.getProvider();
    const generationOptions: IGenerationOptions = {
        temperature: options?.temperature || this.config.temperature,
        maxTokens: options?.maxTokens || this.config.maxTokens,
    };

    const result = await provider.generate(query, generationOptions);

    return {
      content: result.content,
      provider: provider.name,
      timestamp: new Date(),
      tokens: result.tokensUsed,
    };
  }

  /**
   * Get AI provider
   */
  async getProvider(): Promise<AIProviderBase> {
    const provider = await this.router.route('');
    if (!provider.isConfigured) {
        await provider.initialize({ apiKey: this.config.openAIApiKey || '' });
    }
    return provider;
  }

  /**
   * Load configuration
   */
  private loadConfig(): IAgentConfig {
    const config = vscode.workspace.getConfiguration('universal-ai-agent');
    return {
      maxTokens: config.get('maxTokens', 2048),
      temperature: config.get('temperature', 0.7),
      provider: config.get('provider', 'openai'),
      openAIApiKey: config.get('openaiApiKey', ''),
    };
  }
}
