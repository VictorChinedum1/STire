/* ============================================================
   STIRE — contact-main.js
   Contact Page without Loader
   ============================================================ */

/* ---- CUSTOM CURSOR ---- */
const cursor     = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animCursor() {
  if (cursor)     cursor.style.transform     = `translate(${mx - 5}px, ${my - 5}px)`;
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  if (cursorRing) cursorRing.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .svc-card, .proj-card, .stat-item, .testi-card, .contact-info-card, .social-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor && cursor.classList.add('hover');
    cursorRing && cursorRing.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor && cursor.classList.remove('hover');
    cursorRing && cursorRing.classList.remove('hover');
  });
});

/* ---- NAV SCROLL ---- */
let lastScroll = 0;
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    nav.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
    nav.classList.remove('scroll-up');
    nav.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
    nav.classList.remove('scroll-down');
    nav.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});

/* ---- SCROLL REVEAL ---- */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ---- SCROLL TO TOP ---- */
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
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
}

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
