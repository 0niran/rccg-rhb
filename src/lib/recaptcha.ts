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

      // Config errors (bad secret, timeout, duplicate token) — don't penalise the user
      const configErrors = ['invalid-input-secret', 'missing-input-secret', 'timeout-or-duplicate', 'browser-error'];
      if (errorCodes.some(code => configErrors.includes(code))) {
        console.warn('[recaptcha] Config or token error — allowing through');
        return { success: true };
      }

      return { success: false, error: 'reCAPTCHA verification failed' };
    }

    // For v3 reCAPTCHA, check score (0.0 = bot, 1.0 = human)
    // For v2 reCAPTCHA, score will be undefined
    if (data.score !== undefined) {
      const threshold = 0.5; // Adjust based on your needs
      if (data.score < threshold) {
        console.warn(`reCAPTCHA score too low: ${data.score}`);
        return {
          success: false,
          score: data.score,
          error: 'Suspicious activity detected'
        };
      }
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