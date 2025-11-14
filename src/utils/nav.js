/**
 * Navigation utilities
 * Handles active link highlighting and smooth scrolling
 */
import { $ } from './dom.js';

/**
 * Update active navigation link based on scroll position
 */
export function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navbar nav a[href^="#"]');
  
  if (sections.length === 0 || navLinks.length === 0) return;

  const scrollPosition = window.scrollY + 100; // Offset for navbar

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/**
 * Initialize navigation enhancements
 */
export function initNavEnhancements() {
  // Update active link on scroll
  const handleScroll = () => {
    updateActiveNavLink();
  };

  // Throttle scroll events for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Update on initial load
  updateActiveNavLink();
}

