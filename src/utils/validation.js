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

    // Check if this is a Netlify form
    const isNetlifyForm = form.hasAttribute('data-netlify') || form.getAttribute('data-netlify') === 'true';
    
    if (!isNetlifyForm) {
      // If not a Netlify form, submit normally
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
      
      // Check if form has file uploads
      const fileInput = form.querySelector('input[type="file"]');
      const hasFiles = fileInput && fileInput.files && fileInput.files.length > 0;
      
      // Create sanitized FormData
      const sanitizedFormData = new FormData();
      for (const [key, value] of formData.entries()) {
        // Preserve files and hidden fields as-is
        if (value instanceof File || key.startsWith('_') || key === 'bot-field') {
          sanitizedFormData.append(key, value);
        } else if (typeof value === 'string') {
          // Sanitize string values
          const sanitized = value.trim();
          sanitizedFormData.append(key, sanitized);
        } else {
          sanitizedFormData.append(key, value);
        }
      }
      
      // Extract form data for submission
      const formDataForSubmission = {
        name: sanitizedFormData.get('name') || '',
        email: sanitizedFormData.get('email') || '',
        phone: sanitizedFormData.get('phone') || '',
        'practice-area': sanitizedFormData.get('practice-area') || '',
        message: sanitizedFormData.get('message') || '',
        files: fileInput?.files ? Array.from(fileInput.files) : []
      };

      // Check honeypot field (spam protection)
      const botField = sanitizedFormData.get('bot-field');
      if (botField && botField.trim() !== '') {
        // Bot detected - silently fail
        console.warn('Bot detected via honeypot field');
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.classList.remove('loading');
          submitButton.textContent = originalText;
        }
        return;
      }

      // Submit via AJAX to our Netlify Function (saves to DB + sends email)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      let response;
      try {
        response = await fetch('/.netlify/functions/save-contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataForSubmission),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timed out. Please try again.');
        }
        throw new Error('Network error. Please check your connection and try again.');
      }

      // Check response
      if (response.ok || response.status === 200) {
        const result = await response.json();

        // Show success message
        const successMessage = document.getElementById('form-success-message');
        if (successMessage) {
          let messageText = '✅ Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
          if (result.emailSent === false) {
            messageText += ' (Note: Email notification may be delayed)';
          }
          successMessage.style.display = 'block';
          successMessage.innerHTML = `<p>${messageText}</p>`;
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

