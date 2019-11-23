import { RequireAtLeastOne } from '../util';
interface Options {
  id?: string | number;
  name?: string;
  expand?: string;
  season?: string | number;
}
declare type TeamOptions = RequireAtLeastOne<Options, 'id' | 'name'>;
export default function getTeams(options: TeamOptions): Promise<any>;
export {};
