import { points, PointsState } from './reducers/points';
import { combineReducers } from 'redux';

export interface ReduxState {
  points: PointsState;
}

export const survivorStore = combineReducers({
  points
});
