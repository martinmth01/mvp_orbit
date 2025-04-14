import Link from 'next/link'

export default function AuthPage() {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center">
            Authentification
          </h1>
          
          <div className="flex flex-col space-y-4">
            <Link 
              href="/auth/login" 
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Se connecter
            </Link>
            
            <Link 
              href="/auth/register" 
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    );
  }