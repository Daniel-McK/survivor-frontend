import { LOAD_CONTESTANTS, RANK_CONTESTANTS } from './types';
import { Contestant, Point } from '../../models/types';

export function createLoadContestantsAction(contestants: Contestant[]) {
  return {
    type: LOAD_CONTESTANTS,
    contestants
  };
}

export function createRankContestantsAction(points: Point[]) {
  return {
    type: RANK_CONTESTANTS,
    points
  };
}
