import { useState, useMemo } from 'react';
import { Input, Button, Badge } from '@/components/ui';
import { UserCard, UserTable, UserGridSkeleton, UserTableSkeleton } from '@/components/users';
import { ErrorState, EmptyState } from '@/components/common';
import {
  SearchIcon,
  RefreshIcon,
  GridIcon,
  ListIcon,
  ChevronUpDownIcon,
} from '@/components/icons';
import { useUsers, useUserFilterSort } from '@/hooks';
import type { SortField } from '@/types';

type ViewMode = 'grid' | 'table';

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'company', label: 'Company' },
  { value: 'city', label: 'City' },
];

/**
 * Users Dashboard Component
 * Main feature component that displays and manages user list
 */
export function UsersDashboard() {
  const { users, isLoading, error, refetch } = useUsers();
  const {
    filteredAndSortedUsers,
    searchTerm,
    setSearchTerm,
    sortConfig,
    setSortField,
  } = useUserFilterSort({ users });

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Statistics
  const stats = useMemo(
    () => ({
      total: users.length,
      displayed: filteredAndSortedUsers.length,
      companies: new Set(users.map((u) => u.company.name)).size,
      cities: new Set(users.map((u) => u.address.city)).size,
    }),
    [users, filteredAndSortedUsers]
  );

  // Handle error state
  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value={isLoading ? '-' : stats.total}
          color="indigo"
        />
        <StatCard
          label="Displayed"
          value={isLoading ? '-' : stats.displayed}
          color="emerald"
        />
        <StatCard
          label="Companies"
          value={isLoading ? '-' : stats.companies}
          color="purple"
        />
        <StatCard
          label="Cities"
          value={isLoading ? '-' : stats.cities}
          color="orange"
        />
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <Input
              placeholder="Search users by name, email, company, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<SearchIcon className="w-5 h-5" />}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <Button
              variant="secondary"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              rightIcon={<ChevronUpDownIcon className="w-4 h-4" />}
            >
              Sort: {sortOptions.find((o) => o.value === sortConfig.field)?.label}
              {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
            </Button>

            {showSortDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowSortDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortField(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between ${
                        sortConfig.field === option.value
                          ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {option.label}
                      {sortConfig.field === option.value && (
                        <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-800/50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              aria-label="Grid view"
            >
              <GridIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              aria-label="Table view"
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Refresh */}
          <Button
            variant="ghost"
            onClick={refetch}
            aria-label="Refresh users"
            className="!px-2.5"
          >
            <RefreshIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Active filters */}
        {searchTerm && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Filtered by:
            </span>
            <Badge variant="primary">
              "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="ml-1.5 hover:text-indigo-800 dark:hover:text-indigo-200"
              >
                ×
              </button>
            </Badge>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({filteredAndSortedUsers.length} result{filteredAndSortedUsers.length !== 1 ? 's' : ''})
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        viewMode === 'grid' ? (
          <UserGridSkeleton count={6} />
        ) : (
          <UserTableSkeleton count={6} />
        )
      ) : filteredAndSortedUsers.length === 0 ? (
        <EmptyState
          isSearchResult={!!searchTerm}
          title={searchTerm ? 'No matching users' : 'No users found'}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <UserTable
          users={filteredAndSortedUsers}
          sortConfig={sortConfig}
          onSort={setSortField}
        />
      )}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  color: 'indigo' | 'emerald' | 'purple' | 'orange';
}

const colorClasses = {
  indigo: 'from-indigo-500 to-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20',
  emerald: 'from-emerald-500 to-emerald-600 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
  purple: 'from-purple-500 to-purple-600 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
  orange: 'from-orange-500 to-orange-600 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20',
};

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${colorClasses[color].split(' ').slice(0, 2).join(' ')}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
}
