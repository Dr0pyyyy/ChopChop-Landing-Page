// Mockup switcher functionality
class MockupSwitcher {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.updateAllMockups();
    this.observeChanges();
  }

  observeChanges() {
    // Listen for storage changes (language and theme switches)
    window.addEventListener('storage', (e) => {
      if (e.key === 'language' || e.key === 'theme') {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.updateAllMockups();
      }
    });

    // Also listen for custom events from the language and theme switchers
    document.addEventListener('languageChanged', () => {
      this.currentLanguage = localStorage.getItem('language') || 'en';
      this.updateAllMockups();
    });

    document.addEventListener('themeChanged', () => {
      this.currentTheme = localStorage.getItem('theme') || 'light';
      this.updateAllMockups();
    });
  }

  updateAllMockups() {
    // Get language folder name
    const langFolder = this.currentLanguage === 'en' ? 'ENG' : 'CZE';
    const themeFolder = this.currentTheme;

    // Update all mockups with data-mockup-base attribute
    document.querySelectorAll('[data-mockup-base]').forEach(img => {
      const basePath = img.getAttribute('data-mockup-base');
      const newPath = `mockups/${langFolder}/${themeFolder}/${basePath}`;
      img.src = newPath;
    });

    // Update column mockups in carousel (these might stay in ENG/light only for now)
    document.querySelectorAll('[data-mockup-column]').forEach(img => {
      const columnPath = img.getAttribute('data-mockup-column');
      const newPath = `mockups/${langFolder}/${themeFolder}/${columnPath}`;
      img.src = newPath;
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.mockupSwitcher = new MockupSwitcher();
});
