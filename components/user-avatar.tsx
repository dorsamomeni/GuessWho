import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from './ui/text';
import { useUser } from '@clerk/clerk-expo';
import React, { useMemo } from 'react';

export function UserAvatar(props: Omit<React.ComponentProps<typeof Avatar>, 'alt'>) {
  const { user } = useUser();

  const { initials, imageSource, userName } = useMemo(() => {
    const userName = user?.fullName || user?.emailAddresses[0]?.emailAddress || 'Unknown';
    const initials = userName
      .split(' ')
      .map((name) => name[0])
      .join('');

    const imageSource = user?.imageUrl ? { uri: user.imageUrl } : undefined;
    return { initials, imageSource, userName };
  }, [user?.imageUrl, user?.fullName, user?.emailAddresses[0]?.emailAddress]);

  return (
    <Avatar alt={`${userName}'s avatar`} {...props}>
      <AvatarImage source={imageSource} />
      <AvatarFallback>
        <Text>{initials}</Text>
      </AvatarFallback>
    </Avatar>
  );
}