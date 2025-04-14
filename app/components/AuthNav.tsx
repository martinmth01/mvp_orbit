'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AuthNav() {
  const pathname = usePathname()
  
  return (
    <div className="flex justify-center space-x-4 mb-8">
      <Link 
        href="/auth/login" 
        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
          pathname === '/auth/login' 
            ? 'bg-blue-100 text-blue-700 font-medium' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Connexion
      </Link>
      <Link 
        href="/auth/register" 
        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
          pathname === '/auth/register' 
            ? 'bg-blue-100 text-blue-700 font-medium' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Inscription
      </Link>
    </div>
  )
} 