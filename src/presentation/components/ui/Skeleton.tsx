interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

/**
 * Skeleton Loading Component
 * For displaying loading placeholders
 */
export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) {
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      className={`skeleton ${variantStyles[variant]} ${className}`}
      style={style}
    />
  );
}

/**
 * User Card Skeleton
 * Matches the layout of UserCard component
 */
export function UserCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 animate-pulse">
      <div className="flex items-start gap-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 min-w-0">
          <Skeleton variant="text" width="60%" height={20} className="mb-2" />
          <Skeleton variant="text" width="40%" height={16} />
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="80%" height={16} />
        <Skeleton variant="text" width="70%" height={16} />
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton variant="rectangular" width={60} height={24} className="rounded-full" />
        <Skeleton variant="rectangular" width={80} height={24} className="rounded-full" />
      </div>
    </div>
  );
}

/**
 * User Table Row Skeleton
 * For table loading states
 */
export function UserTableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width={40} height={40} />
          <div>
            <Skeleton variant="text" width={120} height={16} className="mb-1" />
            <Skeleton variant="text" width={80} height={14} />
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <Skeleton variant="text" width={160} height={16} />
      </td>
      <td className="px-6 py-4">
        <Skeleton variant="text" width={100} height={16} />
      </td>
      <td className="px-6 py-4">
        <Skeleton variant="text" width={80} height={16} />
      </td>
    </tr>
  );
}
