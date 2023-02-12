// this middleware runs in edge runtimes
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { JWT_COOKIE_NAME, JWT_SECRET } from '@lib/environments';

const PUBLIC_FILE = /\.(.*)$/;

// had to make this again here as the other one is in a file (auth.ts) with bcrypt which is not supported on edge runtimes
const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(JWT_SECRET)
  );

  return payload;
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // bypass requests for these requests
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  } else if (pathname === '/') {
    req.nextUrl.pathname = '/home';
    return NextResponse.redirect(req.nextUrl);
  }
  // Check if already signed in
  else if (pathname.startsWith('/signin') || pathname.startsWith('/register')) {
    const jwt = req.cookies.get(JWT_COOKIE_NAME);
    if (!jwt) {
      return NextResponse.next();
    }
    try {
      // already signed in -> redirect to /home page
      await verifyJWT(jwt.value);
      req.nextUrl.pathname = '/home';
      return NextResponse.redirect(req.nextUrl);
    } catch (e) {
      console.error(e);
      return NextResponse.next();
    }
  }

  const jwt = req.cookies.get(JWT_COOKIE_NAME);
  if (!jwt) {
    req.nextUrl.pathname = '/signin';
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = '/signin';
    return NextResponse.redirect(req.nextUrl);
  }
}
