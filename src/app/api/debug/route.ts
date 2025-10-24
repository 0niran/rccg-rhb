import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Testing individual components...');

    // Test 1: Basic environment variables
    const envTest = {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      FROM_EMAIL: !!process.env.FROM_EMAIL,
      TO_EMAIL: !!process.env.TO_EMAIL,
    };

    // Test 2: Try importing Resend package
    console.log('Testing Resend import...');
    const { Resend } = await import('resend');
    console.log('Resend imported successfully');

    // Test 3: Basic JavaScript functionality
    console.log('Testing JavaScript functionality...');
    const testHtml = '<script>alert("test")</script>Hello';
    const escaped = testHtml.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    console.log('HTML escaping working:', escaped);

    // Test 5: Try initializing Resend client
    console.log('Testing Resend initialization...');
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      console.log('Resend client created successfully');
    }

    return NextResponse.json({
      status: 'success',
      message: 'All components loaded successfully',
      envTest,
      imports: {
        resend: true,
        htmlEscaping: true,
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error('Debug test error:', error);

    return NextResponse.json(
      {
        status: 'error',
        message: 'Component loading failed',
        error: errorMessage,
        stack: errorStack?.split('\n').slice(0, 10),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}