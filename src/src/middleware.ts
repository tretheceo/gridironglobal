import { NextRequest, NextResponse } from 'next/server';

// Define paths that are accessible without authentication
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/register',
  '/api/auth/.*',
  '/jobs',
  '/players',
  '/teams',
];

// Middleware function to handle authentication and authorization
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }
  
  // Get the token from the session cookie
  // In a real implementation, you would verify the token
  // For now, we'll just check if it exists
  const token = request.cookies.get('next-auth.session-token')?.value;
  
  if (!token) {
    // Redirect to login if no token is found
    return redirectToLogin(request);
  }
  
  // In a real implementation, you would decode the token and check the user's role
  // For now, we'll just let them through
  // This will be handled by server components with proper auth checks
  
  return NextResponse.next();
}

// Check if the path is in the public paths list
function isPublicPath(pathname: string): boolean {
  return publicPaths.some(pattern => {
    if (pattern.endsWith('.*')) {
      const base = pattern.slice(0, -2);
      return pathname.startsWith(base);
    }
    return pathname === pattern;
  });
}

// Redirect to login with return URL
function redirectToLogin(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = '/auth/login';
  url.searchParams.set('from', request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/* (authentication routes)
     * 2. /_next/* (Next.js internals)
     * 3. /fonts/* (static font files)
     * 4. /images/* (static image files)
     * 5. /favicon.ico, /site.webmanifest (static files)
     */
    '/((?!_next|fonts|images|favicon.ico|site.webmanifest).*)',
  ],
};
