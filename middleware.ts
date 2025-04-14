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
      console.log('Middleware - Redirecting to login (no session)')
      const redirectUrl = new URL('/auth/login', req.url)
      redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Si l'utilisateur est connecté et essaie d'accéder aux pages d'auth
    if (session && req.nextUrl.pathname.startsWith('/auth')) {
      console.log('Middleware - Redirecting to dashboard (has session)')
      const redirectUrl = new URL('/dashboard', req.url)
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // En cas d'erreur, on redirige vers la page de login
    const redirectUrl = new URL('/auth/login', req.url)
    redirectUrl.searchParams.set('error', 'Une erreur est survenue')
    return NextResponse.redirect(redirectUrl)
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}