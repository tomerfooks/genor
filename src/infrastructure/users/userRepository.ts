import type { User, IUserRepository, IApiService } from '@/domain';
import { apiService } from '@/infrastructure/http';


class UserRepository implements IUserRepository {
  constructor(private api: IApiService) {}

  async getAll(): Promise<User[]> {
    return this.api.get<User[]>('/users');
  }

  async getById(id: number): Promise<User> {
    return this.api.get<User>(`/users/${id}`);
  }
}

// Default instance using the HTTP service
export const userRepository: IUserRepository = new UserRepository(apiService);

// Factory function for dependency injection (useful for testing)
export function createUserRepository(api: IApiService): IUserRepository {
  return new UserRepository(api);
}
