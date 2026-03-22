import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In production, only return basic status to avoid exposing environment details
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({
        status: 'ok',
        environment: 'production',
        timestamp: new Date().toISOString(),
      });
    }

    // Development mode: check configuration (safe for dev)
    const configOk = !!(
      process.env.FROM_EMAIL &&
      process.env.TO_EMAIL &&
      process.env.RESEND_API_KEY
    );

    return NextResponse.json({
      status: 'ok',
      environment: process.env.NODE_ENV,
      configurationComplete: configOk,
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