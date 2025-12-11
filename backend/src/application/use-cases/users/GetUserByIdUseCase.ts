import type { IUserRepository } from '../../../domain/index';
import type {
  IGetUserByIdUseCase,
  GetUserByIdInput,
  GetUserByIdOutput,
} from './IGetUserByIdUseCase';

/**
 * Get User By ID Use Case Implementation
 * Retrieves a single user by their ID
 */
export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: GetUserByIdInput): Promise<GetUserByIdOutput> {
    const user = await this.userRepository.findById(input.id);

    return {
      user,
    };
  }
}
