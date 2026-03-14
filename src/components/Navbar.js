import { authService } from '../utils/auth.js';

export class Navbar {
  constructor() {
    this.user = null;
  }

  async init() {
    this.user = await authService.getCurrentUser();
  }

  async handleLogout() {
    await authService.signOut();
    window.location.href = '/';
  }

  render() {
    const isAuthenticated = this.user !== null;
    const userEmail = this.user?.email || '';

    return `
      <nav class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="navbar-left">
              <a href="/" class="logo">
                <span class="gradient-text">Lio A.I</span>
              </a>
            </div>
            <div class="navbar-right">
              <a href="/about.html" class="nav-link">About</a>
              <a href="/contact.html" class="nav-link">Contact</a>
              ${isAuthenticated ? `
                <div class="user-menu">
                  <span class="user-email">${userEmail}</span>
                  <button id="logout-btn" class="btn-secondary">Logout</button>
                </div>
              ` : `
                <a href="/signin.html" class="btn-secondary">Sign In</a>
                <a href="/signup.html" class="btn-primary">Sign Up</a>
              `}
            </div>
          </div>
        </div>
      </nav>
      <style>
        .navbar {
          background: var(--darker-bg);
          border-bottom: 1px solid var(--border-color);
          padding: 16px 0;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-left {
          display: flex;
          align-items: center;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          color: var(--text-secondary);
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-email {
          color: var(--text-secondary);
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .navbar-right {
            gap: 12px;
          }

          .user-email {
            display: none;
          }

          .nav-link {
            font-size: 14px;
          }
        }
      </style>
    `;
  }

  attachEventListeners() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.handleLogout());
    }
  }
}
