import { User } from '../models/types';

export function getFullName(user: User) {
  return `${user.firstName} ${user.lastName}`;
}

export const JEFF_URL = 'https://wwwimage-secure.cbsstatic.com/thumbnails/photos/w270/cast/4048f07cd7d2b184_probst_800.jpg';
