import { NextResponse } from 'next/server';
import { resendService } from '@/lib/resend';

export async function GET() {
  try {
    // Try to initialize the resend service to see where it fails
    const testResult = await resendService.testConnection();

    return NextResponse.json({
      status: 'success',
      message: 'Contact form services initialized successfully',
      resendConnection: testResult.success,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        status: 'error',
        message: 'Contact form service initialization failed',
        error: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}