/**
 * Form validation utilities
 * Enhanced with security measures
 */
import {
  validateName,
  validateEmail,
  validatePhone,
  validateMessage,
  validateFile,
  validatePracticeArea,
  sanitizeFormData
} from './security.js';

/**
 * Validate form field with enhanced security
 * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} field - Field to validate
 * @param {Array} allowedPracticeAreas - Optional array of allowed practice areas
 * @returns {boolean}
 */
export function validateField(field, allowedPracticeAreas = []) {
  const fieldName = field.name;
  const errorElement = document.getElementById(`${fieldName}-error`);
  
  if (!errorElement) return true;

  // Clear previous error
  errorElement.textContent = '';
  field.classList.remove('error');

  // Handle file inputs separately
  if (field.type === 'file') {
    if (field.files && field.files.length > 0) {
      for (let i = 0; i < field.files.length; i++) {
        const file = field.files[i];
        const validation = validateFile(file);
        if (!validation.isValid) {
          errorElement.textContent = validation.error;
          field.classList.add('error');
          return false;
        }
      }
    }
    return true;
  }

  // Get field value
  const value = field.value;
  if (!value && field.hasAttribute('required')) {
    errorElement.textContent = 'This field is required';
    field.classList.add('error');
    return false;
  }

  if (!value) return true; // Optional field, no validation needed

  // Validate based on field name and type
  let validation;

  switch (fieldName) {
    case 'name':
      validation = validateName(value);
      if (!validation.isValid) {
        errorElement.textContent = validation.error;
        field.classList.add('error');
        return false;
      }
      // Update field with sanitized value
      if (field.value !== validation.sanitized) {
        field.value = validation.sanitized;
      }
      return true;

    case 'email':
      validation = validateEmail(value);
      if (!validation.isValid) {
        errorElement.textContent = validation.error;
        field.classList.add('error');
        return false;
      }
      // Update field with sanitized value
      if (field.value !== validation.sanitized) {
        field.value = validation.sanitized;
      }
      return true;

    case 'phone':
      validation = validatePhone(value);
      if (!validation.isValid) {
        errorElement.textContent = validation.error;
        field.classList.add('error');
        return false;
      }
      // Update field with formatted value
      if (field.value !== validation.sanitized) {
        field.value = validation.sanitized;
      }
      return true;

    case 'message':
      validation = validateMessage(value);
      if (!validation.isValid) {
        errorElement.textContent = validation.error;
        field.classList.add('error');
        return false;
      }
      return true;

    case 'practice-area':
      validation = validatePracticeArea(value, allowedPracticeAreas);
      if (!validation.isValid) {
        errorElement.textContent = validation.error;
        field.classList.add('error');
        return false;
      }
      return true;

    default:
      // Generic validation for other fields
      if (field.hasAttribute('required') && !value.trim()) {
        errorElement.textContent = 'This field is required';
        field.classList.add('error');
        return false;
      }
      return true;
  }
}

/**
 * Initialize form validation
 * @param {HTMLFormElement} form - Form element
 * @param {Array} allowedPracticeAreas - Optional array of allowed practice areas
 */
export function initFormValidation(form, allowedPracticeAreas = []) {
  if (!form) return;

  // Get practice areas from select options if not provided
  if (allowedPracticeAreas.length === 0) {
    const practiceAreaSelect = form.querySelector('select[name="practice-area"]');
    if (practiceAreaSelect) {
      allowedPracticeAreas = Array.from(practiceAreaSelect.options)
        .map(option => option.value)
        .filter(value => value !== '');
    }
  }

  const fields = form.querySelectorAll('input[required], textarea[required], select[required]');

  // Real-time validation on blur
  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field, allowedPracticeAreas));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(field, allowedPracticeAreas);
      }
    });
  });

  // Form submission validation and AJAX submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Always prevent default to handle with AJAX
    
    let isValid = true;

    fields.forEach(field => {
      if (!validateField(field, allowedPracticeAreas)) {
        isValid = false;
      }
    });

    if (!isValid) {
      // Focus first invalid field
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Get form action and prepare FormData
    const formAction = form.getAttribute('action');
    if (!formAction || !formAction.includes('formsubmit.co')) {
      // Fallback to regular submission if not FormSubmit
      form.submit();
      return;
    }

    // Add loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : 'Send Message';
    
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add('loading');
      submitButton.textContent = 'Sending...';
    }

    try {
      // Prepare FormData - sanitize text fields but preserve files
      const formData = new FormData(form);
      
      // Create new FormData with sanitized text values
      const sanitizedFormData = new FormData();
      for (const [key, value] of formData.entries()) {
        // Preserve files and hidden fields as-is
        if (value instanceof File || key.startsWith('_')) {
          sanitizedFormData.append(key, value);
        } else if (typeof value === 'string') {
          // Sanitize string values
          const sanitized = value.trim();
          sanitizedFormData.append(key, sanitized);
        } else {
          sanitizedFormData.append(key, value);
        }
      }
      
      // Submit via AJAX to FormSubmit
      // FormSubmit accepts standard form submissions and returns HTML/redirect
      const response = await fetch(formAction, {
        method: 'POST',
        body: sanitizedFormData,
        redirect: 'follow'
      });

      // FormSubmit typically returns 200 with HTML or redirects
      // If we get here without error, assume success
      if (response.status === 200 || response.status === 0 || response.ok) {
        // Show success message
        const successMessage = document.getElementById('form-success-message');
        if (successMessage) {
          successMessage.style.display = 'block';
          successMessage.innerHTML = '<p>✅ Thank you! Your message has been sent successfully. We\'ll get back to you soon.</p>';
          // Reset error styling if it was set
          successMessage.style.background = '';
          successMessage.style.borderColor = '';
          successMessage.style.color = '';
          // Scroll to success message
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Reset form
        form.reset();
        
        // Clear file list if exists
        const fileList = document.getElementById('file-list');
        if (fileList) {
          fileList.innerHTML = '';
        }
        
        // Reset button
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.classList.remove('loading');
          submitButton.textContent = originalText;
        }
      } else {
        throw new Error(`Form submission failed with status: ${response.status}`);
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Check error type
      let errorMessage = 'There was an error sending your message. Please try again or contact us directly.';
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to the server. Please check your connection and try again.';
      }
      
      // Show error message
      const successMessage = document.getElementById('form-success-message');
      if (successMessage) {
        successMessage.innerHTML = `<p>❌ ${errorMessage}</p>`;
        successMessage.style.display = 'block';
        successMessage.style.background = '#f8d7da';
        successMessage.style.borderColor = '#f5c6cb';
        successMessage.style.color = '#721c24';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      // Reset button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
      }
    }
  });
}

