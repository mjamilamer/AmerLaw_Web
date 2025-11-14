/**
 * Section rendering components
 */
import { $, setHTML, escapeHTML } from '../utils/dom.js';
import { FIRM } from '../utils/constants.js';
import { siteContent } from '../utils/content.js';

/**
 * Render hero section
 */
export function renderHero(heroData) {
  const heroEl = $('#hero');
  if (!heroEl) return;

  setHTML(heroEl, `
    <div class="hero-bg hero-bg-light"></div>
    <div class="hero-bg hero-bg-dark"></div>
    <div class="overlay reveal" role="banner">
      <h1>${escapeHTML(heroData.title)}</h1>
      <p>${escapeHTML(heroData.subtitle)}</p>
      <div class="hero-cta-group">
        <a href="#contact" class="btn btn-primary" aria-label="${escapeHTML(heroData.cta)}">${escapeHTML(heroData.cta)}</a>
      </div>
    </div>
  `);
}

/**
 * Render statistics/trust indicators section
 */
export function renderStats(stats) {
  const statsEl = $('#stats');
  if (!statsEl) return;

  const statsHTML = stats.map(stat => `
    <div class="stat-item reveal">
      <div class="stat-icon">${stat.icon}</div>
      <div class="stat-number">${escapeHTML(stat.number)}</div>
      <div class="stat-label">${escapeHTML(stat.label)}</div>
    </div>
  `).join('');

  setHTML(statsEl, `
    <div class="container">
      <div class="stats-grid">
        ${statsHTML}
      </div>
    </div>
  `);
}

/**
 * Render about section
 */
export function renderAbout(aboutData) {
  const aboutEl = $('#about');
  if (!aboutEl) return;

  setHTML(aboutEl, `
    <div class="container reveal">
      <h2>${escapeHTML(aboutData.heading)}</h2>
      <p>${escapeHTML(aboutData.text)}</p>
    </div>
  `);
}

/**
 * Render why choose solo practice section
 */
export function renderWhySolo(whySoloData) {
  const whySoloEl = $('#why-solo');
  if (!whySoloEl) return;

  setHTML(whySoloEl, `
    <div class="container reveal">
      <h2>${escapeHTML(whySoloData.heading)}</h2>
      <p>${escapeHTML(whySoloData.text)}</p>
    </div>
  `);
}

/**
 * Render practice areas section
 */
export function renderPracticeAreas(areas) {
  const practiceEl = $('#practice');
  if (!practiceEl) return;

  const cardsHTML = areas.map(area => `
    <article class="card" aria-label="Practice area: ${escapeHTML(area.title)}">
      <h3>${escapeHTML(area.title)}</h3>
      <p>${escapeHTML(area.desc)}</p>
    </article>
  `).join('');

  setHTML(practiceEl, `
    <div class="container reveal">
      <h2>Practice Areas</h2>
      <div class="grid" role="list">
        ${cardsHTML}
      </div>
    </div>
  `);
}

/**
 * Render team section
 */
export function renderTeam(teamMembers) {
  const teamEl = $('#team');
  if (!teamEl) return;

  const getInitials = (name) => {
    // Remove titles like ESQ, ESQ., etc. and get initials
    const nameWithoutTitles = name.replace(/,\s*(ESQ|ESQ\.|ESQUIRE).*$/i, '').trim();
    return nameWithoutTitles.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const teamCardsHTML = teamMembers.map(member => `
    <article class="team-card" aria-label="Team member: ${escapeHTML(member.name)}">
      <div class="team-avatar" aria-hidden="true">
        <div class="avatar-placeholder" aria-label="${escapeHTML(member.name)} avatar">
          ${getInitials(member.name)}
        </div>
      </div>
      <div class="team-info">
        <h3>${escapeHTML(member.name)}</h3>
        <p class="team-role">${escapeHTML(member.role)}</p>
        <p class="team-title">${escapeHTML(member.title)}</p>
        <p class="team-bio">${escapeHTML(member.bio)}</p>
        <a href="mailto:${escapeHTML(member.email)}" class="team-email" aria-label="Email ${escapeHTML(member.name)}">
          ${escapeHTML(member.email)}
        </a>
      </div>
    </article>
  `).join('');

  setHTML(teamEl, `
    <div class="container reveal">
      <h2>Meet Your Attorney</h2>
      <p class="team-intro">
        Work directly with an experienced attorney committed to your success.
      </p>
      <div class="team-grid" role="list">
        ${teamCardsHTML}
      </div>
    </div>
  `);
}

/**
 * Render contact section
 */
export function renderContact(contactData) {
  const contactEl = $('#contact');
  if (!contactEl) return;

  // Get practice areas for dropdown
  const practiceAreasOptions = siteContent.practiceAreas.map(area => 
    `<option value="${escapeHTML(area.title)}">${escapeHTML(area.title)}</option>`
  ).join('');

  setHTML(contactEl, `
    <div class="container contact-split reveal">
      <div>
        <h2>Contact Us</h2>
        <form name="contact" action="https://formsubmit.co/mjamilamer@gmail.com" method="POST" enctype="multipart/form-data" novalidate aria-label="Contact form" id="contact-form">
          <input type="hidden" name="_subject" value="New Contact Form Submission from Amer Law Website" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="box" />
          <input type="hidden" name="form-name" value="contact" />
          <div id="form-success-message" class="form-success-message" role="alert" aria-live="polite" style="display: none;">
            <p>✅ Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
          </div>
          <div class="form-group">
            <label for="contact-name">Full Name <span class="required" aria-label="required">*</span></label>
            <input 
              type="text" 
              id="contact-name"
              name="name" 
              required 
              maxlength="100"
              aria-required="true"
              aria-describedby="name-error"
            />
            <span id="name-error" class="error-message" role="alert" aria-live="polite"></span>
          </div>
          <div class="form-group">
            <label for="contact-email">Email <span class="required" aria-label="required">*</span></label>
            <input 
              type="email" 
              id="contact-email"
              name="email" 
              required 
              maxlength="254"
              aria-required="true"
              aria-describedby="email-error"
            />
            <span id="email-error" class="error-message" role="alert" aria-live="polite"></span>
          </div>
          <div class="form-group">
            <label for="contact-phone">Phone Number <span class="required" aria-label="required">*</span></label>
            <input 
              type="tel" 
              id="contact-phone"
              name="phone" 
              placeholder="(555) 123-4567"
              required 
              maxlength="20"
              pattern="[0-9\s\(\)\-\+\.]{10,}"
              aria-required="true"
              aria-describedby="phone-error"
            />
            <span id="phone-error" class="error-message" role="alert" aria-live="polite"></span>
          </div>
          <div class="form-group">
            <label for="contact-practice-area">Area of Practice <span class="required" aria-label="required">*</span></label>
            <select 
              id="contact-practice-area"
              name="practice-area" 
              required 
              aria-required="true"
              aria-describedby="practice-area-error"
            >
              <option value="">Select an area of practice...</option>
              ${practiceAreasOptions}
            </select>
            <span id="practice-area-error" class="error-message" role="alert" aria-live="polite"></span>
          </div>
          <div class="form-group">
            <label for="contact-message">Message <span class="required" aria-label="required">*</span></label>
            <textarea 
              id="contact-message"
              name="message" 
              required 
              maxlength="5000"
              minlength="10"
              aria-required="true"
              aria-describedby="message-error"
            ></textarea>
            <span id="message-error" class="error-message" role="alert" aria-live="polite"></span>
          </div>
          <div class="form-group">
            <label for="contact-documents">Attach Documents (Optional)</label>
            <div class="file-upload-wrapper">
              <input 
                type="file" 
                id="contact-documents"
                name="documents" 
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                aria-describedby="documents-help documents-error"
              />
              <label for="contact-documents" class="file-upload-label">
                <span class="file-upload-icon">📎</span>
                <span class="file-upload-text">Choose files or drag them here</span>
              </label>
              <div id="file-list" class="file-list" role="list" aria-live="polite"></div>
            </div>
            <p id="documents-help" class="form-help-text">
              Accepted formats: PDF, DOC, DOCX, JPG, PNG, TXT (Max 10MB per file)
            </p>
            <span id="documents-error" class="error-message" role="alert" aria-live="polite"></span>
          </div>
          <button type="submit" class="btn">Send Message</button>
        </form>
      </div>
      <div class="contact-info">
        <h3>Get in Touch</h3>
        <div class="business-card-wrapper">
          <img src="/Business_card.png" alt="Amer Law LLC Business Card" class="business-card-img" />
        </div>
        <address>
          <p>${escapeHTML(contactData.address)}</p>
          <p>
            <a href="tel:${contactData.phone.replace(/\s/g, '')}" aria-label="Call us">
              📞 ${escapeHTML(contactData.phone)}
            </a>
          </p>
          <p>
            <a href="mailto:${escapeHTML(contactData.email)}" aria-label="Email us">
              ✉️ ${escapeHTML(contactData.email)}
            </a>
          </p>
          ${contactData.hours ? `<div class="office-hours"><strong>Office Hours:</strong><br>${contactData.hours}</div>` : ''}
        </address>
        <iframe 
          src="https://maps.google.com/maps?q=${encodeURIComponent(contactData.address)}&output=embed"
          title="Office location map"
          loading="lazy"
          aria-label="Map showing office location at ${escapeHTML(contactData.address)}"
        ></iframe>
      </div>
    </div>
  `);
}

/**
 * Render testimonials section
 */
export function renderTestimonials(testimonials) {
  const testimonialsEl = $('#testimonials');
  if (!testimonialsEl) return;

  const testimonialsHTML = testimonials.map(testimonial => {
    const stars = '⭐'.repeat(testimonial.rating);
    return `
      <article class="testimonial-card reveal">
        <div class="testimonial-rating" aria-label="${testimonial.rating} out of 5 stars">${stars}</div>
        <blockquote class="testimonial-text">
          "${escapeHTML(testimonial.text)}"
        </blockquote>
        <div class="testimonial-author">
          <strong>${escapeHTML(testimonial.name)}</strong>
          <span class="testimonial-role">${escapeHTML(testimonial.role)}</span>
        </div>
      </article>
    `;
  }).join('');

  setHTML(testimonialsEl, `
    <div class="container reveal">
      <h2>What Our Clients Say</h2>
      <p class="section-intro">Don't just take our word for it. Here's what our clients have to say about their experience with us.</p>
      <div class="testimonials-grid">
        ${testimonialsHTML}
      </div>
    </div>
  `);
}

/**
 * Render FAQ section
 */
export function renderFAQ(faqItems) {
  const faqEl = $('#faq');
  if (!faqEl) return;

  const faqHTML = faqItems.map((item, index) => `
    <div class="faq-item reveal">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
        <span>${escapeHTML(item.question)}</span>
        <span class="faq-icon" aria-hidden="true">+</span>
      </button>
      <div class="faq-answer" id="faq-answer-${index}" role="region">
        <p>${escapeHTML(item.answer)}</p>
      </div>
    </div>
  `).join('');

  setHTML(faqEl, `
    <div class="container reveal">
      <h2>Frequently Asked Questions</h2>
      <p class="section-intro">Find answers to common questions about our legal services and processes.</p>
      <div class="faq-container">
        ${faqHTML}
      </div>
    </div>
  `);
}

/**
 * Render awards section
 */
export function renderAwards(awards) {
  const awardsEl = $('#awards');
  if (!awardsEl) return;

  const awardsHTML = awards.map(award => `
    <div class="award-item reveal">
      <div class="award-icon">🏆</div>
      <div class="award-content">
        <h3>${escapeHTML(award.title)}</h3>
        <p class="award-org">${escapeHTML(award.organization)}</p>
        <p class="award-year">${escapeHTML(award.year)}</p>
      </div>
    </div>
  `).join('');

  setHTML(awardsEl, `
    <div class="container reveal">
      <h2>Awards & Recognition</h2>
      <p class="section-intro">Our commitment to excellence has been recognized by leading legal organizations.</p>
      <div class="awards-grid">
        ${awardsHTML}
      </div>
    </div>
  `);
}

/**
 * Render newsletter signup section
 */
export function renderNewsletter() {
  const newsletterEl = $('#newsletter');
  if (!newsletterEl) return;

  setHTML(newsletterEl, `
    <div class="container reveal">
      <div class="newsletter-box">
        <h2>Stay Informed</h2>
        <p>Subscribe to our newsletter for legal insights, firm updates, and helpful resources.</p>
        <form name="newsletter" method="POST" data-netlify="true" class="newsletter-form">
          <input type="hidden" name="form-name" value="newsletter" />
          <div class="newsletter-input-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email address" 
              required
              aria-label="Email address for newsletter"
            />
            <button type="submit" class="btn">Subscribe</button>
          </div>
          <p class="newsletter-disclaimer">We respect your privacy. Unsubscribe at any time.</p>
        </form>
      </div>
    </div>
  `);
}

/**
 * Render emergency banner
 */
export function renderEmergencyBanner(contactData) {
  const bannerEl = $('#emergency-banner');
  if (!bannerEl) return;

  setHTML(bannerEl, `
    <div class="emergency-banner" role="alert">
      <div class="container">
        <span class="emergency-text">🚨 ${escapeHTML(contactData.emergency || 'Emergency Legal Support')}</span>
        <a href="tel:${contactData.emergency ? contactData.emergency.replace(/\D/g, '') : contactData.phone.replace(/\D/g, '')}" class="emergency-link">
          Call Now: ${escapeHTML(contactData.emergency || contactData.phone)}
        </a>
      </div>
    </div>
  `);
}

/**
 * Render footer with enhanced content
 */
export function renderFooter(footerData, socialLinks) {
  const footerEl = $('#footer');
  if (!footerEl) return;

  const linksHTML = footerData.links.map(link => {
    return `<a href="${escapeHTML(link.href)}">${escapeHTML(link.label)}</a>`;
  }).join('');

  const socialHTML = Object.entries(socialLinks).map(([platform, url]) => {
    const icons = {
      facebook: '📘',
      twitter: '🐦',
      linkedin: '💼',
      instagram: '📷'
    };
    return `
      <a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer" aria-label="Follow us on ${platform}">
        ${icons[platform] || '🔗'}
      </a>
    `;
  }).join('');

  // Format phone number for tel: link (remove non-digits)
  const phoneDigits = FIRM.contact.phone.replace(/\D/g, '');

  setHTML(footerEl, `
    <div class="footer-content">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-section">
            <h3>${escapeHTML(FIRM.name)}</h3>
            <p>Trusted legal representation for over 50 years. Protecting your rights and delivering results.</p>
            <div class="social-links">
              ${socialHTML}
            </div>
          </div>
          <div class="footer-section">
            <h4>Quick Links</h4>
            <nav aria-label="Footer navigation">
              ${linksHTML}
            </nav>
          </div>
          <div class="footer-section">
            <h4>Contact</h4>
            <address>
              <p>${escapeHTML(FIRM.contact.address)}</p>
              <p><a href="tel:${phoneDigits}">${escapeHTML(FIRM.contact.phone)}</a></p>
              <p><a href="mailto:${escapeHTML(FIRM.contact.email)}">${escapeHTML(FIRM.contact.email)}</a></p>
            </address>
          </div>
        </div>
        <div class="footer-bottom">
          <p>${escapeHTML(footerData.copyright)}</p>
        </div>
      </div>
    </div>
  `);
}

