import React from 'react';
import { Card } from '../ui';

interface ErrorMessageProps {
  title: string;
  message: string;
  actionText?: string;
  actionHref?: string;
}

export default function ErrorMessage({ 
  title, 
  message, 
  actionText, 
  actionHref 
}: ErrorMessageProps) {
  return (
    <Card className="max-w-md mx-auto bg-red-50 border-red-100">
      <div className="text-center py-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-red-800 mb-2">{title}</h3>
        <p className="text-red-700 mb-4">{message}</p>
        {actionText && actionHref && (
          <a 
            href={actionHref} 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {actionText}
          </a>
        )}
      </div>
    </Card>
  );
} 