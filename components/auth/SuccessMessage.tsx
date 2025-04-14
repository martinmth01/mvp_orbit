import React from 'react';
import { Card } from '../ui';

interface SuccessMessageProps {
  title: string;
  message: string;
  actionText?: string;
  actionHref?: string;
}

export default function SuccessMessage({ 
  title, 
  message, 
  actionText, 
  actionHref 
}: SuccessMessageProps) {
  return (
    <Card className="max-w-md mx-auto bg-green-50 border-green-100">
      <div className="text-center py-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-green-800 mb-2">{title}</h3>
        <p className="text-green-700 mb-4">{message}</p>
        {actionText && actionHref && (
          <a 
            href={actionHref} 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {actionText}
          </a>
        )}
      </div>
    </Card>
  );
} 