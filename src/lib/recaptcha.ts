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
    console.error('reCAPTCHA secret key not configured');
    return { success: false, error: 'reCAPTCHA not configured' };
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
      console.warn('reCAPTCHA verification failed:', errorCodes);

      // In development, browser-error is common due to localhost restrictions
      // Allow it to pass for development purposes
      if (process.env.NODE_ENV === 'development' && errorCodes.includes('browser-error')) {
        return {
          success: true,
          score: 0.9 // Assume good score for development
        };
      }

      return {
        success: false,
        error: 'reCAPTCHA verification failed'
      };
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
    console.error('reCAPTCHA verification error:', error);
    return {
      success: false,
      error: 'reCAPTCHA verification failed'
    };
  }
}