/**
 * Legal page initialization entry point
 * Shared entry point for all legal document pages
 * Auto-initializes when imported
 */
import { initLegalPage } from "../components/legal-page.js";

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLegalPage);
} else {
  initLegalPage();
}

