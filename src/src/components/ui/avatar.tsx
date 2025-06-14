// src/components/ui/avatar.tsx

import React from 'react';

interface AvatarProps {
  src?: string;  // Image source URL (optional)
  alt: string;   // Alt text for the image (e.g., name)
  size?: 'small' | 'medium' | 'large'; // Avatar size
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'medium' }) => {
  let avatarSize = '';

  switch (size) {
    case 'small':
      avatarSize = 'w-8 h-8';
      break;
    case 'large':
      avatarSize = 'w-16 h-16';
      break;
    default:
      avatarSize = 'w-12 h-12'; // medium size
      break;
  }

  return (
    <div className={`rounded-full overflow-hidden ${avatarSize}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-300 text-white font-semibold">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default Avatar;
