import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/application';
import type { User } from '@/domain';

// Base selectors
export const selectUsersState = (state: RootState) => state.users;
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.isLoading;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectSearchTerm = (state: RootState) => state.users.searchTerm;
export const selectSortConfig = (state: RootState) => state.users.sortConfig;

// Memoized selector for filtered and sorted users
export const selectFilteredAndSortedUsers = createSelector(
  [selectAllUsers, selectSearchTerm, selectSortConfig],
  (users, searchTerm, sortConfig): User[] => {
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
  }
);

// Memoized selector for statistics
export const selectUsersStats = createSelector(
  [selectAllUsers, selectFilteredAndSortedUsers],
  (users, filteredUsers) => ({
    total: users.length,
    displayed: filteredUsers.length,
    companies: new Set(users.map((u) => u.company.name)).size,
    cities: new Set(users.map((u) => u.address.city)).size,
  })
);
