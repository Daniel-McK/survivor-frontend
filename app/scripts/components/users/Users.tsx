import * as React from 'react';
import styled from '../../../../node_modules/react-emotion';
import { find, map } from 'lodash';
import { User } from '../../models/types';
import PhotoList, { PhotoOption } from '../contestants/PhotoList';
import { getFullName, JEFF_URL } from '../../utils/user';
import UserProfile from './UserProfile';

interface UsersProps {
  users?: User[];
}

const MainWrapper = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Users: React.SFC<UsersProps> = props => {
  const [activeUser, setActiveUser] = React.useState<PhotoOption>(null);
  const { users } = props;
  const selectedUser = activeUser && find(users, { username: activeUser.id });
  const options = map(users, transformUserToPhotoOption);
  return (
    <MainWrapper>
      <PhotoList
        options={options || []}
        onClick={setActiveUser}
        active={activeUser}
      />
      {selectedUser ? <UserProfile user={selectedUser} /> : 'Select a user!'}
    </MainWrapper>
  );
};

function transformUserToPhotoOption(user: User): PhotoOption {
  return {
    id: user.username,
    imageUrl: JEFF_URL,
    name: getFullName(user),
    rank: user.rank
  };
}
