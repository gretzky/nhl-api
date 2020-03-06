import { GenericKeys } from "./util";

export type Conference = GenericKeys & {
  abbreviation: string;
  shortName: string;
};
export type Conferences = Conference[];
