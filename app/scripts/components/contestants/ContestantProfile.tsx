import * as React from 'react';
import { Contestant, User } from '../../models/types';
import { withPoints, WithPointsProps } from '../../utils/withPoints';
import PointsList from '../points/PointsList';
import ProfileCard from '../common/ProfileCard';
import CollapsingRow from '../common/CollapsingRow';
import { find } from 'lodash';

interface BaseContestantProfileProps {
  contestant: Contestant;
  users: User[];
}
type ContestantProfileProps = BaseContestantProfileProps & WithPointsProps;

class ContestantProfile extends React.Component<ContestantProfileProps, {}> {
  public render() {
    const { contestant, points, users } = this.props;
    return (
      <CollapsingRow>
        <ProfileCard
          imageUrl={contestant.imageUrl}
          name={contestant.name}
          rank={contestant.rank}
          totalPoints={contestant.totalPoints}
          user={find(users, { username: contestant.userId }) as any}
          additionalInfo={`${contestant.tribeName} Tribe`}
        />
        <PointsList points={points} showName={false} />
      </CollapsingRow>
    );
  }
}

export default withPoints('contestant.id')(ContestantProfile);
