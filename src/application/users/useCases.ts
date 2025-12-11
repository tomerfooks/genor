import type { User } from '@/domain';
import { userRepository } from '@/infrastructure';

/**
 * Use case for fetching all users
 * Orchestrates the data fetching and any business logic
 */
export async function getAllUsers(): Promise<User[]> {
  const users = await userRepository.getAll();
  return users;
}

/**
 * Use case for fetching a user by ID
 */
export async function getUserById(id: number): Promise<User | null> {
  const users = await userRepository.getAll();
  return users.find((user) => user.id === id) ?? null;
}
