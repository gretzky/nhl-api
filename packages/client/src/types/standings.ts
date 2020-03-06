import { GenericKeys } from "./util";
import { Division } from "./divisions";

export interface LeagueRecord {
  wins: number;
  losses: number;
  ot: number;
  type: string;
}

export interface TeamStanding {
  team: GenericKeys;
  leagueRecord: LeagueRecord;
  goalsAgainst: number;
  goalsScored: number;
  points: number;
  divisionRank: number;
  conferenceRank: number;
  leagueRank: number;
  wildCardRank: number;
  row: number;
  gamesPlayed: number;
  streak: {
    streakType: string;
    streakNumber: number;
    streakCode: string;
  };
  records?: TeamRecord[];
}

export interface TeamRecord {
  divisionRecords: LeagueRecord[];
  overallRecords: LeagueRecord[];
  conferenceRecords: LeagueRecord[];
  lastUpdated: string;
}

export interface Standing {
  standingsType: string;
  league: GenericKeys;
  division: Omit<Division, "conference">;
  conference: GenericKeys;
  teamRecords: TeamStanding[];
}
export interface Standings {
  records: Standing[];
}

export interface StandingsType {
  name: string;
  description: string;
}
export type StandingsTypes = StandingsType[];
export type StatType = { displayName: string };
export type StatTypes = StatType[];
