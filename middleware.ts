// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
      error
    } = await supabase.auth.getSession()

    console.log('Middleware - Path:', req.nextUrl.pathname)
    console.log('Middleware - Session:', session ? 'Present' : 'Not present')
    if (session) {
      console.log('Middleware - User ID:', session.user.id)
    }
    if (error) {
      console.error('Middleware - Auth error:', error)
    }

    // Si l'utilisateur n'est pas connecté et essaie d'accéder au dashboard
    if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
      console.log('Middleware - Protection de la route dashboard')
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}