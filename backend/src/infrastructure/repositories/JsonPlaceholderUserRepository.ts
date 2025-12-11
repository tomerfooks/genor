import type { User, IUserRepository } from '../../domain/index';
import { createUser } from '../../domain/index';
import type { IHttpClient } from '../http/index';

/**
 * JSONPlaceholder User Repository Implementation
 * Adapter that implements IUserRepository using JSONPlaceholder API
 */
export class JsonPlaceholderUserRepository implements IUserRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async findAll(): Promise<User[]> {
    const rawUsers = await this.httpClient.get<User[]>('/users');
    return rawUsers.map(createUser);
  }

  async findById(id: number): Promise<User | null> {
    try {
      const rawUser = await this.httpClient.get<User>(`/users/${id}`);
      return createUser(rawUser);
    } catch {
      return null;
    }
  }

  async findByCompany(companyName: string): Promise<User[]> {
    const users = await this.findAll();
    return users.filter(
      (user) => user.company.name.toLowerCase() === companyName.toLowerCase()
    );
  }

  async findByCity(city: string): Promise<User[]> {
    const users = await this.findAll();
    return users.filter(
      (user) => user.address.city.toLowerCase() === city.toLowerCase()
    );
  }
}
