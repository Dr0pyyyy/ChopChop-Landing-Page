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

    // Update ARIA attributes for accessibility
    menuBtn.setAttribute('aria-expanded', 'true');
    menuOverlay.setAttribute('aria-hidden', 'false');

    // Focus on close button for keyboard navigation
    closeBtn.focus();
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

    // Update ARIA attributes for accessibility
    menuBtn.setAttribute('aria-expanded', 'false');
    menuOverlay.setAttribute('aria-hidden', 'true');

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

  // Open menu when hamburger button is clicked
  if (menuBtn) {
    menuBtn.addEventListener('click', openMenu);
  }

  // Close menu when close button is clicked
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
      rootMargin: '0px',
      threshold: 0.6 // Trigger when 60% of element is visible
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        // If element is in viewport and hasn't been animated yet
        if (entry.isIntersecting && !entry.target.classList.contains('how-it-works__feature--animate')) {
          // Add animation class to trigger mockup slide-in
          entry.target.classList.add('how-it-works__feature--animate');

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

})();
