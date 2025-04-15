'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import LogoutButton from '../auth/LogoutButton';

type NavbarProps = {
  isAuthenticated?: boolean;
  onLogout?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const isUserAuthenticated = isAuthenticated !== undefined ? isAuthenticated : !!user;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section: Brand Logo/Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center overflow-hidden">
                <div className="w-4 h-4 rounded-full bg-primary-500 dark:bg-primary-400 transform group-hover:scale-110 transition-transform duration-300"></div>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                Orbit Patrimoine
              </span>
            </Link>
          </div>

          {/* Right Section: Navigation Links */}
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                pathname === '/' 
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Accueil
            </Link>

            {isUserAuthenticated ? (
              <>
                <Link 
                  href="/profile" 
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    pathname === '/profile' 
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Profil
                </Link>
                {onLogout ? (
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-all duration-200"
                  >
                    Déconnexion
                  </button>
                ) : (
                  <div className="px-4 py-2">
                    <LogoutButton />
                  </div>
                )}
              </>
            ) : (
              <Link 
                href="/auth/login" 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  pathname === '/auth/login' 
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' 
                    : 'bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30'
                }`}
              >
                Connexion / Inscription
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 