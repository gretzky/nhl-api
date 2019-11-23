import { getPlayerId } from '@nhl-api/players';
import { get, throwError, RequireAtLeastOne } from '../util';

type Options = {
  id?: number | string;
  name?: string;
};

type PlayerOptions = RequireAtLeastOne<Options, 'id' | 'name'> & {
  season?: string | number;
  stats?: string;
};

export default async function getPlayer(options: PlayerOptions): Promise<void> {
  if (!options.id && !options.name) {
    throwError('getPlayer', 'Must include a player name or ID as a param.');
  }

  if (options.season && options.season.toString().length !== 8) {
    throwError(
      'getPlayer',
      `Season must be formatted as both full years, i.e. '20192020'.`
    );
  }

  const baseUrl = (): string => {
    if (options.name) {
      const id = getPlayerId(options.name);
      if (Array.isArray(id)) {
        console.log(id);
        throwError(
          'getPlayer',
          'More than 1 player found. Check the console for a list of matching players and their ids.'
        );
      }
      return `/people/${id}`;
    }
    return `/people/${options.id}`;
  };

  const url: string = options.stats ? `${baseUrl()}/stats` : baseUrl();

  const handleData = (data: any) => {
    if (options.stats) {
      if (data.stats.length > 1) {
        // if we have more than 1 stat objects, return those
        return data.stats;
      } else if (data.stats[0].splits.length > 1) {
        // if we have 1 stat object, but multiple splits, return those
        return data.stats[0].splits;
      }
      // otherwise, return the single split object in the single stat array
      return data.stats[0].splits[0];
    }
    return data.people[0];
  };

  try {
    const response = await get(url, options).then((data: any) =>
      handleData(data)
    );
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getPlayer', err);
  }
}
