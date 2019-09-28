import { Dispatch } from 'redux';
import { getPoints, getContestants, getUsers } from '../../api/api-gateway';
import { createRankContestantsAction, createLoadContestantsAction } from '../actions/contestants';
import { createLoadUsersAction } from '../actions/users';
import { createLoadPointsAction } from '../actions/points';

async function loadPoints(dispatch: Dispatch) {
  const response = await getPoints('season-39');
  dispatch(createLoadPointsAction(response.data));
  return response.data;
}

async function loadContestants(dispatch: Dispatch) {
  const response = await getContestants('season-39');
  dispatch(createLoadContestantsAction(response.data));
  return response.data;
}

async function loadUsers(dispatch: Dispatch) {
  const response = await getUsers();
  dispatch(createLoadUsersAction(response.data));
  return response.data;
}

export async function loadAllContent(dispatch: Dispatch) {
  const [
    points,
    users,
    contestants
  ] = await Promise.all([
    loadPoints(dispatch),
    loadUsers(dispatch),
    loadContestants(dispatch)
  ]);
  dispatch(createRankContestantsAction(contestants, points));
}
