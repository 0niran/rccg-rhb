import { NextResponse } from 'next/server';
import { resendService } from '@/lib/resend';

export async function GET() {
  try {
    // Only allow health checks in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, message: 'Health check not available in production' },
        { status: 403 }
      );
    }

    const healthCheck = await resendService.testConnection();
    
    if (healthCheck.success) {
      return NextResponse.json({
        success: true,
        message: healthCheck.message,
        data: {
          emailId: healthCheck.emailId,
          timestamp: new Date().toISOString(),
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: healthCheck.message,
        error: healthCheck.error,
      }, { status: 503 });
    }

  } catch (error) {
    console.error('Resend health check error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Health check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}