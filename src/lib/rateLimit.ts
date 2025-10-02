// Simple in-memory rate limiter
// For production, consider using Redis or a dedicated rate limiting service

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitConfig {
  maxRequests: number; // Maximum number of requests
  windowMs: number;    // Time window in milliseconds
}

export function rateLimit(identifier: string, config: RateLimitConfig): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // If no entry or window has passed, create new entry
  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.windowMs;
    rateLimitMap.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: config.maxRequests - 1, resetTime };
  }

  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

  // Increment count
  entry.count++;
  rateLimitMap.set(identifier, entry);

  return { allowed: true, remaining: config.maxRequests - entry.count, resetTime: entry.resetTime };
}

export function getRateLimitIdentifier(request: Request): string {
  // Try to get IP from headers (works with most reverse proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  // Fallback to a default identifier (not ideal for production)
  return 'unknown';
}
