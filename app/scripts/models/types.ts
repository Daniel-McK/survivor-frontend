export interface Contestant {
  seasonId: string;
  id: string;
  name: string;
  imageUrl: string;
  userId?: string;
  totalPoints?: number; // patch client side
  rank?: number; // patched client side
}

export interface PointType {
  name: string;
  value: number;
}

export interface DDBPoint {
  seasonId: string;
  contestantPlusId: string;
  episodeId: string;
  pointType: PointType;
}

export interface Point {
  seasonId: string;
  contestantId: string;
  id: string;
  episodeId: string;
  pointType: PointType;
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  totalPoints?: number; // patched client side
  rank?: number; // patched client side
  contestantIds?: string[];
}
