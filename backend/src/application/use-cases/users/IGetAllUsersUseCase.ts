import type { User } from '../../domain/index';

/**
 * Get All Users Use Case Input
 */
export interface GetAllUsersInput {
  // Could include pagination, filters in the future
}

/**
 * Get All Users Use Case Output
 */
export interface GetAllUsersOutput {
  users: User[];
  total: number;
}

/**
 * Get All Users Use Case Interface
 */
export interface IGetAllUsersUseCase {
  execute(input?: GetAllUsersInput): Promise<GetAllUsersOutput>;
}
