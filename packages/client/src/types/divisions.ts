import { GenericKeys } from "./util";

export type Division = GenericKeys & {
  abbreviation: string;
  nameShort: string;
  conference: GenericKeys;
  active: boolean;
};
export type Divisions = Division[];
