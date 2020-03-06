import { GameStatus } from "./game";
import { LeagueRecord } from "./standings";
import { GenericKeys } from "./util";

interface ScheduledGameTeam {
  leagueRecord: LeagueRecord;
  score: number;
  team: GenericKeys;
}

type ScheduleBroadcast = Omit<GenericKeys, "link"> & {
  type: string;
  site: string;
  language: string;
};

interface ScheduledGame {
  gamePk: string;
  link: string;
  gameType: string;
  season: string;
  gameDate: string;
  status: Omit<GameStatus, "baseballCode" | "code">;
  teams: {
    away: ScheduledGameTeam;
    home: ScheduledGameTeam;
  };
  venue: GenericKeys;
  content: {
    link: string;
  };
  broadcasts?: ScheduleBroadcast[];
}
export type ScheduledGames = ScheduledGame[];
