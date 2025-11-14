/**
 * Navigation component
 */
import { $, createElement, setHTML } from '../utils/dom.js';
import { on, throttle } from '../utils/events.js';

export function renderNavbar(navItems) {
  const navbarEl = $('#navbar');
  if (!navbarEl) return;

  // Clear existing content
  navbarEl.innerHTML = '';

  // Add logo (CSS watermark design - non-clickable)
  const logoContainer = createElement('div', {
    className: 'navbar-logo'
  });
  const logoWatermark = createElement('div', {
    className: 'logo-watermark'
  });
  const logoA = createElement('span', {
    className: 'logo-letter logo-a',
    textContent: 'A'
  });
  const logoL = createElement('span', {
    className: 'logo-letter logo-l',
    textContent: 'L'
  });
  logoWatermark.appendChild(logoA);
  logoWatermark.appendChild(logoL);
  logoContainer.appendChild(logoWatermark);
  navbarEl.appendChild(logoContainer);

  const nav = createElement('nav', {
    role: 'navigation',
    'aria-label': 'Main navigation'
  });

  const navLinks = navItems.map(item => {
    const link = createElement('a', {
      href: `#${item.target}`,
      textContent: item.label,
      'aria-label': `Navigate to ${item.label} section`
    });
    return link;
  });

  navLinks.forEach(link => nav.appendChild(link));
  navbarEl.appendChild(nav);

  // Mobile menu button
  const menuButton = createElement('button', {
    className: 'menu-toggle',
    'aria-label': 'Toggle mobile menu',
    'aria-expanded': 'false',
    innerHTML: '<span></span><span></span><span></span>'
  });
  navbarEl.appendChild(menuButton);

  // Enhanced smooth scroll for anchor links
  navLinks.forEach(link => {
    on(link, 'click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = $(`#${targetId}`);
      if (target) {
        const navbarHeight = navbarEl.offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight - 20; // 20px offset
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navbarEl.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        
        // Update active link immediately
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  on(menuButton, 'click', () => {
    const isOpen = navbarEl.classList.contains('menu-open');
    navbarEl.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  });

  // Navbar scroll effect (throttled for performance)
  const handleScroll = throttle(() => {
    if (window.scrollY > 50) {
      navbarEl.classList.add('scrolled');
    } else {
      navbarEl.classList.remove('scrolled');
    }
  }, 100);

  on(window, 'scroll', handleScroll);
}

/**
 * Render navbar for legal pages
 * Links point to the main index.html page with anchors
 */
export function renderNavbarForLegalPage(navItems) {
  const navbarEl = $('#navbar');
  if (!navbarEl) return;

  // Clear existing content
  navbarEl.innerHTML = '';

  // Add logo (CSS watermark design - non-clickable)
  const logoContainer = createElement('div', {
    className: 'navbar-logo'
  });
  const logoWatermark = createElement('div', {
    className: 'logo-watermark'
  });
  const logoA = createElement('span', {
    className: 'logo-letter logo-a',
    textContent: 'A'
  });
  const logoL = createElement('span', {
    className: 'logo-letter logo-l',
    textContent: 'L'
  });
  logoWatermark.appendChild(logoA);
  logoWatermark.appendChild(logoL);
  logoContainer.appendChild(logoWatermark);
  navbarEl.appendChild(logoContainer);

  const nav = createElement('nav', {
    role: 'navigation',
    'aria-label': 'Main navigation'
  });

  // Create navigation links pointing to main page
  const navLinks = navItems.map(item => {
    const href = item.target === 'hero' 
      ? '../index.html' 
      : `../index.html#${item.target}`;
    
    return createElement('a', {
      href,
      textContent: item.label,
      'aria-label': `Navigate to ${item.label}`
    });
  });

  navLinks.forEach(link => nav.appendChild(link));
  navbarEl.appendChild(nav);

  // Mobile menu button
  const menuButton = createElement('button', {
    className: 'menu-toggle',
    'aria-label': 'Toggle mobile menu',
    'aria-expanded': 'false',
    innerHTML: '<span></span><span></span><span></span>'
  });
  navbarEl.appendChild(menuButton);

  // Mobile menu toggle
  on(menuButton, 'click', () => {
    const isOpen = navbarEl.classList.contains('menu-open');
    navbarEl.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  });

  // Navbar scroll effect (throttled for performance)
  const handleScroll = throttle(() => {
    if (window.scrollY > 50) {
      navbarEl.classList.add('scrolled');
    } else {
      navbarEl.classList.remove('scrolled');
    }
  }, 100);

  on(window, 'scroll', handleScroll);
}

