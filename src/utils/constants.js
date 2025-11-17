/**
 * Firm Constants
 * Centralized configuration for easy customization
 * Update these values to rebrand the entire site
 */

export const FIRM = {
  // Firm Name
  name: "Amer Law LLC",
  nameFull: "AMER LAW LLC ATTORNEYS AT LAW",
  // Display name for hero section (matches business card style)
  nameDisplay: "Amer Law LLC",
  nameSubtitle: "Attorney at Law",
  
  // Contact Information
  // Can be overridden via environment variables (VITE_CONTACT_*)
  contact: {
    phone: import.meta.env.VITE_CONTACT_PHONE || "973-356-6222",
    emergency: import.meta.env.VITE_CONTACT_EMERGENCY || import.meta.env.VITE_CONTACT_PHONE || "973-356-6222",
    email: import.meta.env.VITE_CONTACT_EMAIL || "WAELAMER@AMERLAWLLC.COM",
    address: import.meta.env.VITE_CONTACT_ADDRESS || "123 Main Street, Newark, NJ 07102",
    hours: import.meta.env.VITE_CONTACT_HOURS || "Monday - Friday: 8:00 AM - 6:00 PM<br>Saturday: 9:00 AM - 2:00 PM<br>Sunday: Closed"
  },
  
  // Email Domain (used for team member emails)
  emailDomain: import.meta.env.VITE_EMAIL_DOMAIN || "amerlawllc.com",
  
  // Social Media Handles
  // Can be overridden via environment variables (VITE_SOCIAL_*)
  social: {
    handle: import.meta.env.VITE_SOCIAL_HANDLE || "amerlawllc", // Used for social media URLs
    facebook: import.meta.env.VITE_SOCIAL_FACEBOOK || "https://facebook.com/amerlawllc",
    twitter: import.meta.env.VITE_SOCIAL_TWITTER || "https://twitter.com/amerlawllc",
    linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || "https://linkedin.com/company/amerlawllc",
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || "https://instagram.com/amerlawllc"
  },
  
  // Location Information
  // Can be overridden via environment variables (VITE_LOCATION_*)
  location: {
    city: import.meta.env.VITE_LOCATION_CITY || "Newark",
    state: import.meta.env.VITE_LOCATION_STATE || "New Jersey",
    stateAbbr: import.meta.env.VITE_LOCATION_STATE_ABBR || "NJ",
    zipCode: import.meta.env.VITE_LOCATION_ZIP || "07102",
    street: import.meta.env.VITE_LOCATION_STREET || "123 Main Street",
    fullAddress: import.meta.env.VITE_LOCATION_FULL_ADDRESS || import.meta.env.VITE_CONTACT_ADDRESS || "123 Main Street, Newark, NJ 07102"
  },
  
  // Firm Description/Tagline
  tagline: "Trusted Legal Representation for You",
  
  // Copyright Year
  copyrightYear: "2025",
  
  // Email Configuration
  email: {
    // Custom subject line for contact form submissions
    // You can use form field placeholders: {{name}}, {{email}}, {{practice-area}}
    // Example: "New Contact: {{name}} - {{practice-area}}"
    contactFormSubject: "New Contact Form Submission from {{name}} - {{practice-area}}",
    // Alternative simple subject (if you don't want placeholders)
    contactFormSubjectSimple: "New Contact Form Submission from Amer Law Website"
  }
};

/**
 * Helper function to generate team member email
 * @param {string} firstName - First name of team member
 * @returns {string} Email address
 */
export function getTeamEmail(firstName) {
  return `${firstName.toLowerCase()}@${FIRM.emailDomain}`;
}

/**
 * Helper function to generate copyright text
 * @returns {string} Copyright text
 */
export function getCopyright() {
  return `© ${FIRM.copyrightYear} ${FIRM.name}. All rights reserved.`;
}

