import { NextRequest, NextResponse } from 'next/server';
import { newsletterSchema, type FormResponse } from '@/lib/schemas';
import { CONTACT_INFO } from '@/lib/constants';
import { mailchimpService } from '@/lib/mailchimp';
import { rateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 requests per 10 minutes per IP
    const identifier = getRateLimitIdentifier(request);
    const { allowed, remaining, resetTime } = rateLimit(identifier, {
      maxRequests: 3,
      windowMs: 10 * 60 * 1000, // 10 minutes
    });

    if (!allowed) {
      const resetDate = new Date(resetTime);
      return NextResponse.json<FormResponse>({
        success: false,
        message: `Too many subscription attempts. Please try again after ${resetDate.toLocaleTimeString()}.`,
      }, {
        status: 429,
        headers: {
          'X-RateLimit-Limit': '3',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': resetTime.toString(),
          'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
        }
      });
    }

    const body = await request.json();
    
    // Validate the form data
    const validationResult = newsletterSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json<FormResponse>({
        success: false,
        message: 'Please check your input and try again.',
        errors: validationResult.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { email, firstName } = validationResult.data;

    // Subscribe to Mailchimp
    const subscriptionResult = await mailchimpService.subscribeUser({
      email,
      firstName,
    });

    if (!subscriptionResult.success) {
      // Return specific error message from Mailchimp
      return NextResponse.json<FormResponse>({
        success: false,
        message: subscriptionResult.message,
      }, { 
        status: subscriptionResult.error === 'ALREADY_SUBSCRIBED' ? 409 : 400 
      });
    }

    // Log successful subscription
    console.log('Newsletter Subscription Success:', {
      email,
      firstName,
      mailchimpId: subscriptionResult.mailchimpId,
      timestamp: new Date().toISOString(),
    });

    // Send personalized success response
    const personalizedMessage = firstName 
      ? `Thank you for subscribing, ${firstName}! You'll receive updates about our church community, events, and inspiring messages.`
      : 'Thank you for subscribing! You\'ll receive updates about our church community, events, and inspiring messages.';

    return NextResponse.json<FormResponse>({
      success: true,
      message: personalizedMessage,
    }, {
      headers: {
        'X-RateLimit-Limit': '3',
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTime.toString(),
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    // Check if it's a Mailchimp configuration error
    if (error instanceof Error && error.message.includes('Mailchimp configuration')) {
      return NextResponse.json<FormResponse>({
        success: false,
        message: 'Newsletter service is temporarily unavailable. Please try again later or contact us directly.',
      }, { status: 503 });
    }
    
    return NextResponse.json<FormResponse>({
      success: false,
      message: 'Something went wrong. Please try again later or contact us directly.',
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