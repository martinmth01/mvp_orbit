// app/components/LoginButton.tsx
'use client'

import Link from 'next/link'

export default function LoginButton() {
  return (
    <Link
      href="/auth/login"
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
    >
      Se connecter
    </Link>
  )
}