import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserFilterSort } from './useUserFilterSort';
import { mockUsers } from '@/test/mocks';

describe('useUserFilterSort', () => {
  it('returns all users when no filter is applied', () => {
    const { result } = renderHook(() => useUserFilterSort({ users: mockUsers }));
    expect(result.current.filteredAndSortedUsers).toHaveLength(mockUsers.length);
  });

  it('filters users by name', () => {
    const { result } = renderHook(() => useUserFilterSort({ users: mockUsers }));

    act(() => {
      result.current.setSearchTerm('Leanne');
    });

    expect(result.current.filteredAndSortedUsers).toHaveLength(1);
    expect(result.current.filteredAndSortedUsers[0].name).toBe('Leanne Graham');
  });

  it('filters users by email', () => {
    const { result } = renderHook(() => useUserFilterSort({ users: mockUsers }));

    act(() => {
      result.current.setSearchTerm('shanna');
    });

    expect(result.current.filteredAndSortedUsers).toHaveLength(1);
    expect(result.current.filteredAndSortedUsers[0].email).toBe('Shanna@melissa.tv');
  });

  it('filters users by company name', () => {
    const { result } = renderHook(() => useUserFilterSort({ users: mockUsers }));

    act(() => {
      result.current.setSearchTerm('Deckow');
    });

    expect(result.current.filteredAndSortedUsers).toHaveLength(1);
    expect(result.current.filteredAndSortedUsers[0].company.name).toBe('Deckow-Crist');
  });

  it('filters users by city', () => {
    const { result } = renderHook(() => useUserFilterSort({ users: mockUsers }));

    act(() => {
      result.current.setSearchTerm('McKenzie');
    });

    expect(result.current.filteredAndSortedUsers).toHaveLength(1);
    expect(result.current.filteredAndSortedUsers[0].address.city).toBe('McKenziehaven');
  });

  it('returns empty array when no matches found', () => {
    const { result } = renderHook(() => useUserFilterSort({ users: mockUsers }));

    act(() => {
      result.current.setSearchTerm('nonexistent');
    });

    expect(result.current.filteredAndSortedUsers).toHaveLength(0);
  });

  it('sorts users by name ascending by default', () => {
    const { result } = renderHook(() => useUserFilterSort({ users: mockUsers }));

    expect(result.current.sortConfig.field).toBe('name');
    expect(result.current.sortConfig.direction).toBe('asc');
    expect(result.current.filteredAndSortedUsers[0].name).toBe('Clementine Bauch');
  });

  it('toggles sort direction when same field is selected', () => {
    const { result } = renderHook(() => useUserFilterSort({ users: mockUsers }));

    act(() => {
      result.current.setSortField('name');
    });

    expect(result.current.sortConfig.direction).toBe('desc');
    expect(result.current.filteredAndSortedUsers[0].name).toBe('Leanne Graham');
  });

  it('sorts users by email', () => {
    const { result } = renderHook(() => useUserFilterSort({ users: mockUsers }));

    act(() => {
      result.current.setSortField('email');
    });

    expect(result.current.sortConfig.field).toBe('email');
    expect(result.current.filteredAndSortedUsers[0].email).toBe('Nathan@yesenia.net');
  });

  it('sorts users by company', () => {
    const { result } = renderHook(() => useUserFilterSort({ users: mockUsers }));

    act(() => {
      result.current.setSortField('company');
    });

    expect(result.current.sortConfig.field).toBe('company');
    expect(result.current.filteredAndSortedUsers[0].company.name).toBe('Deckow-Crist');
  });

  it('sorts users by city', () => {
    const { result } = renderHook(() => useUserFilterSort({ users: mockUsers }));

    act(() => {
      result.current.setSortField('city');
    });

    expect(result.current.sortConfig.field).toBe('city');
    expect(result.current.filteredAndSortedUsers[0].address.city).toBe('Gwenborough');
  });

  it('toggles sort direction', () => {
    const { result } = renderHook(() => useUserFilterSort({ users: mockUsers }));

    expect(result.current.sortConfig.direction).toBe('asc');

    act(() => {
      result.current.toggleSortDirection();
    });

    expect(result.current.sortConfig.direction).toBe('desc');

    act(() => {
      result.current.toggleSortDirection();
    });

    expect(result.current.sortConfig.direction).toBe('asc');
  });

  it('combines filtering and sorting', () => {
    const { result } = renderHook(() => useUserFilterSort({ users: mockUsers }));

    act(() => {
      result.current.setSearchTerm('Romaguera');
      result.current.setSortField('name');
    });

    // Should find users with Romaguera in company name
    expect(result.current.filteredAndSortedUsers).toHaveLength(2);
  });
});
