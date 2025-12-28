// iOS Safari Detection and Animation Disabler
(function() {
  'use strict';

  // Aggressive iOS Safari detection
  function isiOSSafari() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  // Disable animations completely on iOS Safari
  if (isiOSSafari()) {
    // Add CSS class to body for iOS-specific styling
    document.documentElement.classList.add('ios-safari');

    // Disable only problematic animations, preserve menu and other smooth animations
    const style = document.createElement('style');
    style.textContent = `
      /* Only disable carousel infinite scroll animations */
      .ios-safari .mockups-carousel__column-inner {
        animation: none !important;
        transform: translateY(0) !important;
      }

      /* Simplified credit card animations for iOS */
      .ios-safari .how-it-works__single-img #card-left,
      .ios-safari .how-it-works__single-img #card-right {
        transition: transform 0.4s ease !important;
        filter: none !important; /* Remove expensive filters */
        will-change: transform !important;
        backface-visibility: hidden !important;
      }

      .ios-safari .how-it-works__feature--animate .how-it-works__single-img #card-left {
        transform: translateX(-20px) translateY(8px) rotate(-3deg) scale(0.98) !important;
      }

      .ios-safari .how-it-works__feature--animate .how-it-works__single-img #card-right {
        transform: translateX(20px) translateY(-8px) rotate(3deg) scale(0.98) !important;
      }

      /* Preserve all other animations - menu, hover effects, etc. */
      /* Do NOT apply transform: none to everything */
    `;
    document.head.appendChild(style);

    console.log('iOS Safari detected - carousel animations disabled');
  }

})();

// ChopChop Landing Page - Header Scroll Effect
// Adds liquid glass effect when scrolling
(function() {
  'use strict';

  const header = document.querySelector('.header');

  if (!header) return;

  // Add scroll event listener
  window.addEventListener('scroll', function() {
    const scrolled = window.scrollY > 10; // Trigger after scrolling 10px

    if (scrolled) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true }); // Use passive for better performance

})();

// ChopChop Landing Page - Menu Functionality
// Handles hamburger menu open/close with slide-in animation

(function() {
  'use strict';

  // DOM Elements
  const menuBtn = document.querySelector('.header__menu-btn');
  const closeBtn = document.querySelector('.menu-overlay__close-btn');
  const menuOverlay = document.querySelector('.menu-overlay');
  const body = document.body;

  // State
  let isMenuOpen = false;

  // Debug for iOS
  console.log('Menu script loaded, initial menu state:', isMenuOpen);

  /**
   * Opens the menu overlay with slide-in animation from right
   */
  function openMenu() {
    isMenuOpen = true;

    // Add active class for animation
    menuOverlay.classList.add('menu-overlay--active');

    // Lock body scroll
    body.classList.add('menu-open');

    // Header is hidden via CSS using body.menu-open class

    // Update ARIA attributes for accessibility
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close menu');
    menuOverlay.setAttribute('aria-hidden', 'false');

    // Change hamburger icon to close icon
    const menuIcon = menuBtn.querySelector('.header__menu-icon');
    if (menuIcon) {
      menuIcon.src = 'icons/close.svg';
    }

    // Focus handled by menu for keyboard navigation
  }

  /**
   * Closes the menu overlay with slide-out animation to right
   */
  function closeMenu() {
    isMenuOpen = false;

    // Remove active class for animation
    menuOverlay.classList.remove('menu-overlay--active');

    // Unlock body scroll
    body.classList.remove('menu-open');

    // Header will show via CSS when body.menu-open class is removed

    // Update ARIA attributes for accessibility
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    menuOverlay.setAttribute('aria-hidden', 'true');

    // Change close icon back to hamburger icon
    const menuIcon = menuBtn.querySelector('.header__menu-icon');
    if (menuIcon) {
      menuIcon.src = 'icons/hamburger-menu.svg';
    }

    // Return focus to menu button for keyboard navigation (only if visible)
    if (menuBtn && !body.classList.contains('menu-open')) {
      menuBtn.focus();
    }
  }

  /**
   * Toggles menu state
   */
  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Event Listeners

  // Toggle menu when hamburger button is clicked
  if (menuBtn) {
    // Use touchstart on mobile for better responsiveness, click on desktop
    if ('ontouchstart' in window) {
      menuBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        toggleMenu();
      });
    } else {
      menuBtn.addEventListener('click', toggleMenu);
    }
  }

  // Close menu when close button in overlay is clicked
  if (closeBtn) {
    if ('ontouchstart' in window) {
      closeBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        closeMenu();
      });
    } else {
      closeBtn.addEventListener('click', closeMenu);
    }
  }

  // Close menu when Escape key is pressed (accessibility)
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });

  // Close menu when clicking outside the menu content (on overlay background)
  if (menuOverlay) {
    menuOverlay.addEventListener('click', function(event) {
      // Only close if clicking directly on the overlay (not on content inside)
      if (event.target === menuOverlay) {
        closeMenu();
      }
    });
  }

  // Prevent scrolling on menu overlay content
  if (menuOverlay) {
    menuOverlay.addEventListener('touchmove', function(event) {
      if (event.target === menuOverlay) {
        event.preventDefault();
      }
    }, { passive: false });
  }

  // Initialize ARIA attributes
  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (menuOverlay) {
    menuOverlay.setAttribute('aria-hidden', 'true');
  }

})();

// ChopChop Landing Page - Smooth Scrolling Navigation
// Handles smooth scrolling to sections when navigation links are clicked

(function() {
  'use strict';

  // Setup smooth scrolling for all anchor links
  function setupSmoothScrolling() {
    // Select all navigation links (both header and menu overlay)
    const headerNavLinks = document.querySelectorAll('.header__nav-link');
    const menuNavLinks = document.querySelectorAll('.menu-overlay__nav-link');
    const allNavLinks = [...headerNavLinks, ...menuNavLinks];

    allNavLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Close mobile menu if open
          const menuOverlay = document.querySelector('.menu-overlay');
          const body = document.body;
          const menuBtn = document.querySelector('.header__menu-btn');

          // Check if menu is open
          if (menuOverlay && menuOverlay.classList.contains('menu-overlay--active')) {
            // Close menu completely
            menuOverlay.classList.remove('menu-overlay--active');
            body.classList.remove('menu-open');

            // Reset hamburger icon
            const menuIcon = menuBtn ? menuBtn.querySelector('.header__menu-icon') : null;
            if (menuIcon) {
              menuIcon.src = 'icons/hamburger-menu.svg';
            }

            // Update button states
            if (menuBtn) {
              menuBtn.setAttribute('aria-expanded', 'false');
              menuBtn.setAttribute('aria-label', 'Open menu');
            }

            if (menuOverlay) {
              menuOverlay.setAttribute('aria-hidden', 'true');
            }

            // Wait for menu close animation before scrolling
            setTimeout(() => {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }, 200); // Increased delay
          } else {
            // No menu open, scroll immediately
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // Initialize smooth scrolling when DOM is loaded
  document.addEventListener('DOMContentLoaded', setupSmoothScrolling);

})();

// ChopChop Landing Page - Scroll Animation for Mockups
// Triggers animation when user scrolls into "How it works" section

(function() {
  'use strict';

  // Check if iOS Safari - if so, skip all animations
  function isiOSSafari() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  // DOM Elements
  const features = document.querySelectorAll('.how-it-works__feature');

  // Check iOS Safari - allow phone mockup animations but skip broken card animations
  const isIOSSafari = isiOSSafari();
  if (isIOSSafari) {
    console.log('iOS Safari detected - enabling safe scroll animations');
  }

  // Check if Intersection Observer is supported
  if ('IntersectionObserver' in window) {

    // Create observer for scroll detection
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-20% 0px -20% 0px', // Shrink viewport detection area - triggers when element is more centered
      threshold: 0.5 // Trigger when 50% of element is visible and centered on screen
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        // If element is in viewport and hasn't been animated yet
        if (entry.isIntersecting && !entry.target.classList.contains('how-it-works__feature--animate')) {
          // Add animation class to trigger mockup slide-in
          entry.target.classList.add('how-it-works__feature--animate');

          // Create particles for broken card animation (simplified on iOS Safari)
          if (entry.target.classList.contains('how-it-works__feature--no-card')) {
            if (isIOSSafari) {
              createCardParticlesSimplified(entry.target);
            } else {
              createCardParticles(entry.target);
            }
          }

          // Optional: unobserve after animation to prevent re-triggering
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all feature sections
    features.forEach(function(feature) {
      observer.observe(feature);
    });

  } else {
    // Fallback for browsers that don't support Intersection Observer
    // Just show all mockups immediately
    features.forEach(function(feature) {
      feature.classList.add('how-it-works__feature--animate');
    });
  }

  /**
   * Creates simplified particles for iOS Safari
   * Much simpler animation without complex transforms
   */
  function createCardParticlesSimplified(feature) {
    const container = feature.querySelector('.how-it-works__mockups--single');
    if (!container) return;

    // Only 3 simple particles for iOS
    for (let i = 0; i < 3; i++) {
      const particle = document.createElement('div');
      particle.style.width = '2px';
      particle.style.height = '10px';
      particle.style.background = '#A057FF';
      particle.style.position = 'absolute';
      particle.style.top = '50%';
      particle.style.left = '50%';
      particle.style.opacity = '0';
      particle.style.transition = 'all 0.3s ease';

      container.appendChild(particle);

      // Simple fade in/out
      setTimeout(() => {
        particle.style.opacity = '1';
        particle.style.transform = 'translateX(' + (Math.random() * 60 - 30) + 'px) translateY(' + (Math.random() * 60 - 30) + 'px)';
      }, 10);

      setTimeout(() => {
        particle.style.opacity = '0';
      }, 200);

      setTimeout(() => {
        particle.remove();
      }, 500);
    }
  }

  /**
   * Creates simple dash/line particles for snap effect
   * Uses only brand purple and black colors
   * All particles emanate from the center of the break
   */
  function createCardParticles(feature) {
    const container = feature.querySelector('.how-it-works__mockups--single');
    if (!container) return;

    const particleCount = 6; // Fewer particles for cleaner effect
    const colors = [
      '#A057FF', '#B67FFF', '#703AB3', // Brand purple gradient
      '#000000'  // Black
    ];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'card-particle-snap';

      // Random color from brand colors only
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Simple line/dash styling
      particle.style.width = '2px';
      particle.style.height = (Math.random() * 6 + 12) + 'px'; // 12-18px lines
      particle.style.background = color;
      particle.style.position = 'absolute';
      particle.style.pointerEvents = 'none';

      // All start from exact center (where card breaks)
      particle.style.top = '50%';
      particle.style.left = '50%';
      particle.style.transform = 'translate(-50%, -50%)';
      particle.style.opacity = '0';

      // Evenly distributed directions in a circle
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = Math.random() * 30 + 50; // 50-80px
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      // Rotate particle to point in the direction it's moving (convert radians to degrees + 90° offset)
      const rotation = (angle * 180 / Math.PI) + 90;
      const delay = Math.random() * 60;

      // Quick, sharp transition for snap effect
      particle.style.transition = `all ${350 + Math.random() * 80}ms ease-out ${delay}ms,
                                   opacity ${300}ms ease-out ${delay}ms`;

      container.appendChild(particle);

      // Trigger snap animation from center
      setTimeout(function() {
        particle.style.opacity = '1';
        particle.style.transform = `translate(${tx}px, ${ty}px) rotate(${rotation}deg)`;
      }, 10);

      // Quick fade out
      setTimeout(function() {
        particle.style.opacity = '0';
      }, 280 + delay);

      // Remove from DOM
      setTimeout(function() {
        particle.remove();
      }, 700 + delay);
    }
  }

})();
