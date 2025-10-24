import { NextRequest, NextResponse } from 'next/server';
import { contactSchema, type FormResponse } from '@/lib/schemas';
import { CONTACT_INFO } from '@/lib/constants';
import { resendService } from '@/lib/resend';
import { rateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';
import { verifyRecaptcha } from '@/lib/recaptcha';

export async function POST(request: NextRequest) {
  try {
    // Check request size limit (10KB)
    const contentLength = request.headers.get('content-length');
    const MAX_BODY_SIZE = 10 * 1024; // 10KB

    if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
      return NextResponse.json<FormResponse>({
        success: false,
        message: 'Request too large.',
      }, { status: 413 });
    }

    // Rate limiting: 5 requests per 15 minutes per IP
    const identifier = getRateLimitIdentifier(request);
    const { allowed, remaining, resetTime } = rateLimit(identifier, {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
    });

    if (!allowed) {
      const resetDate = new Date(resetTime);
      return NextResponse.json<FormResponse>({
        success: false,
        message: `Too many requests. Please try again after ${resetDate.toLocaleTimeString()}.`,
      }, {
        status: 429,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': resetTime.toString(),
          'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
        }
      });
    }

    const body = await request.json();

    // Additional size check after parsing
    if (JSON.stringify(body).length > MAX_BODY_SIZE) {
      return NextResponse.json<FormResponse>({
        success: false,
        message: 'Request data too large.',
      }, { status: 413 });
    }

    // Honeypot detection - reject if website field is filled
    if (body.website && body.website.trim() !== '') {
      console.warn('Honeypot triggered:', {
        identifier,
        website: body.website,
        timestamp: new Date().toISOString()
      });

      // Return success to avoid revealing bot detection
      return NextResponse.json<FormResponse>({
        success: true,
        message: 'Thank you for your message!',
      });
    }

    // Verify reCAPTCHA if token is provided
    if (body.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(body.recaptchaToken);

      if (!recaptchaResult.success) {
        console.warn('reCAPTCHA verification failed:', {
          identifier,
          error: recaptchaResult.error,
          score: recaptchaResult.score,
          timestamp: new Date().toISOString()
        });

        return NextResponse.json<FormResponse>({
          success: false,
          message: 'Security verification failed. Please try again.',
        }, { status: 400 });
      }

      // Log successful reCAPTCHA verification (but not the token)
      console.log('reCAPTCHA verified:', {
        identifier,
        score: recaptchaResult.score,
        timestamp: new Date().toISOString()
      });
    }

    // Remove reCAPTCHA token from body before validation
    const { recaptchaToken, ...formData } = body;

    // Validate the form data
    const validationResult = contactSchema.safeParse(formData);
    
    if (!validationResult.success) {
      return NextResponse.json<FormResponse>({
        success: false,
        message: 'Please check your input and try again.',
        errors: validationResult.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { firstName, lastName, email, phone, subject, message } = validationResult.data;

    // Send emails via Resend
    const emailResult = await resendService.sendContactForm({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    });

    if (!emailResult.success) {
      return NextResponse.json<FormResponse>({
        success: false,
        message: emailResult.message,
      }, { status: 500 });
    }

    // Log successful submission (without sensitive data)
    console.log('Contact Form Email Sent:', {
      subject: subject,
      hasEmail: !!email,
      hasPhone: !!phone,
      adminEmailId: emailResult.adminEmailId,
      userEmailId: emailResult.userEmailId,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json<FormResponse>({
      success: true,
      message: emailResult.message,
    }, {
      headers: {
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTime.toString(),
      }
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
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' ? 'https://rccgbrantford.com' : '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}