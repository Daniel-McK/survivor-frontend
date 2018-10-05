import { LOAD_CONTESTANTS, RANK_CONTESTANTS_AND_USERS } from './types';
import { Contestant, Point } from '../../models/types';

export function createLoadContestantsAction(contestants: Contestant[]) {
  return {
    type: LOAD_CONTESTANTS,
    contestants
  };
}

export function createRankContestantsAction(contestants: Contestant[], points: Point[]) {
  return {
    type: RANK_CONTESTANTS_AND_USERS,
    contestants,
    points
  };
}
