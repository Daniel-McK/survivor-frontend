import { filter, forEach, map, orderBy, sumBy } from 'lodash';
import { LOAD_CONTESTANTS, RANK_CONTESTANTS_AND_USERS } from '../actions/types';
import { Contestant, Point } from '../../models/types';

export type ContestantsState = Contestant[];

export function contestants(state = [], action): ContestantsState {
  switch (action.type) {
    case LOAD_CONTESTANTS:
      return action.contestants;
    case RANK_CONTESTANTS_AND_USERS:
      return rankContestants(state, action.points);
    default:
      return state;
  }
}

function rankContestants(contestants: Contestant[], points: Point[]): Contestant[] {
  const contestantsWithPoints = map(contestants, (contestant: Contestant) => addPointsToContestant(contestant, points));
  const orderedContestants = orderBy(contestantsWithPoints, (contestant: Contestant) => -(contestant.totalPoints));

  let previousScore = Number.MAX_SAFE_INTEGER;
  let previousRank = 1;
  return map(orderedContestants, (contestant: Contestant, index: number) => {
    if (contestant.totalPoints < previousScore) {
      previousRank = index + 1;
    }
    previousScore = contestant.totalPoints;
    return {
      ...contestant,
      rank: previousRank
    };
  }) as any;
}

function addPointsToContestant(contestant: Contestant, points: Point[]): Contestant {
  const pointsForContestant = filter(points, { contestantId: contestant.id }) || [];
  return {
    ...contestant,
    totalPoints: sumBy(pointsForContestant, (point: Point) => point.pointType.value) || 0
  };
}
