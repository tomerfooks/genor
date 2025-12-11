import { Button } from '@/components/ui';
import { ExclamationTriangleIcon, RefreshIcon } from '@/components/icons';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Error State Component
 * Displays error message with optional retry action
 */
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
        <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} leftIcon={<RefreshIcon className="w-4 h-4" />}>
          Try Again
        </Button>
      )}
    </div>
  );
}
