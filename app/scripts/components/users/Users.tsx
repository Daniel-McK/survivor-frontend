import * as React from 'react';
import styled from '../../../../node_modules/react-emotion';
import { find, map } from 'lodash';
import { User } from '../../models/types';
import PhotoList, { PhotoOption } from '../contestants/PhotoList';
import ProfileCard from '../common/ProfileCard';
import { getFullName, JEFF_URL } from '../../utils/user';
import UserProfile from './UserProfile';

interface UsersProps {
  users?: User[];
}

interface UsersState {
  activeUser?: PhotoOption;
}

const MainWrapper = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export class Users extends React.Component<UsersProps, UsersState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      activeUser: null
    };
  }

  public render() {
    const { users } = this.props;
    const { activeUser } = this.state;
    const selectedUser = activeUser && find(users, { username: activeUser.id });
    const options = map(users, this.transformUserToPhotoOption);
    return (
      <MainWrapper>
      <PhotoList
        options={options || []}
        onClick={this.setActive}
        active={activeUser}
      />
      {selectedUser ? <UserProfile user={selectedUser} /> : 'Select a user!'}
    </MainWrapper>
    );
  }

  private transformUserToPhotoOption = (user: User): PhotoOption => {
    return {
      id: user.username,
      imageUrl: JEFF_URL,
      name: getFullName(user),
      rank: user.rank
    };
  }

  private setActive = (option: PhotoOption) => {
    this.setState({
      activeUser: option
    });
  }
}
