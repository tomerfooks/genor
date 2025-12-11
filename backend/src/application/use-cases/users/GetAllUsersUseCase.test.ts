import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetAllUsersUseCase } from './GetAllUsersUseCase';
import type { IUserRepository, User } from '../../../domain/index';

describe('GetAllUsersUseCase', () => {
  let useCase: GetAllUsersUseCase;
  let mockRepository: IUserRepository;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        suite: 'Apt 1',
        city: 'New York',
        zipcode: '10001',
        geo: { lat: '40.7128', lng: '-74.0060' },
      },
      phone: '555-1234',
      website: 'johndoe.com',
      company: {
        name: 'Acme Corp',
        catchPhrase: 'Innovation First',
        bs: 'synergize scalable solutions',
      },
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      address: {
        street: '456 Oak Ave',
        suite: 'Suite 200',
        city: 'Los Angeles',
        zipcode: '90001',
        geo: { lat: '34.0522', lng: '-118.2437' },
      },
      phone: '555-5678',
      website: 'janesmith.com',
      company: {
        name: 'Tech Inc',
        catchPhrase: 'Building Tomorrow',
        bs: 'leverage agile frameworks',
      },
    },
  ];

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn().mockResolvedValue(mockUsers),
      findById: vi.fn(),
      findByCompany: vi.fn(),
      findByCity: vi.fn(),
    };

    useCase = new GetAllUsersUseCase(mockRepository);
  });

  it('should return all users from repository', async () => {
    const result = await useCase.execute();

    expect(result.users).toEqual(mockUsers);
    expect(result.total).toBe(2);
    expect(mockRepository.findAll).toHaveBeenCalledOnce();
  });

  it('should return empty array when no users exist', async () => {
    vi.mocked(mockRepository.findAll).mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result.users).toEqual([]);
    expect(result.total).toBe(0);
  });
});
