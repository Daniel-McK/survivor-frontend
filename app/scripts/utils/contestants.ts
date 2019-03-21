import { split } from 'lodash';

export function getContestantIdFromComposite(compositeId: string) {
  return split(compositeId, '+')[0];
}
