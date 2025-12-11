import { useMemo, useState, useCallback } from 'react';
import type { User, SortConfig, SortField } from '@/types';

interface UseUserFilterSortProps {
  users: User[];
}

interface UseUserFilterSortReturn {
  filteredAndSortedUsers: User[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortConfig: SortConfig;
  setSortField: (field: SortField) => void;
  toggleSortDirection: () => void;
}

/**
 * Custom hook for filtering and sorting users
 * Provides memoized results for optimal performance
 */
export function useUserFilterSort({
  users,
}: UseUserFilterSortProps): UseUserFilterSortReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'name',
    direction: 'asc',
  });

  const setSortField = useCallback((field: SortField) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const toggleSortDirection = useCallback(() => {
    setSortConfig((prev) => ({
      ...prev,
      direction: prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase().trim();

    // Filter users
    const filtered = users.filter((user) => {
      if (!lowerSearchTerm) return true;

      return (
        user.name.toLowerCase().includes(lowerSearchTerm) ||
        user.email.toLowerCase().includes(lowerSearchTerm) ||
        user.username.toLowerCase().includes(lowerSearchTerm) ||
        user.company.name.toLowerCase().includes(lowerSearchTerm) ||
        user.address.city.toLowerCase().includes(lowerSearchTerm)
      );
    });

    // Sort users
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.field) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'company':
          comparison = a.company.name.localeCompare(b.company.name);
          break;
        case 'city':
          comparison = a.address.city.localeCompare(b.address.city);
          break;
        default:
          comparison = 0;
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [users, searchTerm, sortConfig]);

  return {
    filteredAndSortedUsers,
    searchTerm,
    setSearchTerm,
    sortConfig,
    setSortField,
    toggleSortDirection,
  };
}
