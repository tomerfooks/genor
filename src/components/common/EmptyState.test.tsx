import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { EmptyState } from '@/components/common';

describe('EmptyState', () => {
  it('renders default title', () => {
    render(<EmptyState />);
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('renders default message', () => {
    render(<EmptyState />);
    expect(screen.getByText('There are no users to display at the moment.')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<EmptyState title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(<EmptyState message="Custom message" />);
    expect(screen.getByText('Custom message')).toBeInTheDocument();
  });

  it('renders search result message when isSearchResult is true', () => {
    render(<EmptyState isSearchResult />);
    expect(screen.getByText(/try adjusting your search/i)).toBeInTheDocument();
  });
});
