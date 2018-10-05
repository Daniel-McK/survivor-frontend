import { points, PointsState } from './reducers/points';
import { combineReducers } from 'redux';
import { contestants, ContestantsState } from './reducers/contestants';
import { users, UsersState } from './reducers/users';

export interface ReduxState {
  contestants: ContestantsState;
  points: PointsState;
  users: UsersState;
}

export const survivorStore = combineReducers({
  contestants,
  points,
  users
});
