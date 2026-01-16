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

    // Initialize collapsible read more sections
    initCollapsibleSections();

    // Initialize practice area modals
    initPracticeAreaModals();

    // Initialize FAQ accordion
    initFAQ();

    // Initialize scroll animations
    revealOnScroll();

    // Initialize navigation enhancements
    initNavEnhancements();

    // Initialize hero image rotation
    initHeroRotation();

    if (import.meta.env.DEV) {
      console.log('Application initialized successfully');
    }
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
 * Initialize collapsible read more sections
 */
function initCollapsibleSections() {
  // Handle About section read more
  const aboutReadMoreBtn = document.querySelector('#about .read-more-btn');
  if (aboutReadMoreBtn) {
    aboutReadMoreBtn.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const preview = this.parentElement.querySelector('.collapsible-preview');
      const full = this.parentElement.querySelector('.collapsible-full');
      const readMoreText = this.querySelector('.read-more-text');
      const readLessText = this.querySelector('.read-less-text');

      if (isExpanded) {
        // Collapse
        preview.style.display = 'block';
        full.style.display = 'none';
        readMoreText.style.display = 'inline';
        readLessText.style.display = 'none';
        this.setAttribute('aria-expanded', 'false');
      } else {
        // Expand
        preview.style.display = 'none';
        full.style.display = 'block';
        readMoreText.style.display = 'none';
        readLessText.style.display = 'inline';
        this.setAttribute('aria-expanded', 'true');
        // Smooth scroll to show more content
        this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // Handle Team section read more buttons
  const teamReadMoreBtns = document.querySelectorAll('.team-read-more');
  teamReadMoreBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const target = document.getElementById(targetId);
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const preview = this.parentElement.querySelector('.collapsible-preview');
      const readMoreText = this.querySelector('.read-more-text');
      const readLessText = this.querySelector('.read-less-text');

      if (isExpanded) {
        // Collapse
        preview.style.display = 'block';
        if (target) target.style.display = 'none';
        readMoreText.style.display = 'inline';
        readLessText.style.display = 'none';
        this.setAttribute('aria-expanded', 'false');
      } else {
        // Expand
        preview.style.display = 'none';
        if (target) target.style.display = 'block';
        readMoreText.style.display = 'none';
        readLessText.style.display = 'inline';
        this.setAttribute('aria-expanded', 'true');
        // Smooth scroll to show more content
        this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

/**
 * Initialize practice area modals
 */
function initPracticeAreaModals() {
  const modal = document.getElementById('practice-modal');
  const modalOverlay = modal?.querySelector('.practice-modal-overlay');
  const modalClose = modal?.querySelector('.practice-modal-close');
  const modalTitle = modal?.querySelector('#practice-modal-title');
  const modalBody = modal?.querySelector('.practice-modal-body');
  const modalImageWrapper = modal?.querySelector('#practice-modal-image-wrapper');
  const modalImage = modal?.querySelector('#practice-modal-image');
  const practiceCards = document.querySelectorAll('.practice-area-card');

  if (!modal || !practiceCards.length) return;

  function openModal(title, detailed, image) {
    if (!modalTitle || !modalBody) return;
    
    modalTitle.textContent = title;
    
    // Format detailed text into paragraphs
    // Split by sentences that end with periods, then group into logical paragraphs
    // Each sentence ending with a period followed by a capital letter starts a potential new paragraph
    let formattedText = detailed;
    
    // First, ensure proper spacing around periods
    formattedText = formattedText.replace(/\.\s+/g, '. ');
    
    // Split into sentences (period followed by space and capital letter)
    const sentences = formattedText.split(/(?<=\.)\s+(?=[A-Z])/).filter(s => s.trim().length > 0);
    
    // Group sentences into paragraphs (2-3 sentences per paragraph for readability)
    const paragraphs = [];
    let currentParagraph = [];
    
    sentences.forEach((sentence, index) => {
      const trimmed = sentence.trim();
      if (!trimmed) return;
      
      currentParagraph.push(trimmed);
      
      // Create a new paragraph every 2-3 sentences, or if sentence is very long
      const isLongSentence = trimmed.length > 200;
      const shouldBreak = currentParagraph.length >= 2 && (
        currentParagraph.length >= 3 || 
        isLongSentence ||
        index === sentences.length - 1 // Always break on last sentence
      );
      
      if (shouldBreak) {
        paragraphs.push(currentParagraph.join(' '));
        currentParagraph = [];
      }
    });
    
    // Add any remaining sentences
    if (currentParagraph.length > 0) {
      paragraphs.push(currentParagraph.join(' '));
    }
    
    // Format as HTML paragraphs with proper spacing
    formattedText = paragraphs
      .map(p => `<p>${p}</p>`)
      .join('');
    
    modalBody.innerHTML = formattedText;
    
    // Handle image
    if (image && modalImage && modalImageWrapper) {
      modalImage.src = image;
      modalImage.alt = title;
      modalImageWrapper.style.display = 'block';
      modal.classList.add('practice-modal-has-image');
    } else if (modalImageWrapper) {
      modalImageWrapper.style.display = 'none';
      modal.classList.remove('practice-modal-has-image');
    }
    
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('practice-modal-open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    document.body.style.overflowX = 'hidden'; // Prevent horizontal scrolling
    
    // Focus management
    modalClose?.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('practice-modal-open');
    document.body.style.overflow = ''; // Restore scrolling
    document.body.style.overflowX = ''; // Restore horizontal scrolling
  }

  // Open modal on card click
  practiceCards.forEach(card => {
    const handleClick = () => {
      const title = card.getAttribute('data-practice-title');
      const detailed = card.getAttribute('data-practice-detailed');
      const image = card.getAttribute('data-practice-image');
      if (title && detailed) {
        openModal(title, detailed, image);
      }
    };

    card.addEventListener('click', handleClick);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    });
  });

  // Close modal handlers
  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('practice-modal-open')) {
      closeModal();
    }
  });

  // Close modal CTA button - expand contact form
  const modalCTA = modal.querySelector('.practice-modal-cta');
  if (modalCTA) {
    modalCTA.addEventListener('click', () => {
      closeModal();
      // Small delay to allow modal to close first
      setTimeout(() => {
        expandContactForm();
      }, 300);
    });
  }
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
