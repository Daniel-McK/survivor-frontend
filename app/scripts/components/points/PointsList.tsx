import * as React from 'react';
import { groupBy, keys, map, orderBy, sumBy } from 'lodash';
import { Point } from '../../models/types';
import styled from 'react-emotion';
import theme from '../../../styles/theme';
import { SMALL_SCREEN } from '../../../styles/responsive';

interface PointsListProps {
  points: Point[];
  showName: boolean;
}

const ListWrapper = styled('div')`
  flex: 1;
  ${SMALL_SCREEN} {
    margin-left: 16px;
    width: 100%;
  }
`;

const PointGroup = styled('div')`
  border-radius: 3px;
  overflow: hidden;
  background-color: ${theme.color.white};
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  margin: 0 16px 16px 0;

  ${SMALL_SCREEN} {
    margin-bottom: 16px;
  }
`;

const PointHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
`;

const PointBreakdown = styled('div')`
  border-top: 2px solid ${theme.color.secondaryDark};
`;

const PointRow = styled('div')`
  display: flex;
  justify-content: space-between;

  > * {
    padding: 10px 15px;
  }
`;

const PointsList: React.SFC<PointsListProps> = props => {
  const { points } = props;

  const pointsByEpisode = groupBy(points, 'episodeId');

  return (
    <ListWrapper>
      {map(orderBy(keys(pointsByEpisode), x => x), (episodeId: string) => {
        const pointsInEpisode: Point[] = pointsByEpisode[episodeId];
        const total = sumBy(pointsInEpisode, 'pointType.value');
        return (
          <PointGroup key={episodeId}>
            <PointHeader>
              <div>{episodeId}</div>
              <div>{total} points</div>
            </PointHeader>
            <PointBreakdown>
              {map(pointsInEpisode, (point: Point) => (
                <PointRow key={point.id}>
                  <div>{point.pointType.name}</div>
                  <div>{point.pointType.value} points</div>
                </PointRow>
              ))}
            </PointBreakdown>
          </PointGroup>
        );
      })}
    </ListWrapper>
  );
};

export default PointsList;
