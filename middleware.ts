// FIXED: middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = [
  '/dashboard',
  '/dashboard/interns', 
  '/dashboard/siwes',
  '/dashboard/students',
  '/dashboard/finance',
  '/dashboard/budget', 
  '/admin/staffs'
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => 
    path.startsWith(route)
  );

  // Get token from cookies - FIXED: using correct cookie name
  const token = req.cookies.get('token')?.value;
  console.log('Middleware - Path:', path, 'Has token:', !!token);

  // Redirect to login if protected route and no token
  if (isProtectedRoute && !token) {
    console.log('Redirecting to login - no token found');
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Allow access if public route or has valid token
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login'
  ],
};