import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Security headers are set in next.config.js to avoid conflicts.
// Middleware is reserved for future auth checks, redirects, or locale routing.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
