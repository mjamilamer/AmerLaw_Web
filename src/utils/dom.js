/**
 * DOM utility functions with error handling
 */

/**
 * Safely query a single element
 * @param {string} selector - CSS selector
 * @param {HTMLElement} context - Optional context element
 * @returns {HTMLElement|null}
 */
export function $(selector, context = document) {
  const element = context.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
  }
  return element;
}

/**
 * Safely query multiple elements
 * @param {string} selector - CSS selector
 * @param {HTMLElement} context - Optional context element
 * @returns {NodeList}
 */
export function $$(selector, context = document) {
  return context.querySelectorAll(selector);
}

/**
 * Create an element with attributes and children
 * @param {string} tag - HTML tag name
 * @param {Object} attrs - Attributes object
 * @param {string|HTMLElement|Array} children - Child elements or text
 * @returns {HTMLElement}
 */
export function createElement(tag, attrs = {}, children = []) {
  const element = document.createElement(tag);
  
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'textContent') {
      element.textContent = value;
    } else if (key.startsWith('data-')) {
      element.setAttribute(key, value);
    } else {
      element[key] = value;
    }
  });
  
  const childrenArray = Array.isArray(children) ? children : [children];
  childrenArray.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement) {
      element.appendChild(child);
    }
  });
  
  return element;
}

/**
 * Safely set innerHTML with error handling
 * @param {HTMLElement} element - Target element
 * @param {string} html - HTML string
 */
export function setHTML(element, html) {
  if (!element) {
    console.error('Cannot set HTML: element is null');
    return;
  }
  element.innerHTML = html;
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string}
 */
export function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

