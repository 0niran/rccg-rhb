import { NextRequest, NextResponse } from 'next/server';
import { getRateLimitIdentifier, rateLimit } from '@/lib/rateLimit';

interface SecurityEvent {
  type: 'suspicious_activity' | 'rapid_clicks' | 'unusual_behavior' | 'console_access';
  details: string;
  timestamp: number;
  userAgent: string;
  url: string;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for security logs: 20 requests per 5 minutes
    const identifier = getRateLimitIdentifier(request);
    const { allowed, remaining, resetTime } = rateLimit(identifier + ':security', {
      maxRequests: 20,
      windowMs: 5 * 60 * 1000, // 5 minutes
    });

    if (!allowed) {
      return NextResponse.json({
        success: false,
        message: 'Too many security events logged',
      }, { status: 429 });
    }

    const body = await request.json();

    // Validate security event structure
    if (!body.type || !body.details || !body.timestamp) {
      return NextResponse.json({
        success: false,
        message: 'Invalid security event format',
      }, { status: 400 });
    }

    const event: SecurityEvent = {
      type: body.type,
      details: body.details,
      timestamp: body.timestamp,
      userAgent: body.userAgent || request.headers.get('user-agent') || 'unknown',
      url: body.url || 'unknown',
    };

    // Log security event (implement database storage as needed)
    console.warn('Security Event:', {
      ...event,
      identifier,
      serverTimestamp: new Date().toISOString(),
    });

    // Check for severe security patterns that require immediate action
    const severePatterns = [
      'Console log accessed',
      'Developer tools detected',
      'Dynamic SCRIPT injection detected',
      'Dynamic IFRAME injection detected',
    ];

    if (severePatterns.some(pattern => event.details.includes(pattern))) {
      console.error('SEVERE SECURITY EVENT:', {
        ...event,
        identifier,
        severity: 'HIGH',
        serverTimestamp: new Date().toISOString(),
      });

      // In production, you might want to:
      // 1. Send alerts to security team
      // 2. Temporarily increase rate limiting for this user
      // 3. Log to external security monitoring service
    }

    return NextResponse.json({
      success: true,
      message: 'Security event logged',
    });

  } catch (error) {
    console.error('Security logging error:', error);

    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

// Handle preflight requests
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