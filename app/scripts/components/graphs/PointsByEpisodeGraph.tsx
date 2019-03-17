import * as React from 'react';
import { Contestant, Point, User } from '../../models/types';
import { Line } from 'react-chartjs-2';
import styled from 'react-emotion';
import { getChartData } from '../../utils/points';

const GraphWrapper = styled('div')`
  min-width: 1000px;
`;

interface PointsByWeekProps {
  contestants?: Contestant[];
  points?: Point[];
  users?: User[];
}

const PointsByWeek: React.SFC<PointsByWeekProps> = props => {
  const data = getChartData(props.contestants, props.points);
  return (
    <GraphWrapper>
      <Line
        data={data}
        height={700}
        options={{
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0
            }
          }
        }}
      />
    </GraphWrapper>
  );
};

export const PointsByEpisodeGraph = React.memo(PointsByWeek);
