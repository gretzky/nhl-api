import { GenericKeys } from "./util";

export type PlayerSimple = Omit<GenericKeys, "name"> & {
  fullName: string;
};

export enum PositionCodes {
  C = "C",
  LW = "LW",
  RW = "RW",
  D = "D",
  G = "G"
}

export enum PositionNames {
  C = "Center",
  D = "Defenseman",
  F = "Forward",
  RW = "Right Wing",
  LW = "Left Wing",
  G = "Goalie"
}

export interface PlayerPosition {
  code: keyof typeof PositionCodes;
  name: keyof typeof PositionNames;
  type: keyof typeof PositionNames;
  abbreviation: keyof typeof PositionCodes;
}

export interface RosterPlayer {
  person: PlayerSimple;
  jerseyNumber: string;
  position: PlayerPosition;
}
