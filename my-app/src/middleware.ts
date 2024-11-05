import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  async function middleware(req) {
    const session = req.nextauth.token;
    
    if (!session?.email) {
        console.log("Logging the unauthorized response", session)
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    try {
      const response = await fetch('/api/memberships', {
        headers: {
          'Cookie': req.headers.get('cookie') || '' // Pass session cookie
        }
      })
      
      const data = await response.json()
      const hasValidMembership = data?.data?.length > 0

      if (!hasValidMembership) {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }

      return NextResponse.next()
    } catch (error) {
      console.error('Membership verification failed:', error)
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: ['/ai/:path*']
} 