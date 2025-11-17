/**
 * Security utilities for input sanitization and validation
 * Prevents XSS, injection attacks, and validates inputs
 */

/**
 * Sanitize string input to prevent XSS attacks
 * Removes HTML tags and escapes special characters
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  // Remove null bytes
  let sanitized = input.replace(/\0/g, '');
  
  // Remove HTML tags
  const div = document.createElement('div');
  div.textContent = sanitized;
  sanitized = div.textContent || div.innerText || '';
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
}

/**
 * Sanitize text for email content (preserves line breaks but removes HTML)
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
export function sanitizeForEmail(text) {
  if (typeof text !== 'string') return '';
  
  // Remove null bytes and control characters (except newlines and tabs)
  let sanitized = text.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
  
  // Remove HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // Escape HTML entities
  const div = document.createElement('div');
  div.textContent = sanitized;
  sanitized = div.textContent || div.innerText || '';
  
  // Limit length to prevent email injection
  const maxLength = 10000;
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
}

/**
 * Validate and sanitize name field
 * Prevents injection attacks and validates format
 * @param {string} name - Name to validate
 * @returns {object} {isValid: boolean, sanitized: string, error: string}
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return { isValid: false, sanitized: '', error: 'Name is required' };
  }
  
  let sanitized = sanitizeInput(name);
  
  // Length validation
  if (sanitized.length < 2) {
    return { isValid: false, sanitized: '', error: 'Name must be at least 2 characters' };
  }
  
  if (sanitized.length > 100) {
    return { isValid: false, sanitized: '', error: 'Name must be less than 100 characters' };
  }
  
  // Allow letters, spaces, hyphens, apostrophes, and periods (for titles like Dr., Jr., etc.)
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
  if (!nameRegex.test(sanitized)) {
    return { isValid: false, sanitized: '', error: 'Name can only contain letters, spaces, hyphens, apostrophes, and periods' };
  }
  
  // Check for suspicious patterns (potential injection attempts)
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // onclick, onerror, etc.
    /data:text\/html/i,
    /vbscript:/i,
    /expression\(/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitized)) {
      return { isValid: false, sanitized: '', error: 'Invalid characters detected in name' };
    }
  }
  
  return { isValid: true, sanitized, error: '' };
}

/**
 * Enhanced email validation (RFC 5322 compliant)
 * @param {string} email - Email to validate
 * @returns {object} {isValid: boolean, sanitized: string, error: string}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { isValid: false, sanitized: '', error: 'Email is required' };
  }
  
  let sanitized = email.trim().toLowerCase();
  
  // Basic length check
  if (sanitized.length > 254) {
    return { isValid: false, sanitized: '', error: 'Email address is too long' };
  }
  
  // RFC 5322 compliant email regex (simplified but secure)
  const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  
  if (!emailRegex.test(sanitized)) {
    return { isValid: false, sanitized: '', error: 'Please enter a valid email address' };
  }
  
  // Check for email injection attempts
  const injectionPatterns = [
    /\r|\n|\r\n/, // Newline characters
    /bcc:|cc:|to:|from:/i, // Email header injection
    /content-type:/i,
    /mime-version:/i
  ];
  
  for (const pattern of injectionPatterns) {
    if (pattern.test(sanitized)) {
      return { isValid: false, sanitized: '', error: 'Invalid email format detected' };
    }
  }
  
  // Additional security: check for suspicious domains
  const suspiciousDomains = ['localhost', '127.0.0.1', '0.0.0.0'];
  const domain = sanitized.split('@')[1];
  if (domain && suspiciousDomains.includes(domain.toLowerCase())) {
    return { isValid: false, sanitized: '', error: 'Invalid email domain' };
  }
  
  return { isValid: true, sanitized, error: '' };
}

/**
 * Validate US phone number format
 * @param {string} phone - Phone number to validate
 * @returns {object} {isValid: boolean, sanitized: string, error: string}
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, sanitized: '', error: 'Phone number is required' };
  }
  
  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  // US phone numbers: 10 digits (or 11 with country code 1)
  if (digitsOnly.length === 11 && digitsOnly[0] === '1') {
    // Remove leading 1
    const sanitized = digitsOnly.substring(1);
    if (sanitized.length === 10) {
      // Format: (XXX) XXX-XXXX
      const formatted = `(${sanitized.substring(0, 3)}) ${sanitized.substring(3, 6)}-${sanitized.substring(6)}`;
      return { isValid: true, sanitized: formatted, error: '' };
    }
  }
  
  if (digitsOnly.length === 10) {
    // Format: (XXX) XXX-XXXX
    const formatted = `(${digitsOnly.substring(0, 3)}) ${digitsOnly.substring(3, 6)}-${digitsOnly.substring(6)}`;
    return { isValid: true, sanitized: formatted, error: '' };
  }
  
  return { isValid: false, sanitized: '', error: 'Please enter a valid 10-digit US phone number' };
}

/**
 * Validate message content
 * @param {string} message - Message to validate
 * @returns {object} {isValid: boolean, sanitized: string, error: string}
 */
export function validateMessage(message) {
  if (!message || typeof message !== 'string') {
    return { isValid: false, sanitized: '', error: 'Message is required' };
  }
  
  let sanitized = sanitizeForEmail(message);
  
  // Length validation
  if (sanitized.length < 10) {
    return { isValid: false, sanitized: '', error: 'Message must be at least 10 characters' };
  }
  
  if (sanitized.length > 5000) {
    return { isValid: false, sanitized: '', error: 'Message must be less than 5000 characters' };
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /vbscript:/i,
    /expression\(/i,
    /<iframe/i,
    /<object/i,
    /<embed/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitized)) {
      return { isValid: false, sanitized: '', error: 'Message contains invalid content' };
    }
  }
  
  // Check for excessive repetition (potential spam)
  const words = sanitized.toLowerCase().split(/\s+/);
  const wordCounts = {};
  for (const word of words) {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  }
  
  // If any word appears more than 20 times, flag as potential spam
  for (const [word, count] of Object.entries(wordCounts)) {
    if (word.length > 3 && count > 20) {
      return { isValid: false, sanitized: '', error: 'Message appears to be spam' };
    }
  }
  
  return { isValid: true, sanitized, error: '' };
}

/**
 * Validate file upload
 * @param {File} file - File to validate
 * @returns {object} {isValid: boolean, error: string}
 */
export function validateFile(file) {
  if (!file || !(file instanceof File)) {
    return { isValid: false, error: 'Invalid file' };
  }
  
  // Size validation (2MB per file to stay within 10MB/month Netlify Forms limit)
  const maxSize = 2 * 1024 * 1024; // 2MB per file
  if (file.size > maxSize) {
    return { isValid: false, error: `File "${file.name}" exceeds 2MB limit per file` };
  }
  
  if (file.size === 0) {
    return { isValid: false, error: `File "${file.name}" is empty` };
  }
  
  // Allowed MIME types
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'text/plain'
  ];
  
  // Check MIME type
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: `File "${file.name}" is not an accepted format` };
  }
  
  // Validate file extension matches MIME type
  const extension = file.name.split('.').pop()?.toLowerCase();
  const extensionMap = {
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'txt': 'text/plain'
  };
  
  if (extension && extensionMap[extension] && extensionMap[extension] !== file.type) {
    return { isValid: false, error: `File "${file.name}" extension does not match file type` };
  }
  
  // Check for suspicious file names
  const suspiciousPatterns = [
    /\.(exe|bat|cmd|com|scr|vbs|js|jar|app|deb|rpm|dmg)$/i,
    /\.(php|asp|jsp|cgi|sh|py|rb|pl)$/i,
    /^\./, // Hidden files
    /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\.|$)/i // Windows reserved names
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(file.name)) {
      return { isValid: false, error: `File "${file.name}" is not allowed` };
    }
  }
  
  // Check for null bytes in filename (path traversal attempt)
  if (file.name.includes('\0')) {
    return { isValid: false, error: `File "${file.name}" contains invalid characters` };
  }
  
  return { isValid: true, error: '' };
}

/**
 * Validate practice area selection
 * @param {string} practiceArea - Selected practice area
 * @param {Array} allowedAreas - Array of allowed practice areas
 * @returns {object} {isValid: boolean, sanitized: string, error: string}
 */
export function validatePracticeArea(practiceArea, allowedAreas = []) {
  if (!practiceArea || typeof practiceArea !== 'string') {
    return { isValid: false, sanitized: '', error: 'Please select an area of practice' };
  }
  
  const sanitized = sanitizeInput(practiceArea);
  
  // If allowed areas are provided, validate against them
  if (allowedAreas.length > 0) {
    if (!allowedAreas.includes(sanitized)) {
      return { isValid: false, sanitized: '', error: 'Invalid practice area selected' };
    }
  }
  
  // Check for injection attempts
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitized)) {
      return { isValid: false, sanitized: '', error: 'Invalid practice area' };
    }
  }
  
  return { isValid: true, sanitized, error: '' };
}

/**
 * Sanitize all form data before submission
 * @param {FormData} formData - FormData object to sanitize
 * @returns {FormData} Sanitized FormData
 */
export function sanitizeFormData(formData) {
  const sanitizedData = new FormData();
  
  for (const [key, value] of formData.entries()) {
    // Skip hidden fields and files (files are validated separately)
    if (key.startsWith('_') || value instanceof File) {
      sanitizedData.append(key, value);
      continue;
    }
    
    // Sanitize string values
    if (typeof value === 'string') {
      const sanitized = sanitizeForEmail(value);
      sanitizedData.append(key, sanitized);
    } else {
      sanitizedData.append(key, value);
    }
  }
  
  return sanitizedData;
}

