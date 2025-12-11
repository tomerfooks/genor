import type { User } from './User';

/**
 * User Repository Interface
 * Defines the contract for user data operations
 * Following Interface Segregation Principle (ISP)
 */
export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
}
