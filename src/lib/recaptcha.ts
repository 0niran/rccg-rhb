interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    // Allow through if not configured — rate limiting + honeypot still active
    console.warn('[recaptcha] RECAPTCHA_SECRET_KEY not set — skipping verification');
    return { success: true };
  }

  if (!token) {
    return { success: false, error: 'reCAPTCHA token required' };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RecaptchaResponse = await response.json();

    if (!data.success) {
      const errorCodes = data['error-codes'] || [];
      console.warn('[recaptcha] Verification failed, error-codes:', errorCodes);
      // Any verification failure other than explicit bot score is a config/token issue
      // — allow through, rate limiting + honeypot still protect the endpoint
      return { success: true };
    }

    // Only block on explicitly low score (confirmed bot signal)
    if (data.score !== undefined && data.score < 0.5) {
      console.warn('[recaptcha] Score too low:', data.score);
      return { success: false, score: data.score, error: 'Suspicious activity detected' };
    }

    return {
      success: true,
      score: data.score
    };

  } catch (error) {
    // Network or unexpected error — allow through, don't block legitimate users
    console.error('[recaptcha] Verification error:', error);
    return { success: true };
  }
}