/**
 * Form validation utilities
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate form field
 * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} field - Field to validate
 * @returns {boolean}
 */
export function validateField(field) {
  // Handle different field types
  const value = field.type === 'file' ? field.files : field.value.trim();
  const fieldName = field.name;
  const errorElement = document.getElementById(`${fieldName}-error`);
  
  if (!errorElement) return true;

  // Clear previous error
  errorElement.textContent = '';
  field.classList.remove('error');

  // Required field check (skip for file inputs, handled separately)
  if (field.hasAttribute('required') && field.type !== 'file') {
    const fieldValue = typeof value === 'string' ? value : field.value.trim();
    if (!fieldValue) {
      errorElement.textContent = 'This field is required';
      field.classList.add('error');
      return false;
    }
  }

  // Email validation
  if (field.type === 'email' && typeof value === 'string' && value && !isValidEmail(value)) {
    errorElement.textContent = 'Please enter a valid email address';
    field.classList.add('error');
    return false;
  }

  // Phone validation
  if (field.type === 'tel' && typeof value === 'string' && value) {
    const phoneRegex = /^[\d\s\(\)\-\+\.]{10,}$/;
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      errorElement.textContent = 'Please enter a valid phone number (at least 10 digits)';
      field.classList.add('error');
      return false;
    }
  }

  // Select/dropdown validation
  if (field.tagName === 'SELECT' && field.hasAttribute('required')) {
    const selectValue = field.value.trim();
    if (!selectValue) {
      errorElement.textContent = 'Please select an option';
      field.classList.add('error');
      return false;
    }
  }

  // Message length check
  if (fieldName === 'message' && typeof value === 'string' && value.length < 10) {
    errorElement.textContent = 'Message must be at least 10 characters';
    field.classList.add('error');
    return false;
  }

  // File validation
  if (field.type === 'file' && field.files && field.files.length > 0) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png', 'text/plain'];
    
    for (let i = 0; i < field.files.length; i++) {
      const file = field.files[i];
      if (file.size > maxSize) {
        errorElement.textContent = `File "${file.name}" exceeds 10MB limit`;
        field.classList.add('error');
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        errorElement.textContent = `File "${file.name}" is not an accepted format`;
        field.classList.add('error');
        return false;
      }
    }
  }

  return true;
}

/**
 * Initialize form validation
 * @param {HTMLFormElement} form - Form element
 */
export function initFormValidation(form) {
  if (!form) return;

  const fields = form.querySelectorAll('input[required], textarea[required], select[required]');

  // Real-time validation on blur
  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(field);
      }
    });
  });

  // Form submission validation
  form.addEventListener('submit', async (e) => {
    let isValid = true;

    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      e.preventDefault();
      // Focus first invalid field
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Add loading state
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.classList.add('loading');
      submitButton.textContent = 'Sending...';
      
      // Reset after 3 seconds (in case form doesn't redirect)
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
      }, 3000);
    }
  });
}

