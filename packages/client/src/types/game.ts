import { GenericKeys } from "./util";

export interface GameType {
  id: string;
  description: string;
  postseason: boolean;
}
export type GameTypes = GameType[];

export interface GameStatus {
  code: string;
  codedGameState: string;
  abstractGameState: string;
  detailedState: string;
  baseballCode: string;
  startTimeTBD: boolean;
}
export type GameStatuses = Omit<GameStatus, "codedGameState">[];

type PlayerType = {
  playerType: string;
};

export type PlayType = Omit<GenericKeys, "link"> & {
  cmsKey: string;
  playerTypes: PlayerType[] | null;
  code: string;
  secondaryEventCodes: string[] | null;
};
export type PlayTypes = PlayType[];

export interface Period {
  periodType: string;
  startTime: string;
  endTime: string;
  num: number;
  ordinalNum: string;
  home: {
    goals: number;
    shotsOnGoal: number;
    rinkSide: string;
  };
  away: {
    goals: number;
    shotsOnGoal: number;
    rinkSide: string;
  };
}

export interface ShootoutInfo {
  scores: number;
  attempts: number;
}

export interface LinescoreTeamStats {
  team: GenericKeys;
  goals: number;
  shotsOnGoal: number;
  goaliePulled: boolean;
  numSkaters: number;
  powerPlay: boolean;
}

export interface Linescore {
  currentPeriod: number;
  currentPeriodOrdinal: string;
  currentPeriodTimeRemaining: string;
  periods: Period[];
  shootoutInfo: {
    away: ShootoutInfo;
    home: ShootoutInfo;
  };
  teams: {
    home: LinescoreTeamStats;
    away: LinescoreTeamStats;
  };
  powerPlayStrength: string;
  hasShootout: boolean;
}
