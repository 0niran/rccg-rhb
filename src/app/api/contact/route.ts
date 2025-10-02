import { NextRequest, NextResponse } from 'next/server';
import { contactSchema, type FormResponse } from '@/lib/schemas';
import { CONTACT_INFO } from '@/lib/constants';
import { resendService } from '@/lib/resend';
import { rateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
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

    // Log successful submission
    console.log('Contact Form Email Sent:', {
      firstName,
      lastName,
      email,
      phone,
      subject,
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