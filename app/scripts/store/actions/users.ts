import { LOAD_USERS } from './types';
import { User } from '../../models/types';

export function createLoadUsersAction(users: User[]) {
  return {
    type: LOAD_USERS,
    users
  };
}
