import * as React from 'react';
import { Subtract } from 'utility-types';
import { filter, get } from 'lodash';
import { ReduxState } from '../store';
import { connect } from 'react-redux';
import { Point } from '../models/types';

export interface WithPointsProps {
  points: Point[];
}

export const withPoints = (pathToId: string) => {
  return <P extends WithPointsProps>(BaseComponent: React.ComponentType<P> | React.SFC<P>) => {
    class WithPoints extends React.Component<P> {
      public render() {
        const contestantId = get(this.props, pathToId);
        const points = contestantId ? filter(this.props.points, { contestantId }) : [];
        return (
          <BaseComponent {...this.props} points={points} />
        );
      }
    }

    // TODO: resolve type mismatch
    return connect(mapStateToProps)(WithPoints as any) as any;
  };
};

function mapStateToProps(state: ReduxState) {
  return {
    points: state.points
  };
}
