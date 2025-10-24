import { NextResponse } from 'next/server';
import { resendService } from '@/lib/resend';

export async function GET() {
  try {
    console.log('Starting contact service test...');

    // Test step 1: Check if we can import the service
    console.log('Step 1: Importing resend service...');

    // Test step 2: Check if environment variables are accessible
    console.log('Step 2: Checking environment variables...');
    const envVars = {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      FROM_EMAIL: !!process.env.FROM_EMAIL,
      TO_EMAIL: !!process.env.TO_EMAIL,
    };
    console.log('Environment variables:', envVars);

    // Test step 3: Try to call the test connection method
    console.log('Step 3: Testing connection...');
    const testResult = await resendService.testConnection();
    console.log('Test connection result:', testResult);

    return NextResponse.json({
      status: 'success',
      message: 'Contact form services initialized successfully',
      envVars,
      testResult,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error('Contact test error:', error);

    return NextResponse.json(
      {
        status: 'error',
        message: 'Contact form service initialization failed',
        error: errorMessage,
        stack: errorStack?.split('\n').slice(0, 10), // Limit stack trace
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}