export interface PointsByEpisode {
  [episodeId: string]: number;
}

export interface DataByContestant {
  [contestantId: string]: PointsByEpisode;
}
