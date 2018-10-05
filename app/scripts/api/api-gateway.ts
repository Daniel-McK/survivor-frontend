import axios from 'axios';

const BASE_URL = 'https://56z9wmpjwi.execute-api.us-east-1.amazonaws.com/prod';
const SEASONS_PATH = `${BASE_URL}/seasons`;
const USERS_PATH = `${BASE_URL}/users`;

export async function getContestants(seasonId: string) {
  return axios.get(`${SEASONS_PATH}/${seasonId}/contestants`);
}

export async function getEpisodes(seasonId: string) {
  return axios.get(`${SEASONS_PATH}/${seasonId}/episodes`);
}

export async function getPoints(seasonId: string) {
  return axios.get(`${SEASONS_PATH}/${seasonId}/points`);
}

export async function getUsers() {
  return axios.get(USERS_PATH);
}
