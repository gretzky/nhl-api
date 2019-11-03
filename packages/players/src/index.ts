import players from "./players";

interface Player {
  id: number;
  name: string;
  nicknames: string[];
}

// search for a player's id based on a given string
// adding `toUpperCase` makes the search case insensitive
const getPlayerId = (name: string): number | Player[] => {
  const p = players.filter(
    player =>
      player.name.includes(name.toUpperCase()) ||
      // match the exact nickname here instead of grabbing parts of a nickname to narrow down the search as much as we can
      player.nicknames.some(nickname => nickname === name.toUpperCase())
  );
  if (p.length > 1) {
    // if the query matches more than 1 player, return the array of players
    return p;
  } else {
    // player found, return the id
    return p[0].id;
  }
};

export { getPlayerId };
export default players;
