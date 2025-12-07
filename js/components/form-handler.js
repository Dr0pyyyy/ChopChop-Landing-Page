// Simple mailto form handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.join-us__form');
  const submitButton = document.querySelector('.join-us__submit');
  const originalButtonText = submitButton.textContent;

  if (form && submitButton) {
    form.addEventListener('submit', function(e) {
      // Show feedback and let mailto handle the rest
      submitButton.textContent = 'Opening email...';
      submitButton.disabled = true;
      submitButton.style.opacity = '0.7';

      // Reset button after 3 seconds
      setTimeout(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        form.reset();
      }, 3000);

      // Form will submit naturally via mailto
    });
  }
});

// Alternative: EmailJS implementation (uncomment if you prefer EmailJS)
/*
// First, add EmailJS script to HTML head:
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS (you'll need to get your own IDs from emailjs.com)
  emailjs.init('YOUR_PUBLIC_KEY');

  const form = document.querySelector('.join-us__form');
  const submitButton = document.querySelector('.join-us__submit');
  const originalButtonText = submitButton.textContent;

  if (form && submitButton) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Show loading state
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      submitButton.style.opacity = '0.7';

      // Prepare email data
      const templateParams = {
        to_email: 'equipayy@gmail.com',
        from_email: form.email.value,
        occupation: form.occupation.value,
        help: form.help.value,
        message: form.message.value,
        reply_to: form.email.value
      };

      // Send email via EmailJS
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          // Redirect to thank you page
          window.location.href = '/thank-you.html';
        }, function(error) {
          console.log('FAILED...', error);
          alert('Sorry, there was an error sending your message. Please try again.');

          // Reset button state
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
          submitButton.style.opacity = '1';
        });
    });
  }
});
*/