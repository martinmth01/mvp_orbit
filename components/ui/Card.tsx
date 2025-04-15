import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ 
  children, 
  title, 
  footer, 
  className = '',
  hoverable = false
}: CardProps) {
  return (
    <div className={`card ${hoverable ? 'hover:shadow-card-hover' : ''} ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{title}</h3>
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-700">
          {footer}
        </div>
      )}
    </div>
  );
} 