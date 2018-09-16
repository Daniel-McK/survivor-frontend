import { LOAD_POINTS } from './types';
import { DDBPoint, Point } from '../../models/types';
import { map, split } from 'lodash';

const DELIMITER = '+';

export function createLoadPointsAction(points: DDBPoint[]) {
  return {
    type: LOAD_POINTS,
    points: map(points, extractContestantFromId)
  };
}

function extractContestantFromId(point: DDBPoint): Point {
  const [contestantId, id] = split(point.contestantPlusId, DELIMITER);
  return {
    contestantId,
    episodeId: point.episodeId,
    id,
    pointType: point.pointType,
    seasonId: point.seasonId
  };
}