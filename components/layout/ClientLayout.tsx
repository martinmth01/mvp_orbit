'use client';

import { ReactNode } from 'react';
import MainLayout from './MainLayout';
import AuthGuard from '../auth/AuthGuard';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <AuthGuard>
      <MainLayout>{children}</MainLayout>
    </AuthGuard>
  );
} 