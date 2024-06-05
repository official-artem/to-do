import { NextRequest, NextResponse } from 'next/server';


export const config = {
  matcher: ['/', '/auth:path']
};

export async function middleware(request: NextRequest) {
  const JWT_TOKEN = request.cookies.get('todo');


  if (!JWT_TOKEN) {
    return NextResponse.redirect(new URL('/auth/register', request.url));
  }

  return NextResponse.next();
}