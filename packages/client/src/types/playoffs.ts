import { GenericKeys } from "./util";

export interface Tournament {
  description: string;
  gameTypeEnum: {
    id: string;
    description: string;
    postseason: boolean;
  };
  parameter: string;
}
export type Tournaments = Tournament[];

export interface PlayoffRound {
  number: number;
  code: number;
  names: {
    name: string;
    shortName: string;
  };
  format: {
    name: string;
    description: string;
    numberOfGames: number;
    numberOfWins: number;
  };
}
export type Playoffs = Omit<GenericKeys, "link"> & {
  season: string;
  defaultRound?: string;
  rounds?: PlayoffRound[];
};
