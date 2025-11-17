/**
 * Netlify Function to save contact form submissions to Neon database
 * This runs server-side and has access to NETLIFY_DATABASE_URL
 */

import { neon } from '@netlify/neon';

export async function handler(event, context) {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const formData = JSON.parse(event.body);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Initialize database connection
    const sql = neon();

    // Extract form data
    const {
      name,
      email,
      phone,
      'practice-area': practiceArea,
      message,
      files = []
    } = formData;

    // Process files (store count and names, not the files themselves)
    const fileCount = Array.isArray(files) ? files.length : (files ? 1 : 0);
    const fileNames = Array.isArray(files) 
      ? files.map(f => f.name || f).join(', ')
      : (files?.name || '');

    // Insert into database
    const result = await sql`
      INSERT INTO contact_submissions (
        name,
        email,
        phone,
        practice_area,
        message,
        file_count,
        file_names,
        submitted_at
      ) VALUES (
        ${name},
        ${email},
        ${phone},
        ${practiceArea || null},
        ${message || null},
        ${fileCount},
        ${fileNames || null},
        NOW()
      )
      RETURNING id
    `;

    const submissionId = result[0]?.id;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        id: submissionId
      })
    };

  } catch (error) {
    console.error('Error saving to database:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: error.message || 'Database save failed'
      })
    };
  }
}

