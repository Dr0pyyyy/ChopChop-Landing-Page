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

  /**
   * Opens the menu overlay with slide-in animation from right
   */
  function openMenu() {
    isMenuOpen = true;

    // Add active class for animation
    menuOverlay.classList.add('menu-overlay--active');

    // Lock body scroll
    body.classList.add('menu-open');

    // Hide header when menu is open
    body.classList.add('menu-open-hide-header');

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

    // Show header when menu is closed
    body.classList.remove('menu-open-hide-header');

    // Update ARIA attributes for accessibility
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    menuOverlay.setAttribute('aria-hidden', 'true');

    // Change close icon back to hamburger icon
    const menuIcon = menuBtn.querySelector('.header__menu-icon');
    if (menuIcon) {
      menuIcon.src = 'icons/hamburger-menu.svg';
    }

    // Return focus to menu button for keyboard navigation
    menuBtn.focus();
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
    menuBtn.addEventListener('click', toggleMenu);
  }

  // Close menu when close button in overlay is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
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
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Close mobile menu if open
          const menuOverlay = document.querySelector('.menu-overlay');
          const body = document.body;
          const menuBtn = document.querySelector('.header__menu-btn');

          const menuWasOpen = menuOverlay && menuOverlay.classList.contains('menu-overlay--active');

          if (menuWasOpen) {
            menuOverlay.classList.remove('menu-overlay--active');
            body.classList.remove('menu-open');

            // Update aria states
            menuOverlay.setAttribute('aria-hidden', 'true');
            if (menuBtn) {
              menuBtn.setAttribute('aria-expanded', 'false');
            }

            // Wait for menu close animation before scrolling
            setTimeout(() => {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }, 150); // Small delay for menu animation
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

  // DOM Elements
  const features = document.querySelectorAll('.how-it-works__feature');

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

          // Create particles for broken card animation
          if (entry.target.classList.contains('how-it-works__feature--no-card')) {
            createCardParticles(entry.target);
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
