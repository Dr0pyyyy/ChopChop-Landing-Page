// Parallax Effect - Movement only on scroll
class Parallax {
  constructor() {
    this.scrollY = 0;
    this.ticking = false;
    this.circles = [];
    this.dots = [];
    this.init();
  }

  init() {
    this.circles = document.querySelectorAll('.parallax-circle');
    this.dots = document.querySelectorAll('.parallax-dot');

    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // Initial update
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
    const cycleLength = 2000; // Cycle every 2000px of scroll

    // Circles fall from top or rise from bottom - cycle continuously
    this.circles.forEach((circle, index) => {
      const fromTop = index % 2 === 0;
      const speed = 0.8 + (index * 0.2);
      const offset = index * 400; // Stagger each circle

      // Use modulo to cycle the movement
      const scrollCycle = (scroll + offset) % cycleLength;

      if (fromTop) {
        // Fall from top - cycles continuously
        const yOffset = -(800 - scrollCycle * speed);
        const xOffset = Math.sin(scroll * 0.003 + index) * 100;
        const scale = Math.min(1, Math.max(0.5, 1 - Math.abs(yOffset) / 1000));

        circle.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scale})`;
      } else {
        // Rise from bottom - cycles continuously
        const yOffset = 800 - scrollCycle * speed;
        const xOffset = Math.cos(scroll * 0.003 + index) * 100;
        const scale = Math.min(1, Math.max(0.5, 1 - Math.abs(yOffset) / 1000));

        circle.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scale})`;
      }
    });

    // Dots bounce in and out - cycle continuously
    this.dots.forEach((dot, index) => {
      const fromTop = index % 2 === 1;
      const speed = 1 + (index * 0.3);
      const offset = index * 300; // Stagger each dot

      const scrollCycle = (scroll + offset) % cycleLength;

      if (fromTop) {
        // Drop from top - cycles continuously
        const yOffset = -(600 - scrollCycle * speed);
        const xOffset = Math.sin(scroll * 0.005 + index) * 120;
        const scale = Math.min(1.2, Math.max(0.3, 1 - Math.abs(yOffset) / 800));
        const rotation = scroll * 0.1 + (index * 20);

        dot.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scale}) rotate(${rotation}deg)`;
      } else {
        // Rise from bottom - cycles continuously
        const yOffset = 600 - scrollCycle * speed;
        const xOffset = Math.cos(scroll * 0.005 + index) * 120;
        const scale = Math.min(1.2, Math.max(0.3, 1 - Math.abs(yOffset) / 800));
        const rotation = -(scroll * 0.1 + (index * 20));

        dot.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scale}) rotate(${rotation}deg)`;
      }
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    new Parallax();
  }
});
