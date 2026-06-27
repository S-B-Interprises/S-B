/**
 * Chat Memory
 * Manages conversation history and context
 */

import * as vscode from 'vscode';

export interface IMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tokens?: number;
  metadata?: Record<string, unknown>;
}

export interface IChatSession {
  id: string;
  title: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

/**
 * ChatMemory manages conversation history
 */
export class ChatMemory {
  private static readonly storageKey = 'universal-ai-agent.chatMemory';

  private sessions: Map<string, IChatSession> = new Map();
  private currentSession: IChatSession | null = null;
  private maxMessages: number = 100;

  constructor(private readonly context?: vscode.ExtensionContext) {
    this.restore();
  }

  /**
   * Create new chat session
   */
  createSession(title: string): string {
    const now = new Date();
    const session: IChatSession = {
      id: createId(),
      title,
      messages: [],
      createdAt: now,
      updatedAt: now
    };

    this.sessions.set(session.id, session);
    this.currentSession = session;
    void this.persist();

    return session.id;
  }

  /**
   * Add message to session
   */
  addMessage(
    sessionId: string,
    role: IMessage['role'],
    content: string
  ): IMessage {
    const session = this.sessions.get(sessionId);

    if (!session) {
      throw new Error(`Chat session not found: ${sessionId}`);
    }

    const message: IMessage = {
      id: createId(),
      role,
      content,
      timestamp: new Date()
    };

    session.messages.push(message);
    session.messages = session.messages.slice(-this.maxMessages);
    session.updatedAt = new Date();
    this.currentSession = session;
    void this.persist();

    return message;
  }

  /**
   * Get session history
   */
  getSessionHistory(sessionId: string): IMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? [...session.messages] : [];
  }

  /**
   * Clear session
   */
  clearSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);

    if (!session) {
      return;
    }

    session.messages = [];
    session.updatedAt = new Date();
    void this.persist();
  }

  /**
   * Delete session
   */
  deleteSession(sessionId: string): boolean {
    const deleted = this.sessions.delete(sessionId);

    if (this.currentSession?.id === sessionId) {
      this.currentSession = null;
    }

    if (deleted) {
      void this.persist();
    }

    return deleted;
  }

  /**
   * Get all sessions
   */
  getAllSessions(): IChatSession[] {
    return Array.from(this.sessions.values());
  }

  private restore(): void {
    const storedSessions = this.context?.globalState.get<IStoredChatSession[]>(
      ChatMemory.storageKey,
      []
    ) ?? [];

    storedSessions.forEach((session) => {
      const restoredSession: IChatSession = {
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.slice(-this.maxMessages).map((message) => ({
          ...message,
          timestamp: new Date(message.timestamp)
        }))
      };

      this.sessions.set(restoredSession.id, restoredSession);
    });

    const sessions = this.getAllSessions();
    this.currentSession = sessions.sort(
      (left, right) => right.updatedAt.getTime() - left.updatedAt.getTime()
    )[0] ?? null;
  }

  private async persist(): Promise<void> {
    if (!this.context) {
      return;
    }

    const storedSessions: IStoredChatSession[] = this.getAllSessions().map((session) => ({
      ...session,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
      messages: session.messages.slice(-this.maxMessages).map((message) => ({
        ...message,
        timestamp: message.timestamp.toISOString()
      }))
    }));

    await this.context.globalState.update(ChatMemory.storageKey, storedSessions);
  }
}

interface IStoredMessage extends Omit<IMessage, 'timestamp'> {
  timestamp: string;
}

interface IStoredChatSession extends Omit<IChatSession, 'createdAt' | 'updatedAt' | 'messages'> {
  messages: IStoredMessage[];
  createdAt: string;
  updatedAt: string;
}

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
