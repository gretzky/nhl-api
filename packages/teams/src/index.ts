import teams from "./teams";

interface Team {
  id: number;
  name: string;
  abbrev: string;
  nicknames: string[];
  colors: string[];
}

// search for a team id based on a given string
// adding `toUpperCase` makes the search case insensitive
const getTeamId = (name: string): number | Team[] => {
  const t = teams.filter(
    team =>
      team.name.includes(name.toUpperCase()) ||
      // we don't explicitly match the nickname here because most team nicknames don't overlap and this allows for some wiggle room
      team.nicknames.some(nickname => nickname.includes(name.toUpperCase()))
  );
  if (t.length > 1) {
    // if the query matches more than 1 team, return the array of players
    return t;
  } else {
    // team found, return the id
    return t[0].id;
  }
};

export { getTeamId };
export default teams;
