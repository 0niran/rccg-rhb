import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check which environment variables are configured
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      FROM_EMAIL: !!process.env.FROM_EMAIL,
      TO_EMAIL: !!process.env.TO_EMAIL,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      RECAPTCHA_SECRET_KEY: !!process.env.RECAPTCHA_SECRET_KEY,
      MAILCHIMP_API_KEY: !!process.env.MAILCHIMP_API_KEY,
      MAILCHIMP_AUDIENCE_ID: !!process.env.MAILCHIMP_AUDIENCE_ID,
    };

    // Check for missing critical variables
    const missing = [];
    if (!process.env.FROM_EMAIL) missing.push('FROM_EMAIL');
    if (!process.env.TO_EMAIL) missing.push('TO_EMAIL');
    if (!process.env.RESEND_API_KEY) missing.push('RESEND_API_KEY');

    return NextResponse.json({
      status: 'ok',
      environment: process.env.NODE_ENV,
      envVarsConfigured: envCheck,
      missingCriticalVars: missing,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}