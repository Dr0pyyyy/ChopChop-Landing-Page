// EmailJS form handler
document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS
  emailjs.init('1UgJ64EQ86W82JOUv');

  const form = document.querySelector('.join-us__form');
  const submitButton = document.querySelector('.join-us__submit');
  const originalButtonText = submitButton.textContent;

  // Function to show error messages
  function showError(message) {
    submitButton.textContent = message;
    submitButton.style.backgroundColor = '#dc3545';
    submitButton.disabled = false;
    submitButton.style.opacity = '1';

    // Reset button after 3 seconds
    setTimeout(() => {
      submitButton.textContent = originalButtonText;
      submitButton.style.backgroundColor = '';
    }, 3000);
  }

  if (form && submitButton) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validate required fields
      const email = form.email.value.trim();
      const occupation = form.occupation.value.trim();
      const help = form.help.value.trim();

      // Check if all required fields are filled
      if (!email || !occupation || !help) {
        showError('Please fill in all required fields');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return;
      }

      // Show loading state
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      submitButton.style.opacity = '0.7';

      // Prepare email data
      const templateParams = {
        to_email: 'chopchop.devv@gmail.com',
        from_email: form.email.value,
        occupation: form.occupation.value,
        help: form.help.value,
        message: form.message.value,
        reply_to: form.email.value
      };

      // Send email via EmailJS
      emailjs.send('service_rsymfz9', 'template_vvy9xaf', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);

          // Show success message
          submitButton.textContent = 'Sent successfully!';
          submitButton.style.backgroundColor = '#28a745';

          // Reset form and button after 3 seconds
          setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.style.backgroundColor = '';
            form.reset();
          }, 3000);

        }, function(error) {
          console.log('FAILED...', error);

          // Show error message
          submitButton.textContent = 'Error - try again';
          submitButton.style.backgroundColor = '#dc3545';

          // Reset button state after 3 seconds
          setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.style.backgroundColor = '';
          }, 3000);
        });
    });
  }
});