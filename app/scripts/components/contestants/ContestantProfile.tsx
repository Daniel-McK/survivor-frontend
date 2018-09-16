import * as React from 'react';
import styled from 'react-emotion';
import { Contestant } from '../../models/types';
import { withPoints, WithPointsProps } from '../../utils/withPoints';

const Column = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileCard = styled('div')`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  background-color: white;
  overflow: hidden;
  align-items: center;
  margin: 16px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
`;

const ProfilePic = styled('img')`
  height: 250px;
`;

const ProfileName = styled('div')`
  padding: 10px;
  font-size: 1.2rem;
`;

interface BaseContestantProfileProps {
  contestant: Contestant;
}
type ContestantProfileProps = BaseContestantProfileProps & WithPointsProps;

class ContestantProfile extends React.Component<ContestantProfileProps, {}> {

  public render() {
    const { contestant } = this.props;
     return (
       <Column>
        <ProfileCard>
          <ProfilePic src={contestant.imageUrl} alt={contestant.name} />
          <ProfileName>{contestant.name}</ProfileName>
        </ProfileCard>
       </Column>
     );
  }

}

export default withPoints('contestant.id')(ContestantProfile);
