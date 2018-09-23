import { points, PointsState } from './reducers/points';
import { combineReducers } from 'redux';
import { contestants, ContestantsState } from './reducers/contestants';

export interface ReduxState {
  contestants: ContestantsState;
  points: PointsState;
}

export const survivorStore = combineReducers({
  contestants,
  points
});
