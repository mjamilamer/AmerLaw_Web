/**
 * Netlify Function to save contact form submissions to Neon database
 * and send email notifications using Resend (free email service)
 * This bypasses Netlify Forms limits by using database + free email service
 */

import { neon } from '@netlify/neon';
import { Resend } from 'resend';

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

    // Save to database
    let submissionId = null;
    try {
      const sql = neon();
      
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

      submissionId = result[0]?.id;
    } catch (dbError) {
      console.error('Database save error:', dbError);
      // Continue even if database save fails - we'll still try to send email
    }

    // Send email notification using Resend (free tier: 3,000 emails/month)
    let emailSent = false;
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      const recipientEmail = process.env.CONTACT_FORM_EMAIL || 'WAELAMER@AMERLAWLLC.COM';
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@amerlawllc.com';

      if (resendApiKey) {
        const resend = new Resend(resendApiKey);

        // Format email subject
        const subject = practiceArea 
          ? `New Contact Form: ${name} - ${practiceArea}`
          : `New Contact Form: ${name}`;

        // Format email body
        const emailBody = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${practiceArea ? `<p><strong>Practice Area:</strong> ${practiceArea}</p>` : ''}
          ${fileCount > 0 ? `<p><strong>Files Uploaded:</strong> ${fileCount} (${fileNames})</p>` : ''}
          ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
          <hr>
          <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
          ${submissionId ? `<p><small>Submission ID: ${submissionId}</small></p>` : ''}
        `;

        await resend.emails.send({
          from: fromEmail,
          to: recipientEmail,
          subject: subject,
          html: emailBody,
        });

        emailSent = true;
      } else {
        console.warn('RESEND_API_KEY not set - email not sent');
      }
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Continue even if email fails - at least database save might have succeeded
    }

    // Return success if either database save or email send succeeded
    if (submissionId || emailSent) {
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
          id: submissionId,
          emailSent: emailSent
        })
      };
    } else {
      // Both failed
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: 'Both database save and email send failed'
        })
      };
    }

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

