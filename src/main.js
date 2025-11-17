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
      initFormValidation(contactForm);
      initFileUpload(contactForm);
    }

    // Initialize contact form toggle
    initContactFormToggle();

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

/**
 * Expand contact form programmatically
 */
function expandContactForm() {
  const toggleButton = $('#contact-form-toggle');
  const contactForm = $('#contact-form');
  const contactSection = $('#contact');
  
  if (!toggleButton || !contactForm) return;
  
  // Check if already expanded
  const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
  if (isExpanded) return;
  
  // Expand form
  contactForm.classList.remove('contact-form-collapsed');
  contactForm.classList.add('contact-form-expanded');
  toggleButton.setAttribute('aria-expanded', 'true');
  toggleButton.textContent = 'Hide Form';
  
  // Scroll to contact section smoothly
  if (contactSection) {
    setTimeout(() => {
      const navbarHeight = $('#navbar')?.offsetHeight || 0;
      const sectionPosition = contactSection.offsetTop - navbarHeight - 20;
      window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
      });
    }, 100);
  }
}

/**
 * Initialize contact form toggle functionality
 */
function initContactFormToggle() {
  const toggleButton = $('#contact-form-toggle');
  const contactForm = $('#contact-form');
  
  if (!toggleButton || !contactForm) return;

  toggleButton.addEventListener('click', () => {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      // Collapse form
      contactForm.classList.remove('contact-form-expanded');
      contactForm.classList.add('contact-form-collapsed');
      toggleButton.setAttribute('aria-expanded', 'false');
      toggleButton.textContent = 'Send a Message';
    } else {
      // Expand form
      expandContactForm();
    }
  });
  
  // Handle "Request a Consultation" button clicks
  const consultationButtons = document.querySelectorAll('a[href="#contact"]');
  consultationButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      expandContactForm();
    });
  });
  
  // Auto-open form if URL hash is #contact
  if (window.location.hash === '#contact') {
    setTimeout(() => {
      expandContactForm();
    }, 500); // Small delay to ensure DOM is ready
  }
  
  // Handle hash changes (e.g., browser back/forward or direct navigation)
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#contact') {
      setTimeout(() => {
        expandContactForm();
      }, 100);
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
