import { User } from '../models/types';

export function getFullName(user: User) {
  return `${user.firstName} ${user.lastName}`;
}

export const JEFF_URL = 'https://assets.globaltv.com/wp-content/uploads/2019/01/survivor-cast-Jeff-Probst-season-38-edge-of-extinction-20191.jpg';
