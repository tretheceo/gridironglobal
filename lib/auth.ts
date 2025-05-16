import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserRole } from '@prisma/client';

// Type for the roles that are allowed to access a route
type RoleAccess = {
  roles: UserRole[];
  redirect?: string;
};

// Middleware to check if user is authenticated
export async function withAuth(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return handler(req);
}

// Middleware to check if user has required role
export async function withRole(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
  { roles, redirect = '/auth/unauthorized' }: RoleAccess
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (!roles.includes(session.user.role as UserRole)) {
    return NextResponse.redirect(new URL(redirect, req.url));
  }

  return handler(req);
}

// Helper function to check if user is authenticated on client side
export async function isAuthenticated() {
  const session = await getServerSession(authOptions);
  return !!session;
}

// Helper function to check if user has required role on client side
export async function hasRole(roles: UserRole[]) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return false;
  }

  return roles.includes(session.user.role as UserRole);
}
