import type { IUserRepository } from '../../../domain/index';
import type {
  IGetAllUsersUseCase,
  GetAllUsersInput,
  GetAllUsersOutput,
} from './IGetAllUsersUseCase';

/**
 * Get All Users Use Case Implementation
 * Retrieves all users from the repository
 */
export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(_input?: GetAllUsersInput): Promise<GetAllUsersOutput> {
    const users = await this.userRepository.findAll();

    return {
      users,
      total: users.length,
    };
  }
}
