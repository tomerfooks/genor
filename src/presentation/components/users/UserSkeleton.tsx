import { UserCardSkeleton, UserTableRowSkeleton } from '@/presentation/components/ui';

interface UserGridSkeletonProps {
  count?: number;
}

/**
 * Grid Layout Skeleton
 */
export function UserGridSkeleton({ count = 6 }: UserGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <UserCardSkeleton key={index} />
      ))}
    </div>
  );
}

interface UserTableSkeletonProps {
  count?: number;
}

/**
 * Table Layout Skeleton
 */
export function UserTableSkeleton({ count = 6 }: UserTableSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: count }).map((_, index) => (
            <UserTableRowSkeleton key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
