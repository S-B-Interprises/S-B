import * as vscode from 'vscode';
import { AgentEngine } from '../core/agent/AgentEngine';

export class SidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'agent-chat';

  private _view?: vscode.WebviewView;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _agentEngine: AgentEngine
  ) {}

  public resolveWebviewView(webviewView: vscode.WebviewView): void {
    this._view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.type) {
        case 'prompt':
          {
            const response = await this._agentEngine.processQuery(message.value);
            webviewView.webview.postMessage({
              type: 'response',
              value: response.content
            });
            break;
          }
        case 'error':
          {
            vscode.window.showErrorMessage(message.value);
            break;
          }
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const nonce = getNonce();
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'main.js'));
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'styles.css'));


    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Universal AI Agent</title>
  <link href="${styleUri}" rel="stylesheet">
</head>
<body>
  <main class="container">
    <h1>Universal AI Agent</h1>
    <div class="status">Status: Ready</div>

    <label for="model-selector">
      Model Selector:
      <select id="model-selector" name="model-selector">
        <option value="gpt">GPT</option>
        <option value="claude">Claude</option>
        <option value="gemini">Gemini</option>
      </select>
    </label>

    <section class="chat-area" aria-label="Chat Area">
      <div class="placeholder">Chat Area</div>
    </section>

    <label for="message-input">
      Message Input
      <textarea id="message-input" name="message-input"></textarea>
    </label>

    <button id="send-button" type="button">Send</button>
  </main>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
  }
}

function getNonce(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';

  for (let index = 0; index < 32; index += 1) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return nonce;
}



