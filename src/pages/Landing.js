import { Navbar } from '../components/Navbar.js';
import { authService } from '../utils/auth.js';

export class LandingPage {
  constructor() {
    this.navbar = new Navbar();
  }

  async init() {
    await this.navbar.init();
    const user = await authService.getCurrentUser();

    if (user) {
      window.location.href = '/chat.html';
      return;
    }

    this.render();
  }

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      ${this.navbar.render()}
      <div class="landing-page">
        <div class="hero-section">
          <div class="container">
            <div class="hero-content">
              <h1 class="hero-title">
                <span class="gradient-text">Lio A.I</span>
                <br>Your Smart AI Assistant
              </h1>
              <p class="hero-subtitle">Ask Anything. Learn Everything.</p>
              <p class="hero-description">
                Experience the power of artificial intelligence at your fingertips.
                Get instant, intelligent answers to all your questions.
              </p>
              <div class="hero-buttons">
                <a href="/signup.html" class="btn-primary">Get Started Free</a>
                <a href="/signin.html" class="btn-secondary">Sign In</a>
              </div>
            </div>
            <div class="hero-visual">
              <div class="floating-card">
                <div class="chat-preview">
                  <div class="chat-bubble user-bubble">
                    How does AI work?
                  </div>
                  <div class="chat-bubble ai-bubble">
                    AI works by processing data through neural networks...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="features-section">
          <div class="container">
            <h2 class="section-title">Why Choose <span class="gradient-text">Lio A.I</span>?</h2>
            <div class="features-grid">
              <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3>Lightning Fast</h3>
                <p>Get instant responses to your questions with our advanced AI technology</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🧠</div>
                <h3>Smart & Accurate</h3>
                <p>Powered by cutting-edge AI models for precise and helpful answers</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">💬</div>
                <h3>Natural Conversations</h3>
                <p>Chat naturally like you would with a knowledgeable friend</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🔒</div>
                <h3>Secure & Private</h3>
                <p>Your conversations are encrypted and protected</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">📚</div>
                <h3>Save History</h3>
                <p>Access your previous conversations anytime, anywhere</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">📱</div>
                <h3>Works Everywhere</h3>
                <p>Responsive design that works on all devices</p>
              </div>
            </div>
          </div>
        </div>

        <div class="cta-section">
          <div class="container">
            <div class="cta-content">
              <h2>Ready to Get Started?</h2>
              <p>Join thousands of users who trust Lio A.I for their questions</p>
              <a href="/signup.html" class="btn-primary">Start Chatting Now</a>
            </div>
          </div>
        </div>
      </div>
    `;

    this.addStyles();
    this.navbar.attachEventListeners();
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .landing-page {
        padding-top: 70px;
      }

      .hero-section {
        padding: 100px 0;
        background: radial-gradient(circle at top right, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at bottom left, rgba(74, 144, 255, 0.15) 0%, transparent 50%);
      }

      .hero-content {
        max-width: 600px;
      }

      .hero-title {
        font-size: 56px;
        font-weight: 800;
        line-height: 1.2;
        margin-bottom: 24px;
      }

      .hero-subtitle {
        font-size: 24px;
        color: var(--text-secondary);
        margin-bottom: 16px;
        font-weight: 600;
      }

      .hero-description {
        font-size: 18px;
        color: var(--text-secondary);
        margin-bottom: 32px;
        line-height: 1.8;
      }

      .hero-buttons {
        display: flex;
        gap: 16px;
      }

      .hero-visual {
        position: absolute;
        right: 10%;
        top: 50%;
        transform: translateY(-50%);
      }

      .floating-card {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: float 6s ease-in-out infinite;
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      .chat-preview {
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 300px;
      }

      .chat-bubble {
        padding: 12px 16px;
        border-radius: 16px;
        max-width: 80%;
        font-size: 14px;
      }

      .user-bubble {
        background: var(--gradient-1);
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }

      .ai-bubble {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }

      .features-section {
        padding: 80px 0;
        background: var(--darker-bg);
      }

      .section-title {
        font-size: 40px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 64px;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 32px;
      }

      .feature-card {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 32px;
        transition: all 0.3s ease;
      }

      .feature-card:hover {
        border-color: var(--primary-blue);
        transform: translateY(-4px);
      }

      .feature-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }

      .feature-card h3 {
        font-size: 24px;
        margin-bottom: 12px;
        color: var(--text-primary);
      }

      .feature-card p {
        color: var(--text-secondary);
        line-height: 1.6;
      }

      .cta-section {
        padding: 80px 0;
        background: var(--dark-bg);
      }

      .cta-content {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      }

      .cta-content h2 {
        font-size: 40px;
        font-weight: 700;
        margin-bottom: 16px;
      }

      .cta-content p {
        font-size: 18px;
        color: var(--text-secondary);
        margin-bottom: 32px;
      }

      @media (max-width: 1024px) {
        .hero-visual {
          display: none;
        }
      }

      @media (max-width: 768px) {
        .hero-section {
          padding: 60px 0;
        }

        .hero-title {
          font-size: 40px;
        }

        .hero-subtitle {
          font-size: 20px;
        }

        .hero-description {
          font-size: 16px;
        }

        .hero-buttons {
          flex-direction: column;
        }

        .section-title {
          font-size: 32px;
        }

        .features-grid {
          grid-template-columns: 1fr;
        }

        .cta-content h2 {
          font-size: 32px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
