export interface Season {
  seasonId: string;
  regularSeasonStartDate: string;
  regularSeasonEndDate: string;
  seasonEndDate: string;
  numberOfGames: number;
  tiesInUse: boolean;
  olympicsParticipation: boolean;
  conferencesInUse: boolean;
  divisionsInUse: boolean;
  wildCardInUse: boolean;
}
export type Seasons = Season[];
