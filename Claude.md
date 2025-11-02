# Claude.md - Pravidla a Best Practices pro ChopChop Landing Page

## 8px System (KRITICKÉ)
- **Všechny hodnoty** pro spacing, sizing a positioning musí být násobky 8px
- Paddingy: 8px, 16px, 24px, 32px, 40px, 48px, 56px, 64px...
- Marginy: stejný systém jako paddingy
- Velikosti ikon: 16px, 24px, 32px, 40px, 48px...
- Gap mezi elementy: 8px, 16px, 24px...
- Border radius (pokud použit): 8px, 16px, 24px...
- Font sizes: pokud možno také násobky 8px (16px, 24px, 32px, 40px...)

## HTML Best Practices
- Používej sémantické HTML tagy (`<header>`, `<main>`, `<section>`, `<nav>`)
- Každý obrázek musí mít `alt` atribut
- Použij správnou heading hierarchii (h1 → h2 → h3)
- Meta tagy pro viewport a description

## CSS Best Practices
- Mobile-first media queries (min-width, ne max-width)
- Používej CSS custom properties (variables) pro barvy
- BEM metodologie nebo podobná konzistentní naming konvence
- Flexbox nebo CSS Grid pro layouty
- Žádné fixed width, pouze max-width pro responzivitu
- Smooth transitions pro interaktivní elementy (hamburgery, hovery)

## Přístupnost (A11Y)
- Minimální touch target: 48px × 48px (dodržuj 8px system, použij padding)
- Hamburger menu musí být keyboard accessible (Tab navigace)
- Focus states pro všechny interaktivní elementy
- Color contrast ratio minimálně 4.5:1 pro text
- ARIA labels kde je to vhodné

## Performance
- Optimalizuj obrázky (webp formát je preferovaný)
- Lazy loading pro obrázky mimo viewport
- Minifikuj CSS a JS v produkci
- Žádné zbytečné dependencies

## Responzivita
- Breakpointy: 768px (tablet), 1024px (desktop), 1440px (large desktop)
- Touch-friendly elementy na mobilu
- Testuj na různých viewport sizes

## Struktura Kódu
- Odsazení: 2 spaces
- Konzistentní formátování
- Komentáře pro složitější sekce
- Logické groupování CSS pravidel

## Animace a Transitions
- Používej `transform` a `opacity` pro lepší performance
- Duration: 200ms (rychlé), 300ms (standard), 400ms (pomalé)
- Easing: `ease-in-out` nebo `cubic-bezier` pro smooth animace
- Respektuj `prefers-reduced-motion` media query

## Naming Conventions
- CSS třídy: lowercase-with-dashes
- JavaScript proměnné: camelCase
- Константы: SCREAMING_SNAKE_CASE
- Descriptive názvy, ne zkratky

## Brand Konzistence
- Dodržuj přesné hex kódy barev (#F2F2F2, #2C2C2C, #A057FF)
- Brand color používej strategicky (CTA, akcenty, ne všude)
- Konzistentní spacing napříč celou stránkou
- pokud by jsi potřeboval nějakou barvu doplnit, tak zastav napiš mi jakou barvu, kam a proč by jsi ji chtěl a já ti pošlu z mé barvené palety