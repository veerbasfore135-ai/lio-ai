import { Navbar } from '../components/Navbar.js';
import { authService } from '../utils/auth.js';

class SignInPage {
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
    this.attachEventListeners();
  }

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      ${this.navbar.render()}
      <div class="auth-page">
        <div class="auth-container">
          <div class="auth-card">
            <div class="auth-header">
              <h1>Welcome Back</h1>
              <p>Sign in to continue to Lio A.I</p>
            </div>
            <form id="signin-form" class="auth-form">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  required
                  autocomplete="email"
                >
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  autocomplete="current-password"
                >
              </div>
              <div id="error-message" class="error-message"></div>
              <button type="submit" class="btn-primary full-width" id="submit-btn">
                Sign In
              </button>
            </form>
            <div class="auth-footer">
              <p>Don't have an account? <a href="/signup.html" class="auth-link">Sign Up</a></p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.addStyles();
    this.navbar.attachEventListeners();
  }

  attachEventListeners() {
    const form = document.getElementById('signin-form');
    form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.getElementById('submit-btn');

    errorMessage.textContent = '';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';

    const { data, error } = await authService.signIn(email, password);

    if (error) {
      errorMessage.textContent = error.message;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign In';
      return;
    }

    window.location.href = '/chat.html';
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .auth-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 100px 20px 40px;
        background: radial-gradient(circle at top right, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at bottom left, rgba(74, 144, 255, 0.15) 0%, transparent 50%);
      }

      .auth-container {
        width: 100%;
        max-width: 440px;
      }

      .auth-card {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 48px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }

      .auth-header {
        text-align: center;
        margin-bottom: 32px;
      }

      .auth-header h1 {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 8px;
      }

      .auth-header p {
        color: var(--text-secondary);
        font-size: 16px;
      }

      .auth-form {
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

      .form-group input {
        background: var(--darker-bg);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 12px 16px;
        color: var(--text-primary);
        font-size: 16px;
        transition: all 0.3s ease;
      }

      .form-group input:focus {
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 3px rgba(74, 144, 255, 0.1);
      }

      .error-message {
        color: #ef4444;
        font-size: 14px;
        text-align: center;
        min-height: 20px;
      }

      .full-width {
        width: 100%;
        justify-content: center;
      }

      .auth-footer {
        text-align: center;
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid var(--border-color);
      }

      .auth-footer p {
        color: var(--text-secondary);
        font-size: 14px;
      }

      .auth-link {
        color: var(--primary-blue);
        font-weight: 600;
        transition: opacity 0.3s ease;
      }

      .auth-link:hover {
        opacity: 0.8;
      }

      @media (max-width: 768px) {
        .auth-card {
          padding: 32px 24px;
        }

        .auth-header h1 {
          font-size: 28px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

const signInPage = new SignInPage();
signInPage.init();
