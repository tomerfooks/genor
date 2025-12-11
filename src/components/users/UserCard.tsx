import type { User } from '@/types';
import { Card } from '@/components/ui';
import {
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from '@/components/icons';

interface UserCardProps {
  user: User;
}

/**
 * Generates initials from a user's name
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generates a consistent color based on user id
 */
function getAvatarColor(id: number): string {
  const colors = [
    'bg-indigo-500',
    'bg-pink-500',
    'bg-purple-500',
    'bg-blue-500',
    'bg-teal-500',
    'bg-emerald-500',
    'bg-orange-500',
    'bg-rose-500',
    'bg-cyan-500',
    'bg-violet-500',
  ];
  return colors[id % colors.length];
}

/**
 * User Card Component
 * Displays user information in a card format
 */
export function UserCard({ user }: UserCardProps) {
  return (
    <Card
      variant="bordered"
      padding="none"
      hover
      className="overflow-hidden animate-fade-in"
    >
      {/* Header with gradient */}
      <div className="h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
        <div className="absolute -bottom-6 left-5">
          <div
            className={`w-14 h-14 rounded-xl ${getAvatarColor(user.id)} flex items-center justify-center text-white font-bold text-lg shadow-lg ring-4 ring-white dark:ring-gray-800`}
          >
            {getInitials(user.name)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-10 pb-5 px-5">
        {/* Name and username */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {user.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{user.username}
          </p>
        </div>

        {/* Info items */}
        <div className="space-y-2.5">
          <InfoItem icon={<EnvelopeIcon />} href={`mailto:${user.email}`}>
            {user.email.toLowerCase()}
          </InfoItem>

          <InfoItem icon={<PhoneIcon />} href={`tel:${user.phone}`}>
            {user.phone}
          </InfoItem>

          <InfoItem
            icon={<GlobeAltIcon />}
            href={`https://${user.website}`}
            external
          >
            {user.website}
          </InfoItem>

          <InfoItem icon={<BuildingOfficeIcon />}>
            {user.company.name}
          </InfoItem>

          <InfoItem icon={<MapPinIcon />}>
            {user.address.city}
          </InfoItem>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700/50">
        <p className="text-xs text-gray-500 dark:text-gray-400 italic truncate">
          "{user.company.catchPhrase}"
        </p>
      </div>
    </Card>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
}

function InfoItem({ icon, children, href, external }: InfoItemProps) {
  const content = (
    <>
      <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">
        {icon}
      </span>
      <span className="truncate">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
      {content}
    </div>
  );
}
