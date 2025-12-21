// Theme switcher functionality
class ThemeSwitcher {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.bindEvents();
    this.applyTheme(this.currentTheme);
    this.updateUI();
  }

  bindEvents() {
    // Desktop theme toggle
    const desktopBtn = document.getElementById('themeToggle');
    if (desktopBtn) {
      desktopBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Mobile theme toggle
    const mobileBtn = document.getElementById('mobileThemeToggle');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme(this.currentTheme);
    this.updateUI();

    // Remove focus from button to reset hover state
    document.activeElement.blur();
  }

  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  updateUI() {
    const isDark = this.currentTheme === 'dark';

    // Update desktop theme toggle
    const desktopIcon = document.querySelector('.theme-toggle__icon');
    if (desktopIcon) {
      desktopIcon.textContent = isDark ? '☀️' : '🌙';
    }

    // Update mobile theme toggle
    const mobileIcon = document.querySelector('.menu-overlay__theme-icon');
    const mobileText = document.querySelector('.menu-overlay__theme-text');
    if (mobileIcon && mobileText) {
      mobileIcon.textContent = isDark ? '☀️' : '🌙';
      mobileText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }

    // Update aria-label for accessibility
    const desktopBtn = document.getElementById('themeToggle');
    const mobileBtn = document.getElementById('mobileThemeToggle');

    if (desktopBtn) {
      desktopBtn.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    }
    if (mobileBtn) {
      mobileBtn.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeSwitcher();
});