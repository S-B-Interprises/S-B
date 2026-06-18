// Extension entry point
import * as vscode from 'vscode';
import { AgentEngine } from '@core/agent/AgentEngine';
import { TaskManager } from '@core/agent/TaskManager';
import { PermissionManager } from '@shared/permissions/PermissionManager';

let agentEngine: AgentEngine;
let taskManager: TaskManager;
let permissionManager: PermissionManager;

/**
 * Extension activation
 */
export async function activate(context: vscode.ExtensionContext): Promise<void> {
  try {
    console.log('Universal AI Agent: Activating...');

    // Initialize core components
    permissionManager = new PermissionManager(context);
    agentEngine = new AgentEngine(context);
    taskManager = new TaskManager();

    // Register commands
    const activateCmd = vscode.commands.registerCommand(
      'universal-ai-agent.activate',
      () => onActivateCommand(context)
    );

    const chatCmd = vscode.commands.registerCommand(
      'universal-ai-agent.chat',
      () => onChatCommand(context)
    );

    const analyzeCmd = vscode.commands.registerCommand(
      'universal-ai-agent.analyze',
      () => onAnalyzeCommand(context)
    );

    context.subscriptions.push(activateCmd, chatCmd, analyzeCmd);

    console.log('Universal AI Agent: Activated successfully');
  } catch (error) {
    console.error('Universal AI Agent: Activation failed', error);
    vscode.window.showErrorMessage('Failed to activate Universal AI Agent');
  }
}

/**
 * Extension deactivation
 */
export async function deactivate(): Promise<void> {
  console.log('Universal AI Agent: Deactivating...');
  // Cleanup resources
}

/**
 * Handle activate command
 */
async function onActivateCommand(context: vscode.ExtensionContext): Promise<void> {
  vscode.window.showInformationMessage('Universal AI Agent is active');
}

/**
 * Handle chat command
 */
async function onChatCommand(context: vscode.ExtensionContext): Promise<void> {
  // Chat implementation
}

/**
 * Handle analyze command
 */
async function onAnalyzeCommand(context: vscode.ExtensionContext): Promise<void> {
  // Analysis implementation
}
