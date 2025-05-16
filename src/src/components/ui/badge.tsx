// src/components/ui/badge.tsx

import React from 'react';

interface BadgeProps {
  text: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
}

const Badge: React.FC<BadgeProps> = ({ text, color = 'blue' }) => {
  let badgeColor = '';

  switch (color) {
    case 'green':
      badgeColor = 'bg-green-500 text-white';
      break;
    case 'red':
      badgeColor = 'bg-red-500 text-white';
      break;
    case 'yellow':
      badgeColor = 'bg-yellow-500 text-black';
      break;
