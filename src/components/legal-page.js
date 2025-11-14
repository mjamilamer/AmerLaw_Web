/**
 * Legal page initialization component
 * Shared functionality for all legal document pages
 */
import { siteContent } from "../utils/content.js";
import { renderNavbarForLegalPage } from "./navbar.js";
import { renderFooter } from "./sections.js";
import { initLegalPageMeta } from "../utils/meta.js";

/**
 * Initialize the legal page
 * Renders navbar and footer
 */
export function initLegalPage() {
  try {
    // Render navbar with home link and navigation to main page sections
    renderNavbarForLegalPage(siteContent.nav);

    // Render footer
    renderFooter(siteContent.footer, siteContent.social);

    // Update meta tags and firm name references
    initLegalPageMeta();

    console.log('Legal page initialized successfully');
  } catch (error) {
    console.error('Error initializing legal page:', error);
  }
}

