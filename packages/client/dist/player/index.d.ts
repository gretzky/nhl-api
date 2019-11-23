import { RequireAtLeastOne } from '../util';
declare type Options = {
  id?: number | string;
  name?: string;
};
declare type PlayerOptions = RequireAtLeastOne<Options, 'id' | 'name'> & {
  season?: string | number;
  stats?: string;
};
export default function getPlayer(options: PlayerOptions): Promise<void>;
export {};
