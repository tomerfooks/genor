import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { UserCard } from '@/components/users';
import { mockUsers } from '@/test/mocks';

describe('UserCard', () => {
  const user = mockUsers[0];

  it('renders user name', () => {
    render(<UserCard user={user} />);
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it('renders username with @ prefix', () => {
    render(<UserCard user={user} />);
    expect(screen.getByText(`@${user.username}`)).toBeInTheDocument();
  });

  it('renders user email as a link', () => {
    render(<UserCard user={user} />);
    const emailLink = screen.getByText(user.email.toLowerCase());
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest('a')).toHaveAttribute('href', `mailto:${user.email}`);
  });

  it('renders user phone as a link', () => {
    render(<UserCard user={user} />);
    const phoneLink = screen.getByText(user.phone);
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink.closest('a')).toHaveAttribute('href', `tel:${user.phone}`);
  });

  it('renders user website as an external link', () => {
    render(<UserCard user={user} />);
    const websiteLink = screen.getByText(user.website);
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink.closest('a')).toHaveAttribute('href', `https://${user.website}`);
    expect(websiteLink.closest('a')).toHaveAttribute('target', '_blank');
  });

  it('renders company name', () => {
    render(<UserCard user={user} />);
    expect(screen.getByText(user.company.name)).toBeInTheDocument();
  });

  it('renders city', () => {
    render(<UserCard user={user} />);
    expect(screen.getByText(user.address.city)).toBeInTheDocument();
  });

  it('renders company catchphrase', () => {
    render(<UserCard user={user} />);
    expect(screen.getByText(`"${user.company.catchPhrase}"`)).toBeInTheDocument();
  });

  it('renders user initials', () => {
    render(<UserCard user={user} />);
    // Leanne Graham -> LG
    expect(screen.getByText('LG')).toBeInTheDocument();
  });
});
