import type { User } from '../entities/User';

/**
 * User Repository Interface
 * Defines the contract for user data operations
 * This is a port in hexagonal architecture terms
 */
export interface IUserRepository {
  /**
   * Retrieve all users
   */
  findAll(): Promise<User[]>;

  /**
   * Find a user by their ID
   * @param id - The user's unique identifier
   */
  findById(id: number): Promise<User | null>;

  /**
   * Find users by company name
   * @param companyName - The company name to filter by
   */
  findByCompany(companyName: string): Promise<User[]>;

  /**
   * Find users by city
   * @param city - The city name to filter by
   */
  findByCity(city: string): Promise<User[]>;
}
