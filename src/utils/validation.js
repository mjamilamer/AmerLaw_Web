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
      // Prepare and sanitize FormData
      const formData = new FormData(form);
      const sanitizedFormData = sanitizeFormData(formData);
      
      // Submit via AJAX to FormSubmit
      const response = await fetch(formAction, {
        method: 'POST',
        body: sanitizedFormData
      });

      if (response.ok) {
        // Show success message
        const successMessage = document.getElementById('form-success-message');
        if (successMessage) {
          successMessage.style.display = 'block';
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
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Show error message
      const successMessage = document.getElementById('form-success-message');
      if (successMessage) {
        successMessage.innerHTML = '<p>❌ There was an error sending your message. Please try again or contact us directly.</p>';
        successMessage.style.display = 'block';
        successMessage.style.background = '#f8d7da';
        successMessage.style.borderColor = '#f5c6cb';
        successMessage.style.color = '#721c24';
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

