import * as React from 'react';
import styled from 'react-emotion';
import { sumBy } from 'lodash';
import { Contestant, Point } from '../../models/types';
import { withPoints, WithPointsProps } from '../../utils/withPoints';
import PointsList from '../points/PointsList';
import { SMALL_SCREEN } from '../../../styles/responsive';
import { getPlaceTextFromRank } from '../../utils/format';

const CollapsingRow = styled('div')`
  display: flex;
  padding-top: 16px;
  ${SMALL_SCREEN} {
    flex-direction: column;
    align-items: center;
  }
`;

const ProfileCard = styled('div')`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  background-color: white;
  overflow: hidden;
  align-items: center;
  margin: 0 16px 16px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
`;

const ProfilePic = styled('img')`
  height: 250px;
`;

const ProfileLabel = styled('div')`
  padding-top: 10px;
  font-size: 1.2rem;

  &:last-child {
    padding-bottom: 10px;
  }
`;

interface BaseContestantProfileProps {
  contestant: Contestant;
}
type ContestantProfileProps = BaseContestantProfileProps & WithPointsProps;

class ContestantProfile extends React.Component<ContestantProfileProps, {}> {
  public render() {
    const { contestant, points } = this.props;
    const totalPoints = sumBy(points, (point: Point) => point.pointType.value) || 0;
    return (
      <CollapsingRow>
        <ProfileCard>
          <ProfilePic src={contestant.imageUrl} alt={contestant.name} />
          <ProfileLabel>{contestant.name}</ProfileLabel>
          <ProfileLabel>{getPlaceTextFromRank(contestant.rank)}</ProfileLabel>
          <ProfileLabel>{totalPoints} points</ProfileLabel>
        </ProfileCard>
        <PointsList points={points} showName={false} />
      </CollapsingRow>
    );
  }
}

export default withPoints('contestant.id')(ContestantProfile);
