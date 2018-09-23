import { LOAD_CONTESTANTS } from '../actions/types';
import { Contestant } from '../../models/types';

export type ContestantsState = Contestant[];

export function contestants(state = [], action): ContestantsState {
  switch (action.type) {
    case LOAD_CONTESTANTS:
      return action.contestants;
    default:
      return state;
  }
}