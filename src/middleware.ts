import { type NextRequest, NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/', '/dashboard']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const isPublic = PUBLIC_ROUTES.includes(request.nextUrl.pathname)

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
}
