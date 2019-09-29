import { points, PointsState } from './reducers/points';
import { combineReducers } from 'redux';
import { contestants, ContestantsState } from './reducers/contestants';
import { users, UsersState } from './reducers/users';
import { appReducer, AppState } from './reducers/app';

export interface ReduxState {
  contestants: ContestantsState;
  points: PointsState;
  users: UsersState;
  app: AppState;
}

export const survivorStore = combineReducers({
  contestants,
  points,
  users,
  app: appReducer
});
