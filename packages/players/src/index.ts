import players from "./players";

interface Player {
  id: number;
  name: string;
}

const getPlayerById = (id: number | string) =>
  players.filter(player => player.id === id)[0];

// search for a player's id based on a given string
// adding `toUpperCase` makes the search case insensitive
const getPlayerId = (name: string): number | Player[] => {
  const p = players.filter(player =>
    player.name.toUpperCase().includes(name.toUpperCase())
  );
  if (p.length > 1) {
    // if the query matches more than 1 player, return the array of players
    return p;
  } else {
    // player found, return the id
    return p[0].id;
  }
};

interface Options {
  id?: number;
  name?: string;
  team: string;
  season?: string;
}

// get a players headshot
// note: this only retrieves currently active players
const getPlayerMugshot = (options: Options): string => {
  if (!options.id && !options.name) {
    throw new Error("Must provide a player name or id.");
  }
  if (options.season && options.season.length !== 8) {
    throw new Error("Season must be formatted as both years, i.e. '20192020'.");
  }
  if (options.team.length !== 3) {
    throw new Error("Use team abbreviation.");
  }
  return `https://assets.nhle.com/mugs/nhl/${
    options.season ? options.season : "20192020"
  }/${options.team.toUpperCase()}/${
    options.id ? options.id : getPlayerId(options.name)
  }.png`;
};

export { getPlayerById, getPlayerId, getPlayerMugshot };
export default players;
