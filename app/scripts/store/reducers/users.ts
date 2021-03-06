import { LOAD_USERS, RANK_CONTESTANTS_AND_USERS } from '../actions/types';
import { User, Contestant, Point } from '../../models/types';
import { filter, get, keyBy, map, mapValues, orderBy, sumBy } from 'lodash';
import { getContestantIdFromComposite } from '../../utils/contestants';

export type UsersState = User[];

export function users(state = [], action): UsersState {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    case RANK_CONTESTANTS_AND_USERS:
      return rankUsers(state, action.contestants, action.points);
    default:
      return state;
  }
}

function rankUsers(users: User[], contestants: Contestant[], points: Point[]): User[] {
  const usersByUsername = keyBy(users, (user: User) => user.username);
  const contestantsById = keyBy(contestants, (contestant: Contestant) => contestant.id);
  const usersByContestantId = mapValues(contestantsById, (contestant: Contestant) => usersByUsername[contestant.userId]);
  const usersWithPoints = map(users, (user: User) => addPointsToUser(user, points, usersByContestantId));
  const orderedUsers = orderBy(usersWithPoints, (user: User) => -(user.totalPoints));

  let previousScore = Number.MAX_SAFE_INTEGER;
  let previousRank = 1;
  return map(orderedUsers, (user: User, index: number) => {
    const relevantContestants = filter(contestants, (contestant: Contestant) => contestant.userId === user.username);
    if (user.totalPoints < previousScore) {
      previousRank = index + 1;
    }
    previousScore = user.totalPoints;
    return {
      ...user,
      rank: previousRank,
      contestantIds: map(relevantContestants, (contestant: Contestant) => contestant.id)
    };
  }) as any;
}


function addPointsToUser(user: User, points: Point[], usersByContestantId): User {
  const pointsForUser = filter(points, (point: Point) => {
    const contestantId = getContestantIdFromComposite(get(point, 'contestantPlusId'));
    const userForPoint = usersByContestantId[contestantId];
    return userForPoint && user.username === userForPoint.username;
  });
  return {
    ...user,
    totalPoints: sumBy(pointsForUser, (point: Point) => point.pointType.value) || 0
  };
}
