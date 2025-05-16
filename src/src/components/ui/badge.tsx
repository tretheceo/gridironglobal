// src/components/ui/badge.tsx

import React from 'react';

interface BadgeProps {
  color?: 'red' | 'blue' | 'green' | 'yellow';
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ color = 'blue', label }) => {
  let badgeColor = '';

  switch (color) {
    case 'red':
      badgeColor = 'bg-red-500 text-white';
      break;
    case 'blue':
      badgeColor = 'bg-blue-500 text-white';
      break;
    case 'green':
      badgeColor = 'bg-green-500 text-white';
      break;
    case 'yellow':
      badgeColor = 'bg-yellow-500 text-black';
      break;
    default:
      badgeColor = 'bg-gray-500 text-white';
      break;
  }

  return (
    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${badgeColor}`}>
      {label}
    </span>
  );
};

export default Badge;
