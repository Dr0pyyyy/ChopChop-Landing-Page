// Mockup switcher functionality
class MockupSwitcher {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.currentTheme = localStorage.getItem('theme') || 'light';

    // Lista všech mockupů (pouze anglická verze, použije se i pro češtinu)
    this.lightMockups = [
      'ai-helper.png',
      'create-group.png',
      'create-group-animation.png',
      'create-group-step-2.png',
      'create-transaction.png',
      'create-transaction-step-2.png',
      'details.png',
      'email-sent.png',
      'empty-groups.png',
      'forgotten-password.png',
      'get-verified.png',
      'group-members.png',
      'group-settings.png',
      'groups-list.png',
      'group-transactions.png',
      'new-password-sent.png',
      'profile-detail.png',
      'profile-detail-qr.png',
      'qr-code-generated.png',
      'recent-activity.png',
      'report-a-bug.png',
      'settings.png',
      'sign-up.png',
      'sms-code-sent.png'
    ];

    this.darkMockups = [
      'ai-helper-dark.png',
      'create-group-animation-dark.png',
      'create-group-dark.png',
      'create-group-step2-dark.png',
      'create-transaction-dark.png',
      'create-transaction-step2-dark.png',
      'details-dark.png',
      'email-sent-dark.png',
      'empty-groups-dark.png',
      'forgotten-password-dark.png',
      'get-verified-dark.png',
      'groups-list-dark.png',
      'group-transactions-dark.png',
      'login-dark.png',
      'password-sent-dark.png',
      'profile-detail-dark.png',
      'profile-detail-qr-dark.png',
      'qr-code-generated-dark.png',
      'recent-activity-dark.png',
      'report-a-bug-dark.png',
      'settings-dark.png',
      'sign-up-dark.png',
      'sms-code-sent-dark.png'
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
