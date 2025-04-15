'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import LogoutButton from '../auth/LogoutButton';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items?: NavItem[];
  isLoggedIn?: boolean;
}

export default function Navbar({ items = [], isLoggedIn = false }: NavbarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const defaultItems: NavItem[] = [
    { label: 'Accueil', href: '/' },
    ...(!isLoggedIn 
      ? [
          { label: 'Connexion', href: '/auth/login' },
          { label: 'Inscription', href: '/auth/register' }
        ] 
      : [
          { label: 'Profile', href: '/profile' },
        ]
    )
  ];

  const navItems = items.length > 0 ? items : defaultItems;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Orbit Patrimoine
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === item.href
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {user && (
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Tableau de bord
              </Link>
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 