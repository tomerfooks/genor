import type { User, SortField, SortConfig } from '@/domain';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from '@/presentation/components/icons';

interface UserTableProps {
  users: User[];
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
}

/**
 * Generates initials from a user's name
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generates a consistent color based on user id
 */
function getAvatarColor(id: number): string {
  const colors = [
    'bg-indigo-500',
    'bg-pink-500',
    'bg-purple-500',
    'bg-blue-500',
    'bg-teal-500',
    'bg-emerald-500',
    'bg-orange-500',
    'bg-rose-500',
    'bg-cyan-500',
    'bg-violet-500',
  ];
  return colors[id % colors.length];
}

/**
 * User Table Component
 * Displays users in a sortable table format
 */
export function UserTable({ users, sortConfig, onSort }: UserTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <SortableHeader
                field="name"
                currentSort={sortConfig}
                onSort={onSort}
              >
                User
              </SortableHeader>
              <SortableHeader
                field="email"
                currentSort={sortConfig}
                onSort={onSort}
              >
                Email
              </SortableHeader>
              <SortableHeader
                field="company"
                currentSort={sortConfig}
                onSort={onSort}
              >
                Company
              </SortableHeader>
              <SortableHeader
                field="city"
                currentSort={sortConfig}
                onSort={onSort}
              >
                Location
              </SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Contact
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${getAvatarColor(user.id)} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
                    >
                      {getInitials(user.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={`mailto:${user.email}`}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                    <span className="truncate max-w-[180px]">
                      {user.email.toLowerCase()}
                    </span>
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <BuildingOfficeIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate max-w-[150px]">
                      {user.company.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{user.address.city}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${user.phone}`}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 transition-colors"
                      title={user.phone}
                    >
                      <PhoneIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 transition-colors"
                      title={user.website}
                    >
                      <GlobeAltIcon className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface SortableHeaderProps {
  field: SortField;
  currentSort: SortConfig;
  onSort: (field: SortField) => void;
  children: React.ReactNode;
}

function SortableHeader({
  field,
  currentSort,
  onSort,
  children,
}: SortableHeaderProps) {
  const isActive = currentSort.field === field;

  return (
    <th
      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors select-none"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <span className="flex flex-col">
          <ChevronUpIcon
            className={`w-3 h-3 -mb-1 ${
              isActive && currentSort.direction === 'asc'
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
          <ChevronDownIcon
            className={`w-3 h-3 ${
              isActive && currentSort.direction === 'desc'
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        </span>
      </div>
    </th>
  );
}
