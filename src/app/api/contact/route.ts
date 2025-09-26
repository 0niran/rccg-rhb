import { NextRequest, NextResponse } from 'next/server';
import { contactSchema, type FormResponse } from '@/lib/schemas';
import { CONTACT_INFO } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json<FormResponse>({
        success: false,
        message: 'Please check your input and try again.',
        errors: validationResult.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { firstName, lastName, email, phone, subject, message } = validationResult.data;

    // Create formatted contact message
    const contactMessage = {
      to: CONTACT_INFO.email,
      subject: `New Contact Form Submission - ${subject}`,
      message: `
New contact form submission received from the church website:

FROM:
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}

SUBJECT: ${subject}

MESSAGE:
${message}

---
Submitted: ${new Date().toLocaleString()}
Source: Church Website Contact Form

Please respond to this inquiry promptly.

---
Restoration House Brantford
Automated Website Notification
      `.trim()
    };

    // Log the contact form submission (in production, send actual email)
    console.log('Contact Form Submission:', {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString(),
    });

    // TODO: Replace with actual email sending service
    // Options:
    // 1. SendGrid API: await sendEmailViaSendGrid(contactMessage)
    // 2. Nodemailer with SMTP: await sendEmailViaNodemailer(contactMessage)
    // 3. Formspree integration: await submitToFormspree(validationResult.data)
    // 4. Netlify Forms: handled automatically if hosting on Netlify

    // Auto-response to user
    const autoResponse = {
      to: email,
      subject: 'Thank you for contacting Restoration House Brantford',
      message: `
Dear ${firstName},

Thank you for reaching out to Restoration House Brantford! We have received your message regarding "${subject}" and will get back to you as soon as possible.

Our team typically responds within 24-48 hours. If you need immediate assistance, please feel free to call us at ${CONTACT_INFO.phone}.

We look forward to connecting with you!

Blessings,
The RHB Team

---
Restoration House Brantford
${CONTACT_INFO.address.main}
${CONTACT_INFO.phone}
${CONTACT_INFO.email}
      `.trim()
    };

    return NextResponse.json<FormResponse>({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24-48 hours. If you need immediate assistance, please call us at ' + CONTACT_INFO.phone + '.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json<FormResponse>({
      success: false,
      message: 'Something went wrong. Please try again later or call us directly at ' + CONTACT_INFO.phone + '.',
    }, { status: 500 });
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}