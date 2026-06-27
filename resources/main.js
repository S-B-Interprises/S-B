const vscode = acquireVsCodeApi();

    const chatArea = document.querySelector('.chat-area');
    const input = document.querySelector('#message-input');
    const sendButton = document.querySelector('#send-button');

    function appendMessage(sender, message) {
      const placeholder = document.querySelector('.placeholder');

      if (placeholder) {
        placeholder.remove();
      }

      const messageElement = document.createElement('div');
      messageElement.className = 'message';

      const senderElement = document.createElement('span');
      senderElement.className = 'sender';
      senderElement.textContent = sender + ':';

      const textElement = document.createElement('span');
      textElement.textContent = ' ' + message;

      messageElement.append(senderElement, textElement);
      chatArea.appendChild(messageElement);
      chatArea.scrollTop = chatArea.scrollHeight;
    }

    function sendMessage() {
      const message = input.value.trim();

      if (!message) {
        return;
      }

      appendMessage('You', message);
      vscode.postMessage({ type: 'prompt', value: message });
      input.value = '';
      input.focus();
    }

    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.type) {
            case 'response':
                appendMessage('Assistant', message.value);
                break;
        }
    });

    sendButton.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    });
