import players from './players';

interface Player {
  id: number;
  name: string;
}

const getPlayerById = (id: number | string): Player =>
  players.filter((player: Player) => player.id === id)[0];

// search for a player's id based on a given string
// adding `toUpperCase` makes the search case insensitive
const getPlayerId = (name: string): number | Player[] => {
  const p = players.filter((player: Player) =>
    player.name.toUpperCase().includes(name.toUpperCase())
  );
  if (p.length > 1) {
    // if the query matches more than 1 player, return the array of players
    return p;
  }
  // player found, return the id
  return p[0].id;
};

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

interface Options {
  id?: number | string;
  name?: string;
  team: string;
  season?: number | string;
}

// get a players headshot
// note: this only retrieves currently active players
const getPlayerMugshot = (
  options: RequireOnlyOne<Options, 'id' | 'name'>
): string => {
  if (!options.id && !options.name) {
    throw new Error('Must provide a player name or id.');
  }
  if (options.season && options.season.toString().length !== 8) {
    throw new Error("Season must be formatted as both years, i.e. '20192020'.");
  }
  if (options.team.length !== 3) {
    throw new Error('Use team abbreviation.');
  }
  const nameOrId = () => {
    if (options.id) {
      return options.id;
    }
    if (options.name) {
      return getPlayerId(options.name);
    }
    return;
  };
  return `https://assets.nhle.com/mugs/nhl/${
    options.season ? options.season : '20192020'
  }/${options.team.toUpperCase()}/${nameOrId()}.png`;
};

export { getPlayerById, getPlayerId, getPlayerMugshot };
export default players;
