import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { Input } from '@/components/ui';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders with left icon', () => {
    const icon = <span data-testid="left-icon">🔍</span>;
    render(<Input leftIcon={icon} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    const icon = <span data-testid="right-icon">✓</span>;
    render(<Input rightIcon={icon} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText('Type here');
    
    fireEvent.change(input, { target: { value: 'Hello World' } });
    expect(input).toHaveValue('Hello World');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });
});
