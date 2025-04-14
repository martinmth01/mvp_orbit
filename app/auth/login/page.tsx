import { LoginForm } from '@/components/auth';
import { MainLayout } from '@/components/layout';

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoginForm />
      </div>
    </MainLayout>
  );
} 