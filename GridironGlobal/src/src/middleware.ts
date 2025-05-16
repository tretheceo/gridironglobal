import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
import { UserRole } from '@prisma/client';

// Define paths that are accessible without authentication
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/about',
  '/contact',
  '/jobs',
  '/players',
];

// Define role-based path access
const roleBasedPaths = {
  [UserRole.PLAYER]: ['/dashboard/player', '/profile/player', '/applications'],
  [UserRole.COACH]: ['/dashboard/coach', '/profile/coach', '/applications'],
  [UserRole.RECRUITER]: ['/dashboard/recruiter', '/team', '/job-postings'],
  [UserRole.ADMIN]: ['/admin'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Get the user's session
  const session = await getServerSession(authOptions);
  
  // If no session, redirect to login
  if (!session) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  const userRole = session.user.role as UserRole;
  
  // Check if user has access to the requested path
  const hasAccess = Object.entries(roleBasedPaths).some(([role, paths]) => {
    if (role === userRole) {
      return paths.some(path => pathname.startsWith(path));
    }
    return false;
  });
  
  // If admin, allow access to all paths
  if (userRole === UserRole.ADMIN) {
    return NextResponse.next();
  }
  
  // If user doesn't have access, redirect to their dashboard
  if (!hasAccess) {
    let redirectPath = '/';
    
    switch (userRole) {
      case UserRole.PLAYER:
        redirectPath = '/dashboard/player';
        break;
      case UserRole.COACH:
        redirectPath = '/dashboard/coach';
        break;
      case UserRole.RECRUITER:
        redirectPath = '/dashboard/recruiter';
        break;
    }
    
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
};
