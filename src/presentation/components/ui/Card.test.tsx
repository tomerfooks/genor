import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/presentation/components/ui';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('renders with bordered variant by default', () => {
    render(<Card>Content</Card>);
    const card = screen.getByText('Content');
    expect(card).toBeInTheDocument();
  });

  it('renders with elevated variant', () => {
    render(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText('Elevated')).toBeInTheDocument();
  });

  it('applies hover styles when hover prop is true', () => {
    render(<Card hover>Hoverable</Card>);
    expect(screen.getByText('Hoverable')).toBeInTheDocument();
  });

  it('renders with different padding sizes', () => {
    const { rerender } = render(<Card padding="sm">Small</Card>);
    expect(screen.getByText('Small')).toBeInTheDocument();

    rerender(<Card padding="lg">Large</Card>);
    expect(screen.getByText('Large')).toBeInTheDocument();
  });
});

describe('Card Components', () => {
  it('renders CardHeader', () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('renders CardTitle', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByText('Title');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H3');
  });

  it('renders CardDescription', () => {
    render(<CardDescription>Description</CardDescription>);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders CardContent', () => {
    render(<CardContent>Content</CardContent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders CardFooter', () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
