import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('chefai_auth');
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');
  // Debug log
  console.log('chefai_auth cookie:', isLoggedIn);
  if (!isLoggedIn && !isLoginPage) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|api|public|google.svg).*)',
  ],
};
