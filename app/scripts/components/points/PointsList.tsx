import * as React from 'react';
import { groupBy, map, sumBy } from 'lodash';
import { Point } from '../../models/types';
import styled from 'react-emotion';
import theme from '../../../styles/theme';
import { SMALL_SCREEN } from '../../../styles/responsive';

interface PointsListProps {
  points: Point[];
  showName: boolean;
}

interface PointsListState {
  episodeIsExpanded: {
    [episodeId: string]: boolean;
  };
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
  margin: 16px 16px 0 0;
`;

const PointHeader = styled('div')`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;

  &:hover {
    background-color: #c6ddde;
  }
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

class PointsList extends React.Component<PointsListProps, PointsListState> {
  constructor(props) {
    super(props);
    this.state = {
      episodeIsExpanded: {}
    };
  }

  public render() {
    const { points } = this.props;

    const pointsByEpisode = groupBy(points, 'episodeId');

    return (
      <ListWrapper>
        {map(pointsByEpisode, (pointsInEpisode: Point[], episodeId: string) => {
          const total = sumBy(pointsInEpisode, 'pointType.value');
          const expanded = this.state.episodeIsExpanded[episodeId];
          return (
            <PointGroup key={episodeId}>
              <PointHeader
                onClick={this.toggleEpisodeVisible.bind(null, episodeId)}
              >
                <div>{episodeId}</div>
                <div>{total} points</div>
              </PointHeader>
              {expanded && (
                <PointBreakdown>
                  {map(pointsInEpisode, (point: Point) => (
                    <PointRow>
                      <div>{point.pointType.name}</div>
                      <div>{point.pointType.value} points</div>
                    </PointRow>
                  ))}
                </PointBreakdown>
              )}
            </PointGroup>
          );
        })}
      </ListWrapper>
    );
  }

  private toggleEpisodeVisible = (episodeId: string) => {
    const { episodeIsExpanded } = this.state;
    this.setState({
      episodeIsExpanded: {
        ...episodeIsExpanded,
        [episodeId]: !episodeIsExpanded[episodeId]
      }
    });
  };
}

export default PointsList;
