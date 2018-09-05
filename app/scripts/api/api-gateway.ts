import axios from 'axios';

const BASE_URL = 'https://56z9wmpjwi.execute-api.us-east-1.amazonaws.com/prod';
const SEASONS_PATH = `${BASE_URL}/seasons`;

export async function getContestants(seasonId: string) {
  return axios.get(`${SEASONS_PATH}/${seasonId}/contestants`)
}