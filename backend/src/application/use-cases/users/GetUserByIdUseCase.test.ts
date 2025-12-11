import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetUserByIdUseCase } from './GetUserByIdUseCase';
import type { IUserRepository, User } from '../../../domain/index';

describe('GetUserByIdUseCase', () => {
  let useCase: GetUserByIdUseCase;
  let mockRepository: IUserRepository;

  const mockUser: User = {
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
  };

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn().mockResolvedValue(mockUser),
      findByCompany: vi.fn(),
      findByCity: vi.fn(),
    };

    useCase = new GetUserByIdUseCase(mockRepository);
  });

  it('should return user when found', async () => {
    const result = await useCase.execute({ id: 1 });

    expect(result.user).toEqual(mockUser);
    expect(mockRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should return null when user not found', async () => {
    vi.mocked(mockRepository.findById).mockResolvedValue(null);

    const result = await useCase.execute({ id: 999 });

    expect(result.user).toBeNull();
    expect(mockRepository.findById).toHaveBeenCalledWith(999);
  });
});
