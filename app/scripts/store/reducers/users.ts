import { LOAD_USERS } from '../actions/types';
import { User } from '../../models/types';

export type UsersState = User[];

export function users(state = [], action): UsersState {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    default:
      return state;
  }
}