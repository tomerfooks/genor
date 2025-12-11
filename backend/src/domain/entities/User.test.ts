import { describe, it, expect } from 'vitest';
import { createUser, type User } from './User';

describe('User Entity', () => {
  const userData: User = {
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

  it('should create a user with correct properties', () => {
    const user = createUser(userData);

    expect(user.id).toBe(1);
    expect(user.name).toBe('John Doe');
    expect(user.username).toBe('johndoe');
    expect(user.email).toBe('john@example.com');
    expect(user.phone).toBe('555-1234');
    expect(user.website).toBe('johndoe.com');
  });

  it('should create address with correct properties', () => {
    const user = createUser(userData);

    expect(user.address.street).toBe('123 Main St');
    expect(user.address.suite).toBe('Apt 1');
    expect(user.address.city).toBe('New York');
    expect(user.address.zipcode).toBe('10001');
    expect(user.address.geo.lat).toBe('40.7128');
    expect(user.address.geo.lng).toBe('-74.0060');
  });

  it('should create company with correct properties', () => {
    const user = createUser(userData);

    expect(user.company.name).toBe('Acme Corp');
    expect(user.company.catchPhrase).toBe('Innovation First');
    expect(user.company.bs).toBe('synergize scalable solutions');
  });

  it('should create frozen (immutable) user object', () => {
    const user = createUser(userData);

    expect(Object.isFrozen(user)).toBe(true);
    expect(Object.isFrozen(user.address)).toBe(true);
    expect(Object.isFrozen(user.address.geo)).toBe(true);
    expect(Object.isFrozen(user.company)).toBe(true);
  });
});
