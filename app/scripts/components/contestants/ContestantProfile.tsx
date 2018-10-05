import * as React from 'react';
import { Contestant } from '../../models/types';
import { withPoints, WithPointsProps } from '../../utils/withPoints';
import PointsList from '../points/PointsList';
import ProfileCard from '../common/ProfileCard';
import CollapsingRow from '../common/CollapsingRow';

interface BaseContestantProfileProps {
  contestant: Contestant;
}
type ContestantProfileProps = BaseContestantProfileProps & WithPointsProps;

class ContestantProfile extends React.Component<ContestantProfileProps, {}> {
  public render() {
    const { contestant, points } = this.props;
    return (
      <CollapsingRow>
        <ProfileCard
          imageUrl={contestant.imageUrl}
          name={contestant.name}
          rank={contestant.rank}
          totalPoints={contestant.totalPoints}
        />
        <PointsList points={points} showName={false} />
      </CollapsingRow>
    );
  }
}

export default withPoints('contestant.id')(ContestantProfile);
