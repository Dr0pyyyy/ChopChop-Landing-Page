// Simple but effective parallax background
class ParallaxBackground {
  constructor() {
    this.scrollY = 0;
    this.ticking = false;
    this.blobs = [];
    this.init();
  }

  init() {
    this.blobs = document.querySelectorAll('.blob');

    // Listen to scroll
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // Initial position
    this.update();
  }

  onScroll() {
    this.scrollY = window.pageYOffset;

    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  update() {
    const scroll = this.scrollY;

    // Blob 1 - moves up slowly
    if (this.blobs[0]) {
      const y = -(scroll * 0.3);
      const x = Math.sin(scroll * 0.002) * 40;
      this.blobs[0].style.transform = `translate(${x}px, ${y}px)`;
    }

    // Blob 2 - moves down
    if (this.blobs[1]) {
      const y = scroll * 0.4;
      const x = Math.cos(scroll * 0.0025) * 50;
      this.blobs[1].style.transform = `translate(${x}px, ${y}px)`;
    }

    // Blob 3 - moves up fast
    if (this.blobs[2]) {
      const y = -(scroll * 0.5);
      const x = Math.sin(scroll * 0.003) * 60;
      this.blobs[2].style.transform = `translate(${x}px, ${y}px)`;
    }

    // Blob 4 - moves down fast
    if (this.blobs[3]) {
      const y = scroll * 0.6;
      const x = Math.cos(scroll * 0.0035) * 70;
      this.blobs[3].style.transform = `translate(${x}px, ${y}px)`;
    }

    // Blob 5 - moves with wave
    if (this.blobs[4]) {
      const y = scroll * 0.35;
      const x = Math.sin(scroll * 0.004) * 80;
      this.blobs[4].style.transform = `translate(${x}px, ${y}px)`;
    }

    // Blob 6 - moves up medium
    if (this.blobs[5]) {
      const y = -(scroll * 0.25);
      const x = Math.cos(scroll * 0.0045) * 55;
      this.blobs[5].style.transform = `translate(${x}px, ${y}px)`;
    }

    // Blob 7 - diagonal movement
    if (this.blobs[6]) {
      const y = scroll * 0.45;
      const x = Math.sin(scroll * 0.005) * 90;
      this.blobs[6].style.transform = `translate(${x}px, ${y}px)`;
    }

    // Blob 8 - circular motion
    if (this.blobs[7]) {
      const y = -(scroll * 0.4);
      const x = Math.cos(scroll * 0.006) * 75;
      this.blobs[7].style.transform = `translate(${x}px, ${y}px)`;
    }
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    new ParallaxBackground();
  }
});
