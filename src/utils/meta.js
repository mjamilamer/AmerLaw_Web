/**
 * Meta tag utilities
 * Updates HTML meta tags and titles dynamically using constants
 */
import { FIRM } from './constants.js';

/**
 * Update page title and meta tags for legal pages
 * @param {string} pageTitle - The specific page title (e.g., "Privacy Policy")
 * @param {string} description - The meta description
 */
export function updateLegalPageMeta(pageTitle, description) {
  // Update document title
  if (document.title) {
    document.title = `${pageTitle} | ${FIRM.name}`;
  }

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }

  // Update any firm name references in the page
  const firmNameElements = document.querySelectorAll('[data-firm-name]');
  firmNameElements.forEach(el => {
    el.textContent = FIRM.name;
  });
}

/**
 * Initialize meta tags for legal pages
 * Call this in legal-page.js after DOM is ready
 */
export function initLegalPageMeta() {
  // Get page-specific info from the page
  const pageTitle = document.querySelector('h1')?.textContent || '';
  const pageIntro = document.querySelector('.legal-page-intro')?.textContent || '';
  
  if (pageTitle) {
    updateLegalPageMeta(pageTitle, `${pageTitle} - ${FIRM.nameFull}. ${pageIntro}`);
  }

  // Update firm name in contact sections (look for any strong tag in address)
  const firmNameSpans = document.querySelectorAll('address strong');
  firmNameSpans.forEach(span => {
    // Update if it looks like a firm name (contains common law firm terms or is in address)
    if (span.closest('address')) {
      span.textContent = FIRM.name;
    }
  });

  // Update email addresses in contact sections
  const emailLinks = document.querySelectorAll('address a[href^="mailto:"]');
  emailLinks.forEach(link => {
    // Update if email domain matches old domain patterns or is in address section
    const oldDomains = ['smithlaw.com', 'info@smithlaw.com'];
    const needsUpdate = oldDomains.some(domain => link.href.includes(domain)) || 
                       (link.closest('address') && !link.href.includes(FIRM.contact.email.toLowerCase()));
    if (needsUpdate) {
      link.href = `mailto:${FIRM.contact.email}`;
      link.textContent = FIRM.contact.email;
    }
  });
}

