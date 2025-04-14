import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log('Middleware - URL:', req.nextUrl.pathname)
  console.log('Middleware - Session:', session ? 'Présente' : 'Absente')
  if (session) {
    console.log('Middleware - User ID:', session.user.id)
    console.log('Middleware - User Email:', session.user.email)
  }

  // Ajouter des en-têtes pour éviter la mise en cache
  res.headers.set('Cache-Control', 'no-store, max-age=0')
  res.headers.set('Pragma', 'no-cache')

  // Si l'utilisateur n'est pas connecté et essaie d'accéder au dashboard
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('Redirection vers login - Utilisateur non connecté')
    const redirectUrl = new URL('/auth/login', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Si l'utilisateur est connecté et essaie d'accéder aux pages d'auth
  if (session && (req.nextUrl.pathname.startsWith('/auth'))) {
    console.log('Redirection vers dashboard - Utilisateur déjà connecté')
    const redirectUrl = new URL('/dashboard', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
} 