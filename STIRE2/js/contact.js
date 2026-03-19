/* ============================================================
   STIRE — contact.js
   Contact Form & Scroll to Top
   ============================================================ */

/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    const requiredFields = ['name', 'email', 'service', 'message'];
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!data[field] || data[field].trim() === '') {
        isValid = false;
        showError(field, 'This field is required');
      } else {
        clearError(field);
      }
    });
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
      isValid = false;
      showError('email', 'Please enter a valid email address');
    }
    
    if (isValid) {
      // Show success message
      showSuccessMessage();
      
      // In a real implementation, you would send this data to a server
      console.log('Form submitted:', data);
      
      // Reset form
      contactForm.reset();
    }
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const existingError = field.parentNode.querySelector('.error-message');
  
  if (existingError) {
    existingError.remove();
  }
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.color = 'var(--gold)';
  errorDiv.style.fontSize = '0.85rem';
  errorDiv.style.marginTop = '0.25rem';
  
  field.parentNode.appendChild(errorDiv);
  field.style.borderColor = 'var(--gold)';
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const existingError = field.parentNode.querySelector('.error-message');
  
  if (existingError) {
    existingError.remove();
  }
  
  field.style.borderColor = '';
}

function showSuccessMessage() {
  // Remove existing success message
  const existingMessage = document.querySelector('.success-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create success message
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.innerHTML = `
    <div style="background: var(--gold); color: var(--dark); padding: 1rem 2rem; border-radius: 8px; margin-bottom: 2rem; text-align: center; font-weight: 500;">
      ✦ Thank you for your message! We'll get back to you within 24 hours.
    </div>
  `;
  
  // Insert before form
  contactForm.parentNode.insertBefore(successDiv, contactForm);
  
  // Remove after 5 seconds
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

/* ---- SCROLL TO TOP ---- */
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.pointerEvents = 'auto';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.pointerEvents = 'none';
  }
});

// Scroll to top when clicked
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* ---- FORM FIELD ANIMATIONS ---- */
const formInputs = document.querySelectorAll('input, textarea, select');
formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentNode.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.parentNode.classList.remove('focused');
    }
  });
  
  // Check on load if field has value
  if (input.value) {
    input.parentNode.classList.add('focused');
  }
});
