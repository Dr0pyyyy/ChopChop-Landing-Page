// Mockup switcher functionality
class MockupSwitcher {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.currentTheme = localStorage.getItem('theme') || 'light';

    // Lista všech mockupů (pouze anglická verze, použije se i pro češtinu)
    this.lightMockups = [
      'ai-helper.webp',
      'create-group.webp',
      'create-group-animation.webp',
      'create-group-step-2.webp',
      'create-transaction.webp',
      'create-transaction-step-2.webp',
      'details.webp',
      'email-sent.webp',
      'empty-groups.webp',
      'forgotten-password.webp',
      'get-verified.webp',
      'group-members.webp',
      'group-settings.webp',
      'groups-list.webp',
      'group-transactions.webp',
      'new-password-sent.webp',
      'profile-detail.webp',
      'profile-detail-qr.webp',
      'qr-code-generated.webp',
      'recent-activity.webp',
      'report-a-bug.webp',
      'settings.webp',
      'sign-up.webp',
      'sms-code-sent.webp'
    ];

    this.darkMockups = [
      'ai-helper-dark.webp',
      'create-group-animation-dark.webp',
      'create-group-dark.webp',
      'create-group-step2-dark.webp',
      'create-transaction-dark.webp',
      'create-transaction-step2-dark.webp',
      'details-dark.webp',
      'email-sent-dark.webp',
      'empty-groups-dark.webp',
      'forgotten-password-dark.webp',
      'get-verified-dark.webp',
      'groups-list-dark.webp',
      'group-transactions-dark.webp',
      'login-dark.webp',
      'password-sent-dark.webp',
      'profile-detail-dark.webp',
      'profile-detail-qr-dark.webp',
      'qr-code-generated-dark.webp',
      'recent-activity-dark.webp',
      'report-a-bug-dark.webp',
      'settings-dark.webp',
      'sign-up-dark.webp',
      'sms-code-sent-dark.webp'
    ];

    this.init();
  }

  init() {
    this.updateAllMockups();
    this.populateCarouselColumns();
    this.observeChanges();
  }

  observeChanges() {
    // Listen for storage changes (language and theme switches)
    window.addEventListener('storage', (e) => {
      if (e.key === 'language' || e.key === 'theme') {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.updateAllMockups();
        this.populateCarouselColumns();
      }
    });

    // Also listen for custom events from the language and theme switchers
    document.addEventListener('languageChanged', () => {
      this.currentLanguage = localStorage.getItem('language') || 'en';
      this.updateAllMockups();
      this.populateCarouselColumns();
    });

    document.addEventListener('themeChanged', () => {
      this.currentTheme = localStorage.getItem('theme') || 'light';
      this.updateAllMockups();
      this.populateCarouselColumns();
    });
  }

  // Náhodně promíchá pole
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Naplní sloupce karuselu náhodnými mockupy
  populateCarouselColumns() {
    const columns = document.querySelectorAll('.mockups-carousel__column');
    const themeFolder = this.currentTheme;
    const mockups = this.currentTheme === 'dark' ? this.darkMockups : this.lightMockups;

    columns.forEach(column => {
      const columnInner = column.querySelector('.mockups-carousel__column-inner');
      if (!columnInner) return;

      // Náhodně promíchej mockupy pro tento sloupec
      const shuffledMockups = this.shuffleArray(mockups);

      // Vezmi prvních 3 mockupy
      const selectedMockups = shuffledMockups.slice(0, 3);

      // Vyčisti column inner
      columnInner.innerHTML = '';

      // Vytvoř 3 kopie mockupů pro infinite scrolling (celkem 9 obrázků)
      for (let i = 0; i < 3; i++) {
        selectedMockups.forEach(mockup => {
          const img = document.createElement('img');
          // Pro češtinu také používáme anglické mockupy (ENG)
          img.src = `mockups/ENG/${themeFolder}/columns/${mockup}`;
          img.alt = 'ChopChop app screen';
          img.className = 'mockups-carousel__mockup';
          columnInner.appendChild(img);
        });
      }
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
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.mockupSwitcher = new MockupSwitcher();
});
