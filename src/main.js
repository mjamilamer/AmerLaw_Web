/**
 * Main application entry point
 * Refactored with component-based architecture
 */
import "./styles.css";
import { siteContent } from "./utils/content.js";
import { revealOnScroll } from "./utils/animate.js";
import { renderNavbar } from "./components/navbar.js";
import {
  renderHero,
  renderStats,
  renderAbout,
  renderWhySolo,
  renderPracticeAreas,
  renderTeam,
  renderTestimonials,
  renderAwards,
  renderFAQ,
  renderContact,
  renderNewsletter,
  renderFooter
} from "./components/sections.js";
import { initFormValidation } from "./utils/validation.js";
import { initNavEnhancements } from "./utils/nav.js";
import { initFileUpload } from "./utils/file-upload.js";
import { $ } from "./utils/dom.js";

/**
 * Initialize the application
 */
function init() {
  try {
    // Render all components
    renderNavbar(siteContent.nav);
    renderHero(siteContent.hero);
    renderStats(siteContent.stats);
    renderAbout(siteContent.about);
    renderWhySolo(siteContent.whySolo);
    renderPracticeAreas(siteContent.practiceAreas);
    // Team section now integrated into About section for solo practice
    renderTeam(siteContent.team);
    renderTestimonials(siteContent.testimonials);
    renderAwards(siteContent.awards);
    renderFAQ(siteContent.faq);
    renderContact(siteContent.contact);
    renderNewsletter();
    renderFooter(siteContent.footer, siteContent.social);

    // Initialize form validation
    const contactForm = $('form[name="contact"]');
    if (contactForm) {
      // Set success redirect URL to current page with success parameter
      const successUrlInput = $('#form-success-url');
      if (successUrlInput) {
        const currentUrl = window.location.origin + window.location.pathname;
        successUrlInput.value = `${currentUrl}?success=true#contact`;
      }
      
      // Check if form was submitted successfully
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('success') === 'true') {
        const successMessage = $('#form-success-message');
        if (successMessage) {
          successMessage.style.display = 'block';
          // Scroll to form
          const contactSection = $('#contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          // Clear URL parameter
          window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
        }
      }
      
      initFormValidation(contactForm);
      initFileUpload(contactForm);
    }

    // Initialize FAQ accordion
    initFAQ();

    // Initialize scroll animations
    revealOnScroll();

    // Initialize navigation enhancements
    initNavEnhancements();

    // Initialize hero image rotation
    initHeroRotation();

    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}

/**
 * Initialize FAQ accordion functionality
 */
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      const answer = question.nextElementSibling;
      
      // Close all other FAQs
      faqQuestions.forEach(q => {
        if (q !== question) {
          q.setAttribute('aria-expanded', 'false');
          q.nextElementSibling.classList.remove('active');
          q.querySelector('.faq-icon').textContent = '+';
        }
      });
      
      // Toggle current FAQ
      question.setAttribute('aria-expanded', !isExpanded);
      answer.classList.toggle('active');
      question.querySelector('.faq-icon').textContent = isExpanded ? '+' : '−';
    });
  });
}

/**
 * Initialize hero image rotation between light and dark versions
 */
function initHeroRotation() {
  const heroEl = $('#hero');
  if (!heroEl) return;

  // Start with light version (default)
  let isDark = false;
  
  // Rotate every 8 seconds with smooth fade transition
  setInterval(() => {
    isDark = !isDark;
    if (isDark) {
      heroEl.classList.add('hero-dark');
    } else {
      heroEl.classList.remove('hero-dark');
    }
  }, 8000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
