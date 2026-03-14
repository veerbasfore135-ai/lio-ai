import { Navbar } from '../components/Navbar.js';

class AboutPage {
  constructor() {
    this.navbar = new Navbar();
  }

  async init() {
    await this.navbar.init();
    this.render();
  }

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      ${this.navbar.render()}
      <div class="about-page">
        <div class="container">
          <div class="about-hero">
            <h1>About <span class="gradient-text">Lio A.I</span></h1>
            <p class="about-subtitle">Your Smart AI Assistant</p>
          </div>

          <div class="about-content">
            <section class="about-section">
              <h2>What is Lio A.I?</h2>
              <p>
                Lio A.I is an intelligent conversational assistant designed to help you find answers
                to your questions quickly and accurately. Powered by advanced artificial intelligence,
                Lio A.I can understand natural language and provide helpful responses on a wide range of topics.
              </p>
            </section>

            <section class="about-section">
              <h2>Our Mission</h2>
              <p>
                Our mission is to make knowledge accessible to everyone. We believe that everyone should
                have instant access to information and insights that can help them learn, grow, and make
                informed decisions. Lio A.I is built to be your trusted companion in the journey of discovery.
              </p>
            </section>

            <section class="about-section">
              <h2>Key Features</h2>
              <div class="features-list">
                <div class="feature-item">
                  <div class="feature-number">01</div>
                  <div class="feature-content">
                    <h3>Instant Responses</h3>
                    <p>Get answers to your questions in seconds with our lightning-fast AI technology.</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-number">02</div>
                  <div class="feature-content">
                    <h3>Natural Conversations</h3>
                    <p>Chat naturally as if you're talking to a knowledgeable friend.</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-number">03</div>
                  <div class="feature-content">
                    <h3>Secure & Private</h3>
                    <p>Your conversations are encrypted and protected with enterprise-grade security.</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-number">04</div>
                  <div class="feature-content">
                    <h3>Chat History</h3>
                    <p>Access your previous conversations anytime to review past insights.</p>
                  </div>
                </div>
              </div>
            </section>

            <section class="about-section">
              <h2>How It Works</h2>
              <div class="steps-grid">
                <div class="step-card">
                  <div class="step-icon">📝</div>
                  <h3>Ask a Question</h3>
                  <p>Type your question or prompt in the chat interface.</p>
                </div>
                <div class="step-card">
                  <div class="step-icon">🧠</div>
                  <h3>AI Processing</h3>
                  <p>Our AI analyzes your question and generates an intelligent response.</p>
                </div>
                <div class="step-card">
                  <div class="step-icon">💡</div>
                  <h3>Get Your Answer</h3>
                  <p>Receive a clear, helpful answer in seconds.</p>
                </div>
              </div>
            </section>

            <section class="about-section cta-section">
              <h2>Ready to Experience Lio A.I?</h2>
              <p>Join thousands of users who trust Lio A.I for their questions.</p>
              <a href="/signup.html" class="btn-primary">Get Started Free</a>
            </section>
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
      .about-page {
        padding-top: 70px;
        min-height: 100vh;
      }

      .about-hero {
        text-align: center;
        padding: 80px 0 60px;
        background: radial-gradient(circle at top, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
      }

      .about-hero h1 {
        font-size: 56px;
        font-weight: 800;
        margin-bottom: 16px;
      }

      .about-subtitle {
        font-size: 24px;
        color: var(--text-secondary);
        font-weight: 600;
      }

      .about-content {
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 0 80px;
      }

      .about-section {
        margin-bottom: 64px;
      }

      .about-section h2 {
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 24px;
        color: var(--text-primary);
      }

      .about-section p {
        font-size: 18px;
        line-height: 1.8;
        color: var(--text-secondary);
      }

      .features-list {
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin-top: 32px;
      }

      .feature-item {
        display: flex;
        gap: 24px;
        align-items: flex-start;
      }

      .feature-number {
        font-size: 32px;
        font-weight: 800;
        background: var(--gradient-1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        flex-shrink: 0;
      }

      .feature-content h3 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 8px;
        color: var(--text-primary);
      }

      .feature-content p {
        font-size: 16px;
        line-height: 1.6;
        color: var(--text-secondary);
      }

      .steps-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 32px;
        margin-top: 32px;
      }

      .step-card {
        text-align: center;
        padding: 32px 24px;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        transition: all 0.3s ease;
      }

      .step-card:hover {
        border-color: var(--primary-blue);
        transform: translateY(-4px);
      }

      .step-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }

      .step-card h3 {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 12px;
        color: var(--text-primary);
      }

      .step-card p {
        font-size: 15px;
        color: var(--text-secondary);
        line-height: 1.6;
      }

      .cta-section {
        text-align: center;
        padding: 60px 40px;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        margin-top: 80px;
      }

      .cta-section h2 {
        margin-bottom: 16px;
      }

      .cta-section p {
        margin-bottom: 32px;
      }

      @media (max-width: 768px) {
        .about-hero h1 {
          font-size: 40px;
        }

        .about-subtitle {
          font-size: 20px;
        }

        .about-section h2 {
          font-size: 28px;
        }

        .about-section p {
          font-size: 16px;
        }

        .steps-grid {
          grid-template-columns: 1fr;
        }

        .feature-item {
          flex-direction: column;
          text-align: center;
        }

        .cta-section {
          padding: 40px 24px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

const aboutPage = new AboutPage();
aboutPage.init();
