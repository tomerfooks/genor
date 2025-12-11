import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { ErrorState } from '@/components/common';

describe('ErrorState', () => {
  it('renders error message', () => {
    render(<ErrorState message="Custom error message" />);
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<ErrorState message="Error message" />);
    expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument();
  });

  it('renders retry button when onRetry is provided', () => {
    const onRetry = () => {};
    render(<ErrorState message="Error" onRetry={onRetry} />);
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorState message="Error" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
