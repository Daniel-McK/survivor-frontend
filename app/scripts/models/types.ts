export interface Contestant {
  seasonId: string;
  id: string;
  name: string;
  imageUrl: string;
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