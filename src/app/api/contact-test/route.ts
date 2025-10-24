import { NextResponse } from 'next/server';
import { resendService } from '@/lib/resend';

export async function GET() {
  try {
    // First, check if the service can be instantiated
    console.log('Testing resend service initialization...');

    // Try to call the test connection method
    const testResult = await resendService.testConnection();

    console.log('Test connection result:', testResult);

    return NextResponse.json({
      status: 'success',
      message: 'Contact form services initialized successfully',
      resendConnection: testResult.success,
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
        stack: errorStack,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}