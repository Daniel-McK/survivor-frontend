import { RANK_CONTESTANTS_AND_USERS } from '../actions/types';

export interface AppState {
  initialized: boolean;
}

const INTIAL_STATE: AppState = {
  initialized: false
};

export function appReducer(state: AppState = INTIAL_STATE, action): AppState {
  switch (action.type) {
    case RANK_CONTESTANTS_AND_USERS:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
}