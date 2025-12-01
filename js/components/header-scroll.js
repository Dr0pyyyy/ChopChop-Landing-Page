// Header scroll effect - Add glass effect when scrolling
document.addEventListener('DOMContentLoaded', function() {
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
  });
});