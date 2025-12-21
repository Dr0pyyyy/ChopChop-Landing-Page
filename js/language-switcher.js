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

        // Currency and occasions
        'feature-currency': 'Use any currency',
        'feature-currency-desc': 'Split bills in euros, dollars, pounds, or any currency your group prefers - we handle the rest.',
        'feature-occasions': 'Use for any occassion',
        'card-trip-title': 'Going on a trip',
        'card-trip-desc': 'Planning a vacation with friends? ChopChop tracks every shared expense. Focus on making memories, not doing math.',
        'card-night-title': 'Splitting after night out',
        'card-night-desc': 'Drinks, appetizers, split cabs—night outs add up fast. Log expenses quickly and settle up without awkward conversations.',
        'card-housing-title': 'Shared housing? No problem!',
        'card-housing-desc': 'Rent, utilities, groceries—living together means sharing costs. Track everything effortlessly so everyone pays their fair share.',

        // Join Us form
        'join-love': 'Love What We\'re Building?',
        'join-us-title': 'Join Us',
        'form-email': 'Email',
        'form-occupation': 'What do you do?',
        'form-help': 'How you wanna help us?',
        'form-message': 'Any other message for us?',
        'form-submit': 'Get in touch',

        // Expanded descriptions
        'feature-create-groups-expanded-1': 'Set up a group for your friends, family, or colleagues and keep all your shared expenses perfectly organized in one place.',
        'feature-create-groups-expanded-2': 'Whether you\'re planning a trip, sharing rent, or just keeping track of everyday costs, it\'s the easiest way to stay on top of who owes what.',
        'feature-invite-friends-expanded-1': 'Invite your friends, family, or teammates using a simple QR code or link and start sharing expenses right away.',
        'feature-invite-friends-expanded-2': 'You can even add virtual members to include everyone in the balance — great for tracking costs for kids, guests, or anyone who\'s not in the app yet.',
        'feature-add-transactions-expanded-1': 'Easily record who paid what in any currency and keep your group finances crystal clear.',
        'feature-add-transactions-expanded-2': 'Whether you\'re traveling abroad or managing shared expenses at home, you\'ll always stay in control of your payments and balances.',
        'feature-split-bills-expanded-1': 'ChopChop takes care of the math for you — it automatically figures out who owes whom and splits every bill fairly.',
        'feature-split-bills-expanded-2': 'Whether it\'s dinner with friends, a group trip, or shared rent, you\'ll always know exactly where everyone stands.',
        'feature-no-card-expanded-1': 'Setting up your account only takes a few moments, and you\'ll be ready to go right away. It\'s simple, secure, and designed to make your life easier.',
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
        'feature-no-card': 'Bez citlivých údajů',
        'feature-no-card-desc': 'Stačí nám jen váš IBAN a můžete začít. Vaše kreditní karta či jiné citlivé údaje může zůstat bezpečně v peněžence.',

        // Měny a příležitosti
        'feature-currency': 'Použijte libovolnou měnu',
        'feature-currency-desc': 'Rozdělujte účty v eurech, dolarech, librách nebo v jakékoli měně, kterou vaše skupina preferuje - o zbytek se postaráme.',
        'feature-occasions': 'Použijte ChopChop při jakékoli příležitosti',
        'card-trip-title': 'Jdete na výlet',
        'card-trip-desc': 'Plánujete dovolenou s přáteli? ChopChop sleduje každý sdílený výdaj. Soustřeďte se na vytváření vzpomínek, ne na počítání.',
        'card-night-title': 'Rozdělení po večírku',
        'card-night-desc': 'Užívejte si společné chvíle bez přemýšlení, kdo co platil. ChopChop se postará o rozdělení útraty za drinky, jídlo i cestu domů, aby peníze nikdy nekazily zábavu.',
        'card-housing-title': 'Sdílené bydlení? Žádný problém!',
        'card-housing-desc': 'Nájem, energie, potraviny—život společně znamená sdílení nákladů. Sledujte vše bez námahy, aby každý platil svůj spravedlivý podíl.',

        // Join Us formulář
        'join-love': 'Líbí se vám, co budujeme?',
        'join-us-title': 'Připojte se k nám',
        'form-email': 'Email',
        'form-occupation': 'Co děláte?',
        'form-help': 'Jak nám chcete pomoci?',
        'form-message': 'Máte pro nás nějakou další zprávu?',
        'form-submit': 'Spojit se s námi',

        // Rozšířené popisy
        'feature-create-groups-expanded-1': 'Nastavte skupinu pro přátele, rodinu nebo kolegy a uchovejte všechny sdílené výdaje perfektně organizované na jednom místě.',
        'feature-create-groups-expanded-2': 'Ať už plánujete výlet, sdílíte nájem, nebo jen sledujete běžné náklady, je to nejsnazší způsob, jak mít přehled o tom, kdo komu dluží.',
        'feature-invite-friends-expanded-1': 'Pozvěte přátele, rodinu nebo kolegy pomocí jednoduchého QR kódu nebo odkazu a začněte okamžitě sdílet výdaje.',
        'feature-invite-friends-expanded-2': 'Můžete dokonce přidat virtuální členy, abyste zahrnuli všechny do bilanace — skvělé pro sledování nákladů dětí, hostů nebo kohokoli, kdo ještě nemá aplikaci.',
        'feature-add-transactions-expanded-1': 'Snadno zaznamenejte, kdo co zaplatil v jakékoli měně a udržujte finance vaší skupiny křišťálově čisté.',
        'feature-add-transactions-expanded-2': 'Ať už cestujete do zahraničí nebo spravujete sdílené výdaje doma, vždy budete mít kontrolu nad svými platbami a zůstatky.',
        'feature-split-bills-expanded-1': 'ChopChop se postará o matematiku za vás — automaticky zjistí, kdo komu dluží a spravedlivě rozdělí každý účet.',
        'feature-split-bills-expanded-2': 'Ať už jde o večeři s přáteli, skupinový výlet nebo sdílený nájem, vždy budete přesně vědět, jak na tom všichni jsou.',
        'feature-no-card-expanded-1': 'Nastavení účtu trvá jen několik okamžiků a budete připraveni okamžitě začít. Je to jednoduché, bezpečné a navržené tak, aby vám usnadnilo život.',
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

    // Dispatch custom event for mockup switcher
    document.dispatchEvent(new CustomEvent('languageChanged'));

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