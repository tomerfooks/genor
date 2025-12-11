import { InboxIcon, SearchIcon } from '@/presentation/components/icons';

interface EmptyStateProps {
  title?: string;
  message?: string;
  isSearchResult?: boolean;
}

/**
 * Empty State Component
 * Displays when no data is available
 */
export function EmptyState({
  title = 'No users found',
  message = 'There are no users to display at the moment.',
  isSearchResult = false,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        {isSearchResult ? (
          <SearchIcon className="w-8 h-8 text-gray-400" />
        ) : (
          <InboxIcon className="w-8 h-8 text-gray-400" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
        {isSearchResult
          ? 'Try adjusting your search or filter to find what you\'re looking for.'
          : message}
      </p>
    </div>
  );
}
