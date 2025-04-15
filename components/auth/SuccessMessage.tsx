import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

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
    <Card className="max-w-md mx-auto bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800" hoverable>
      <div className="text-center py-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-800 mb-4">
          <svg className="h-6 w-6 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">{title}</h3>
        <p className="text-green-700 dark:text-green-400 mb-4">{message}</p>
        {actionText && actionHref && (
          <Button
            variant="primary"
            onClick={() => window.location.href = actionHref}
          >
            {actionText}
          </Button>
        )}
      </div>
    </Card>
  );
} 