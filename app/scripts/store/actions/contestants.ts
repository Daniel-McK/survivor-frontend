import { LOAD_CONTESTANTS } from './types';
import { Contestant } from '../../models/types';

export function createLoadContestantsAction(contestants: Contestant[]) {
  return {
    type: LOAD_CONTESTANTS,
    contestants
  };
}
