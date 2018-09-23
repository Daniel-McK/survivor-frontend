import { LOAD_POINTS } from '../actions/types';
import { Point } from '../../models/types';

export type PointsState = Point[];

export function points(state = [], action): PointsState {
  switch (action.type) {
    case LOAD_POINTS:
      return action.points;
    default:
      return state;
  }
}