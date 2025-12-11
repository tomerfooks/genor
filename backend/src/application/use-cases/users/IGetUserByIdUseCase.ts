import type { User } from '../../domain/index';

/**
 * Get User By ID Use Case Input
 */
export interface GetUserByIdInput {
  id: number;
}

/**
 * Get User By ID Use Case Output
 */
export interface GetUserByIdOutput {
  user: User | null;
}

/**
 * Get User By ID Use Case Interface
 */
export interface IGetUserByIdUseCase {
  execute(input: GetUserByIdInput): Promise<GetUserByIdOutput>;
}
