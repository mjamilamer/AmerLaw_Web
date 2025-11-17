/**
 * Database utility for saving contact form submissions to Neon database
 * This calls a Netlify Function which handles the actual database connection
 * (Database connections must happen server-side, not in the browser)
 */

/**
 * Save contact form submission to database via Netlify Function
 * @param {Object} formData - Form submission data
 * @param {string} formData.name - Client name
 * @param {string} formData.email - Client email
 * @param {string} formData.phone - Client phone number
 * @param {string} formData.practiceArea - Selected practice area
 * @param {string} formData.message - Message content
 * @param {Array<File>} formData.files - Uploaded files (optional)
 * @returns {Promise<{success: boolean, id?: number, error?: string}>}
 */
export async function saveContactSubmission(formData) {
  try {
    // Prepare data for API call (extract file names only, not file contents)
    const filesData = formData.files || [];
    const fileNames = Array.isArray(filesData) 
      ? filesData.map(f => f.name || f)
      : (filesData?.name ? [filesData.name] : []);

    const payload = {
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      'practice-area': formData['practice-area'] || '',
      message: formData.message || '',
      files: fileNames
    };

    // Call Netlify Function to save to database
    const response = await fetch('/.netlify/functions/save-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (import.meta.env.DEV) {
      console.log('Contact submission saved to database:', result.id);
    }

    return result;

  } catch (error) {
    // Log error but don't fail the form submission
    console.warn('Database save failed (form submission still succeeded):', error);
    
    return {
      success: false,
      error: error.message || 'Database save failed'
    };
  }
}

