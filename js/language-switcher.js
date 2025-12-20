// Language switcher functionality
class LanguageSwitcher {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.translations = {
      en: {
        // Navigation
        'nav-home': 'Home',
        'nav-how-it-works': 'How it Works',
        'nav-join-us': 'Join Us',
        'nav-contact': 'Contact',

        // Hero section
        'hero-headline': 'Splitting bills, made simple',
        'hero-description': 'Make every group expense effortless. With ChopChop, you\'ll always know who owes what, without the hassle, confusion, or endless calculations.',

        // How it works section
        'section-how-it-works': 'How it works',
        'feature-create-groups': 'Create groups',
        'feature-create-groups-desc': 'Set up a group for friends, family, or colleagues and keep all shared expenses in one place.',
        'feature-invite-friends': 'Invite friends',
        'feature-invite-friends-desc': 'Invite others using QR code or link and start sharing expenses in seconds.',
        'feature-add-transactions': 'Add transactions',
        'feature-add-transactions-desc': 'Record who paid what with multiple currencies and always stay on top of your payments.',
        'feature-split-bills': 'Split the bills',
        'feature-split-bills-desc': 'ChopChop automatically calculates who owes whom and splits the bill fairly for you.',
        'feature-no-card': 'No credit card required',
        'feature-no-card-desc': 'All we need is your IBAN to get you started. Your credit card can stay safely in your wallet.',
      },
      cz: {
        // Navigace
        'nav-home': 'Domů',
        'nav-how-it-works': 'Jak to funguje',
        'nav-join-us': 'Spolupráce',
        'nav-contact': 'Kontakt',

        // Hero sekce
        'hero-headline': 'Rozdělení účtů, rychle a jednoduše',
        'hero-description': 'Skupinové výdaje bez starostí. S ChopChopem vždy víte, kdo komu dluží – žádné komplikace, zmatek nebo nekonečné počítání.',

        // Jak to funguje sekce
        'section-how-it-works': 'Jak to funguje',
        'feature-create-groups': 'Vytvořte skupiny',
        'feature-create-groups-desc': 'Nastavte skupinu pro přátele, rodinu nebo kolegy a uchovejte všechny sdílené výdaje na jednom místě.',
        'feature-invite-friends': 'Pozvěte přátele',
        'feature-invite-friends-desc': 'Pozvěte ostatní pomocí QR kódu nebo odkazu a začněte sdílet výdaje během několika sekund.',
        'feature-add-transactions': 'Přidejte transakce',
        'feature-add-transactions-desc': 'Zaznamenejte, kdo co zaplatil, s více měnami a vždy mějte přehled o svých platbách.',
        'feature-split-bills': 'Rozdělte účty',
        'feature-split-bills-desc': 'ChopChop automaticky vypočítá, kdo komu dluží a spravedlivě rozdělí účet za vás.',
        'feature-no-card': 'Kreditní karta není potřeba',
        'feature-no-card-desc': 'Stačí nám jen váš IBAN a můžete začít. Vaše kreditní karta může zůstat bezpečně v peněžence.',
      }
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.applyLanguage(this.currentLanguage);
    this.updateUI();
  }

  bindEvents() {
    // Desktop language switcher
    const desktopBtn = document.getElementById('languageToggle');
    if (desktopBtn) {
      desktopBtn.addEventListener('click', () => this.toggleLanguage());
    }

    // Mobile language switcher
    const mobileBtn = document.getElementById('mobileLanguageToggle');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => this.toggleLanguage());
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'cz' : 'en';
    localStorage.setItem('language', this.currentLanguage);
    this.applyLanguage(this.currentLanguage);
    this.updateUI();

    // Remove focus from button to reset hover state
    document.activeElement.blur();
  }

  applyLanguage(language) {
    const translations = this.translations[language];

    // Find all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });

    // Update document language
    document.documentElement.lang = language;
  }

  updateUI() {
    const isCzech = this.currentLanguage === 'cz';

    // Update desktop switcher
    const desktopFlag = document.querySelector('.language-switcher__flag');
    const desktopText = document.querySelector('.language-switcher__text');

    if (desktopFlag && desktopText) {
      desktopFlag.textContent = isCzech ? '🇨🇿' : '🇬🇧';
      desktopText.textContent = isCzech ? 'CZ' : 'EN';
    }

    // Update mobile switcher
    const mobileFlag = document.querySelector('.menu-overlay__language-flag');
    const mobileText = document.querySelector('.menu-overlay__language-text');

    if (mobileFlag && mobileText) {
      mobileFlag.textContent = isCzech ? '🇨🇿' : '🇬🇧';
      mobileText.textContent = isCzech ? 'CZ / EN' : 'EN / CZ';
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LanguageSwitcher();
});