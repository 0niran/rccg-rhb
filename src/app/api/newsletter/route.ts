import { NextRequest, NextResponse } from 'next/server';
import { newsletterSchema, type FormResponse } from '@/lib/schemas';
import { CONTACT_INFO } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
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

    // For now, we'll implement a simple email notification
    // Later this can be replaced with Mailchimp API integration
    
    // TODO: Replace with actual newsletter service integration
    // Options:
    // 1. Mailchimp API: await subscribeToMailchimp(email, firstName)
    // 2. ConvertKit API: await subscribeToConvertKit(email, firstName) 
    // 3. Database storage: await saveSubscriberToDatabase(email, firstName)
    
    // Simple email notification to church admin (temporary solution)
    const adminNotification = {
      to: CONTACT_INFO.email,
      subject: 'New Newsletter Subscription - RHB Website',
      message: `
New newsletter subscription received:

Email: ${email}
Name: ${firstName || 'Not provided'}
Subscribed: ${new Date().toLocaleString()}
Source: Website Newsletter Form

Please add this subscriber to your newsletter list.

---
Restoration House Brantford
Automated Website Notification
      `.trim()
    };

    // Log the subscription (in production, send actual email)
    console.log('Newsletter Subscription:', {
      email,
      firstName,
      timestamp: new Date().toISOString(),
    });

    // Simulate successful subscription
    return NextResponse.json<FormResponse>({
      success: true,
      message: 'Thank you for subscribing! You\'ll receive updates about our church community, events, and inspiring messages.',
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
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
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}