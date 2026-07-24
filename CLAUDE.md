# ChopChop Landing Page - Coding Conventions

Static marketing website at chopchop.cz. No build process, no framework.

---

## Tech Stack
- Vanilla HTML/CSS/JavaScript
- EmailJS for form submission (service: `service_rsymfz9`)
- Hosting: self-managed VPS (Hetzner), served by Caddy at chopchop.cz — deployed via GitHub Actions rsync (`.github/workflows/deploy.yml`)

## CSS Architecture

### Design System
- **Spacing:** 8px base unit (`--spacing-1` = 8px through `--spacing-8` = 64px)
- **Transitions:** Fast (200ms), Standard (300ms), Slow (400ms)
- **Breakpoints:** Mobile (base), Tablet (768px), Desktop (1024px), Large (1440px)
- **Approach:** Mobile-first responsive design

### CSS Variables (in `css/variables.css`)
```css
/* Light theme */
--color-bg: #F2F2F2;
--color-text: #2C2C2C;
--color-brand: #A057FF;

/* Dark theme */
--color-bg: #1a1a1a;
--color-text: #e0e0e0;
--color-brand: #B366FF;
```

### Naming Convention
- BEM-inspired: `.component__element--modifier`
- Examples: `.header__logo`, `.project-card__title`, `.arch-node--brand`

### File Structure
```
css/
  main.css              # Master stylesheet (imports all)
  base.css              # Reset and base styles
  variables.css         # CSS custom properties
  ios-fixes.css         # iOS Safari workarounds
  components/
    header.css          # Fixed header with glass morphism
    hero.css            # Hero section
    mockups-carousel.css
    how-it-works.css
    currency-slider.css
    occasion-cards.css
    join-us.css         # Email signup form
    footer.css
    language-switcher.css
    theme-switcher.css
```

## JavaScript

### File Structure
```
script.js                # Entry point (loaded from index.html)
js/
  language-switcher.js   # i18n (EN/CZ)
  theme-switcher.js       # Dark/light mode
  parallax.js             # Scroll animations
  mockup-switcher.js      # Swaps mockup images by theme + language
  components/
    form-handler.js      # EmailJS form submission
```

### Internationalization (i18n)
- `data-translate` attributes on HTML elements
- Language switcher in `js/language-switcher.js`
- Supported: English (EN), Czech (CZ)
- Auto-detection: Browser language > localStorage > English default
- All user-visible text must have `data-translate` attribute

### Theme System
- `data-theme="dark"` / `data-theme="light"` on `<html>`
- System preference detection via `matchMedia('prefers-color-scheme: dark')`
- Manual override persisted in localStorage
- Mockup images swap based on theme + language: `mockups/{lang}/{theme}/`

## Performance Rules
- iOS Safari: Disable complex animations (carousel, 3D transforms)
- Use `loading="lazy"` on images
- Passive event listeners for scroll/resize
- `requestAnimationFrame` for animations
- Respect `prefers-reduced-motion`

## SEO
- Meta tags, Open Graph, Twitter Cards
- Structured data (Organization + Website schema)
- hreflang tags for EN/CZ
- robots.txt + sitemap.xml
- gzip, caching, security headers, HTTPS redirect handled by Caddy on the VPS
