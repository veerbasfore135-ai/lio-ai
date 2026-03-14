import { Navbar } from '../components/Navbar.js';

class ContactPage {
  constructor() {
    this.navbar = new Navbar();
  }

  async init() {
    await this.navbar.init();
    this.render();
    this.attachEventListeners();
  }

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      ${this.navbar.render()}
      <div class="contact-page">
        <div class="container">
          <div class="contact-hero">
            <h1>Get in Touch</h1>
            <p class="contact-subtitle">Have questions? We'd love to hear from you.</p>
          </div>

          <div class="contact-content">
            <div class="contact-grid">
              <div class="contact-info">
                <h2>Contact Information</h2>
                <p class="info-description">
                  Whether you have a question about features, need technical support,
                  or just want to share feedback, our team is here to help.
                </p>

                <div class="contact-methods">
                  <div class="contact-method">
                    <div class="method-icon">📧</div>
                    <div class="method-content">
                      <h3>Email</h3>
                      <p>support@lioai.com</p>
                    </div>
                  </div>

                  <div class="contact-method">
                    <div class="method-icon">💬</div>
                    <div class="method-content">
                      <h3>Live Chat</h3>
                      <p>Available 24/7 in the app</p>
                    </div>
                  </div>

                  <div class="contact-method">
                    <div class="method-icon">🌐</div>
                    <div class="method-content">
                      <h3>Social Media</h3>
                      <p>Follow us @lioai</p>
                    </div>
                  </div>
                </div>

                <div class="quick-links">
                  <h3>Quick Links</h3>
                  <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about.html">About Us</a></li>
                    <li><a href="/chat.html">Try Lio A.I</a></li>
                  </ul>
                </div>
              </div>

              <div class="contact-form-container">
                <form id="contact-form" class="contact-form">
                  <h2>Send us a Message</h2>

                  <div class="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your name"
                      required
                    >
                  </div>

                  <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      required
                    >
                  </div>

                  <div class="form-group">
                    <label for="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      placeholder="What is this about?"
                      required
                    >
                  </div>

                  <div class="form-group">
                    <label for="message">Message</label>
                    <textarea
                      id="message"
                      rows="5"
                      placeholder="Tell us more..."
                      required
                    ></textarea>
                  </div>

                  <div id="form-message" class="form-message"></div>

                  <button type="submit" class="btn-primary full-width" id="submit-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.addStyles();
    this.navbar.attachEventListeners();
  }

  attachEventListeners() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');

    formMessage.textContent = '';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
      formMessage.style.color = '#10b981';

      document.getElementById('contact-form').reset();

      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';

      setTimeout(() => {
        formMessage.textContent = '';
      }, 5000);
    }, 1000);
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .contact-page {
        padding-top: 70px;
        min-height: 100vh;
      }

      .contact-hero {
        text-align: center;
        padding: 80px 0 60px;
        background: radial-gradient(circle at top, rgba(74, 144, 255, 0.15) 0%, transparent 70%);
      }

      .contact-hero h1 {
        font-size: 56px;
        font-weight: 800;
        margin-bottom: 16px;
        background: var(--gradient-1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .contact-subtitle {
        font-size: 24px;
        color: var(--text-secondary);
        font-weight: 600;
      }

      .contact-content {
        padding: 40px 0 80px;
      }

      .contact-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 64px;
        max-width: 1100px;
        margin: 0 auto;
      }

      .contact-info h2 {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 16px;
      }

      .info-description {
        font-size: 16px;
        line-height: 1.6;
        color: var(--text-secondary);
        margin-bottom: 40px;
      }

      .contact-methods {
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin-bottom: 48px;
      }

      .contact-method {
        display: flex;
        gap: 16px;
        align-items: flex-start;
      }

      .method-icon {
        font-size: 32px;
        flex-shrink: 0;
      }

      .method-content h3 {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 4px;
        color: var(--text-primary);
      }

      .method-content p {
        font-size: 15px;
        color: var(--text-secondary);
      }

      .quick-links h3 {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 16px;
        color: var(--text-primary);
      }

      .quick-links ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .quick-links a {
        color: var(--text-secondary);
        font-size: 15px;
        transition: color 0.3s ease;
      }

      .quick-links a:hover {
        color: var(--primary-blue);
      }

      .contact-form-container {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 40px;
      }

      .contact-form h2 {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 32px;
      }

      .contact-form {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .form-group label {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-secondary);
      }

      .form-group input,
      .form-group textarea {
        background: var(--darker-bg);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 12px 16px;
        color: var(--text-primary);
        font-size: 16px;
        transition: all 0.3s ease;
      }

      .form-group input:focus,
      .form-group textarea:focus {
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 3px rgba(74, 144, 255, 0.1);
      }

      .form-group textarea {
        resize: vertical;
        min-height: 120px;
      }

      .form-message {
        font-size: 14px;
        text-align: center;
        min-height: 20px;
      }

      .full-width {
        width: 100%;
        justify-content: center;
      }

      @media (max-width: 1024px) {
        .contact-grid {
          grid-template-columns: 1fr;
          gap: 48px;
        }
      }

      @media (max-width: 768px) {
        .contact-hero h1 {
          font-size: 40px;
        }

        .contact-subtitle {
          font-size: 20px;
        }

        .contact-form-container {
          padding: 32px 24px;
        }

        .contact-form h2 {
          font-size: 24px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

const contactPage = new ContactPage();
contactPage.init();
