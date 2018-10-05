import * as React from 'react';
import CollapsingRow from '../common/CollapsingRow';
import ProfileCard from '../common/ProfileCard';
import { User } from '../../models/types';
import { getFullName, JEFF_URL } from '../../utils/user';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.StatelessComponent<UserProfileProps> = (
  props: UserProfileProps
) => {
  const { user } = props;
  if (!user) {
    return null;
  }

  return (
    <CollapsingRow>
      <ProfileCard
        imageUrl={JEFF_URL}
        name={getFullName(user)}
        rank={user.rank}
        totalPoints={user.totalPoints}
      />
    </CollapsingRow>
  );
};

export default UserProfile;
