/**
 * Firm Constants
 * Centralized configuration for easy customization
 * Update these values to rebrand the entire site
 */

export const FIRM = {
  // Firm Name
  name: "Amer Law LLC",
  nameFull: "AMER LAW LLC ATTORNEYS AT LAW",
  
  // Contact Information
  contact: {
    phone: "973-356-6222",
    emergency: "973-356-6222",
    email: "WAELAMER@AMERLAWLLC.COM",
    address: "123 Main Street, Newark, NJ 07102",
    hours: "Monday - Friday: 8:00 AM - 6:00 PM<br>Saturday: 9:00 AM - 2:00 PM<br>Sunday: Closed"
  },
  
  // Email Domain (used for team member emails)
  emailDomain: "amerlawllc.com",
  
  // Social Media Handles
  social: {
    handle: "amerlawllc", // Used for social media URLs
    facebook: "https://facebook.com/amerlawllc",
    twitter: "https://twitter.com/amerlawllc",
    linkedin: "https://linkedin.com/company/amerlawllc",
    instagram: "https://instagram.com/amerlawllc"
  },
  
  // Location Information
  location: {
    city: "Newark",
    state: "New Jersey",
    stateAbbr: "NJ",
    zipCode: "07102",
    street: "123 Main Street",
    fullAddress: "123 Main Street, Newark, NJ 07102"
  },
  
  // Firm Description/Tagline
  tagline: "Trusted Legal Representation for Your Future",
  
  // Copyright Year
  copyrightYear: "2025"
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

