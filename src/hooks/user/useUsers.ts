import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/types';
import type { IUserRepository } from '@/interfaces';
import { userRepository } from '@/repositories';
import { ApiError } from '@/services';

interface UseUsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

interface UseUsersReturn extends UseUsersState {
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching and managing users data
 * Handles loading, error states, and provides refetch capability
 * 
 * Following Dependency Inversion Principle:
 * - Accepts repository as optional param for testing
 * - Defaults to production repository
 */
export function useUsers(
  repository: IUserRepository = userRepository
): UseUsersReturn {
  const [state, setState] = useState<UseUsersState>({
    users: [],
    isLoading: true,
    error: null,
  });

  const fetchUsers = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const users = await repository.getAll();
      setState({ users, isLoading: false, error: null });
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? `Failed to fetch users: ${err.message}`
          : 'An unexpected error occurred while fetching users';

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  }, [repository]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    ...state,
    refetch: fetchUsers,
  };
}
