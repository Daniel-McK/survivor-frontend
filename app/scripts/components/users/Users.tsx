import * as React from 'react';
import styled from '../../../../node_modules/react-emotion';
import { find, map } from 'lodash';
import { User } from '../../models/types';
import PhotoList, { PhotoOption } from '../contestants/PhotoList';

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
      {selectedUser ? selectedUser.firstName : 'Select a user!'}
    </MainWrapper>
    );
  }

  private transformUserToPhotoOption = (user: User): PhotoOption => {
    return {
      id: user.username,
      imageUrl: 'https://wwwimage-secure.cbsstatic.com/thumbnails/photos/w270/cast/4048f07cd7d2b184_probst_800.jpg',
      name: `${user.firstName} ${user.lastName}`,
      rank: user.rank
    };
  }

  private setActive = (option: PhotoOption) => {
    this.setState({
      activeUser: option
    });
  }
}
