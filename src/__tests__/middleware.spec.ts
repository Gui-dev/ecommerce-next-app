import { middleware } from '@/middleware'
import type { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'

const createMockRequest = (pathname: string, token?: string): NextRequest => {
  const headers = new Headers()
  const cookies = {
    get: (name: string) =>
      name === 'auth-token' && token ? { name, value: token } : undefined,
  }

  return {
    nextUrl: {
      pathname,
      search: '',
      origin: 'http://localhost:3000',
      href: `http://localhost:3000${pathname}`,
    },
    url: `http://localhost:3000${pathname}`,
    headers,
    cookies,
  } as unknown as NextRequest
}

describe('Middleware', () => {
  it('should be able to redirects to / if not authenticated and trying to access protected route', async () => {
    const request = createMockRequest('/dashboard')
    const response = middleware(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost:3000/')
  })

  it('should be able to redirects to /dashboard if authenticated and accessing public route', async () => {
    const request = createMockRequest('/', 'mock-token')
    const response = middleware(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe(
      'http://localhost:3000/dashboard'
    )
  })
})
