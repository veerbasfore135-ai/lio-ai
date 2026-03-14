import { Navbar } from '../components/Navbar.js';
import { authService } from '../utils/auth.js';
import { supabase } from '../utils/supabase.js';

class ChatPage {
  constructor() {
    this.navbar = new Navbar();
    this.user = null;
    this.messages = [];
    this.conversationId = this.generateUUID();
    this.isTyping = false;
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async init() {
    await this.navbar.init();
    this.user = await authService.getCurrentUser();

    if (!this.user) {
      window.location.href = '/signin.html';
      return;
    }

    await this.loadChatHistory();
    this.render();
    this.attachEventListeners();
    this.scrollToBottom();
  }

  async loadChatHistory() {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', this.user.id)
      .order('created_at', { ascending: true })
      .limit(50);

    if (!error && data) {
      this.messages = data.map(item => [
        { type: 'user', content: item.message, id: item.id },
        { type: 'ai', content: item.response, id: item.id }
      ]).flat();
    }
  }

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      ${this.navbar.render()}
      <div class="chat-page">
        <div class="chat-container">
          <div class="chat-header">
            <h2>Chat with <span class="gradient-text">Lio A.I</span></h2>
            <button id="clear-chat-btn" class="btn-secondary small-btn">Clear Chat</button>
          </div>
          <div id="chat-messages" class="chat-messages">
            ${this.messages.length === 0 ? this.renderWelcomeMessage() : this.renderMessages()}
          </div>
          <div class="chat-input-container">
            <form id="chat-form" class="chat-form">
              <textarea
                id="message-input"
                placeholder="Ask me anything..."
                rows="1"
                required
              ></textarea>
              <button type="submit" class="send-button" id="send-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    this.addStyles();
    this.navbar.attachEventListeners();
  }

  renderWelcomeMessage() {
    return `
      <div class="welcome-message">
        <div class="welcome-icon">
          <span class="gradient-text" style="font-size: 48px;">💬</span>
        </div>
        <h3>Welcome to Lio A.I</h3>
        <p>Ask me anything and I'll do my best to help you!</p>
        <div class="example-prompts">
          <button class="example-prompt" data-prompt="What is artificial intelligence?">
            What is artificial intelligence?
          </button>
          <button class="example-prompt" data-prompt="Explain quantum computing">
            Explain quantum computing
          </button>
          <button class="example-prompt" data-prompt="How does the internet work?">
            How does the internet work?
          </button>
        </div>
      </div>
    `;
  }

  renderMessages() {
    return this.messages.map(msg => this.renderMessage(msg)).join('');
  }

  renderMessage(msg) {
    if (msg.type === 'user') {
      return `
        <div class="message-wrapper user-message-wrapper fade-in">
          <div class="message user-message">${this.escapeHtml(msg.content)}</div>
        </div>
      `;
    } else if (msg.type === 'ai') {
      return `
        <div class="message-wrapper ai-message-wrapper fade-in">
          <div class="message ai-message">
            ${this.escapeHtml(msg.content)}
            <div class="message-actions">
              <button class="copy-btn" data-content="${this.escapeHtml(msg.content)}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    } else if (msg.type === 'typing') {
      return `
        <div class="message-wrapper ai-message-wrapper fade-in" id="typing-indicator">
          <div class="message ai-message">
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      `;
    }
    return '';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  attachEventListeners() {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('message-input');
    const clearBtn = document.getElementById('clear-chat-btn');

    form.addEventListener('submit', (e) => this.handleSubmit(e));

    input.addEventListener('input', (e) => {
      e.target.style.height = 'auto';
      e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
      }
    });

    clearBtn.addEventListener('click', () => this.clearChat());

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('example-prompt')) {
        const prompt = e.target.getAttribute('data-prompt');
        input.value = prompt;
        form.dispatchEvent(new Event('submit'));
      }

      if (e.target.closest('.copy-btn')) {
        const btn = e.target.closest('.copy-btn');
        const content = btn.getAttribute('data-content');
        this.copyToClipboard(content);
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.isTyping) return;

    const input = document.getElementById('message-input');
    const message = input.value.trim();

    if (!message) return;

    this.messages.push({ type: 'user', content: message });
    input.value = '';
    input.style.height = 'auto';

    this.updateMessages();
    this.scrollToBottom();

    this.isTyping = true;
    this.messages.push({ type: 'typing' });
    this.updateMessages();
    this.scrollToBottom();

    const response = await this.getAIResponse(message);

    this.messages = this.messages.filter(m => m.type !== 'typing');
    this.messages.push({ type: 'ai', content: response });
    this.isTyping = false;

    await this.saveChatMessage(message, response);

    this.updateMessages();
    this.scrollToBottom();
  }

  async getAIResponse(message) {
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.response || 'I apologize, but I encountered an error. Please try again.';
    } catch (error) {
      console.error('AI Response Error:', error);
      return 'I apologize, but I am currently unable to process your request. This could be because the AI service is not yet configured. Please contact support or try again later.';
    }
  }

  async saveChatMessage(message, response) {
    const { error } = await supabase
      .from('chat_history')
      .insert({
        user_id: this.user.id,
        message: message,
        response: response,
        conversation_id: this.conversationId
      });

    if (error) {
      console.error('Error saving chat:', error);
    }
  }

  async clearChat() {
    if (!confirm('Are you sure you want to clear your chat history?')) {
      return;
    }

    const { error } = await supabase
      .from('chat_history')
      .delete()
      .eq('user_id', this.user.id);

    if (error) {
      console.error('Error clearing chat:', error);
      return;
    }

    this.messages = [];
    this.conversationId = this.generateUUID();
    this.updateMessages();
  }

  updateMessages() {
    const messagesContainer = document.getElementById('chat-messages');
    if (this.messages.length === 0) {
      messagesContainer.innerHTML = this.renderWelcomeMessage();
    } else {
      messagesContainer.innerHTML = this.renderMessages();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const messagesContainer = document.getElementById('chat-messages');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
  }

  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .chat-page {
        padding-top: 70px;
        height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .chat-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        max-width: 900px;
        margin: 0 auto;
        width: 100%;
        padding: 0 20px;
        height: calc(100vh - 70px);
      }

      .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 0;
        border-bottom: 1px solid var(--border-color);
      }

      .chat-header h2 {
        font-size: 24px;
        font-weight: 700;
      }

      .small-btn {
        padding: 8px 16px;
        font-size: 14px;
      }

      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 24px 0;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .chat-messages::-webkit-scrollbar {
        width: 8px;
      }

      .chat-messages::-webkit-scrollbar-track {
        background: var(--darker-bg);
      }

      .chat-messages::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 4px;
      }

      .chat-messages::-webkit-scrollbar-thumb:hover {
        background: var(--primary-blue);
      }

      .welcome-message {
        text-align: center;
        padding: 60px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }

      .welcome-message h3 {
        font-size: 28px;
        font-weight: 700;
      }

      .welcome-message p {
        color: var(--text-secondary);
        font-size: 16px;
      }

      .example-prompts {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        justify-content: center;
        margin-top: 24px;
      }

      .example-prompt {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        padding: 12px 20px;
        border-radius: 20px;
        font-size: 14px;
        transition: all 0.3s ease;
      }

      .example-prompt:hover {
        border-color: var(--primary-blue);
        color: var(--text-primary);
        transform: translateY(-2px);
      }

      .message-wrapper {
        display: flex;
        width: 100%;
      }

      .user-message-wrapper {
        justify-content: flex-end;
      }

      .ai-message-wrapper {
        justify-content: flex-start;
      }

      .message {
        max-width: 70%;
        padding: 12px 16px;
        border-radius: 16px;
        font-size: 15px;
        line-height: 1.6;
        word-wrap: break-word;
        position: relative;
      }

      .user-message {
        background: var(--gradient-1);
        color: white;
        border-bottom-right-radius: 4px;
      }

      .ai-message {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        border-bottom-left-radius: 4px;
      }

      .message-actions {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }

      .copy-btn {
        background: transparent;
        color: var(--text-secondary);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 4px;
        transition: all 0.3s ease;
      }

      .copy-btn:hover {
        color: var(--primary-blue);
        background: var(--darker-bg);
      }

      .chat-input-container {
        padding: 24px 0;
        border-top: 1px solid var(--border-color);
      }

      .chat-form {
        display: flex;
        gap: 12px;
        align-items: flex-end;
      }

      #message-input {
        flex: 1;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 12px 16px;
        color: var(--text-primary);
        font-size: 15px;
        resize: none;
        max-height: 150px;
        transition: all 0.3s ease;
      }

      #message-input:focus {
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 3px rgba(74, 144, 255, 0.1);
      }

      .send-button {
        background: var(--gradient-1);
        color: white;
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        flex-shrink: 0;
      }

      .send-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(74, 144, 255, 0.4);
      }

      .send-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      @media (max-width: 768px) {
        .chat-container {
          padding: 0 16px;
        }

        .message {
          max-width: 85%;
        }

        .chat-header h2 {
          font-size: 20px;
        }

        .example-prompts {
          flex-direction: column;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

const chatPage = new ChatPage();
chatPage.init();
