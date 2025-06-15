import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, firstName, pdfBase64 } = await req.json()

    console.log('Received request to send email to:', email)

    // Get environment variables
    const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
    const SENDGRID_FROM_EMAIL = Deno.env.get('SENDGRID_FROM_EMAIL') || 'info@n-blk.com'

    if (!SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY not found in environment variables')
    }

    console.log('SendGrid API key found, preparing email...')

    // Use fetch to call SendGrid API directly
    const emailData = {
      personalizations: [
        {
          to: [{ email: email }],
          subject: 'Your Full NBLK Stability Score Report'
        }
      ],
      from: { email: SENDGRID_FROM_EMAIL },
      content: [
        {
          type: 'text/plain',
          value: `Hi ${firstName},

Thanks for sharing your perspective in the Stability Score Calculator.
Based on your input, we've generated your full score summary, including:
- Your exact score and grade
- What it means for political stability
- How your view compares to others by age and region

Please find your detailed report attached to this email.

Stay informed,
The NBLK Team`
        },
        {
          type: 'text/html',
          value: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #228B22;">Your Full NBLK Stability Score Report</h2>
              <p>Hi ${firstName},</p>
              <p>Thanks for sharing your perspective in the Stability Score Calculator.</p>
              <p>Based on your input, we've generated your full score summary, including:</p>
              <ul>
                <li>Your exact score and grade</li>
                <li>What it means for political stability</li>
                <li>How your view compares to others by age and region</li>
              </ul>
              <p>Please find your detailed report attached to this email.</p>
              <p>Stay informed,<br>The NBLK Team</p>
            </div>
          `
        }
      ],
      attachments: [
        {
          content: pdfBase64,
          filename: 'stability-score-report.pdf',
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    }

    console.log('Sending email via SendGrid API...')

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('SendGrid API error:', response.status, errorText)
      throw new Error(`SendGrid API error: ${response.status} - ${errorText}`)
    }

    console.log('Email sent successfully via SendGrid')

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in send-email function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email', 
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
}) 