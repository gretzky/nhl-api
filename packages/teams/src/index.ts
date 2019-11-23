import teams from './teams';

interface Team {
  id: number;
  name: string;
  abbreviation: string;
  nicknames: string[];
  colors: string[];
}

// search for a team id based on a given string
// adding `toUpperCase` makes the search case insensitive
const getTeamId = (name: string): number | Team[] => {
  const t = teams.filter(
    team =>
      team.name.toUpperCase().includes(name.toUpperCase()) ||
      // we don't explicitly match the nickname here because most team nicknames don't overlap and this allows for some wiggle room
      team.nicknames.some(nickname =>
        nickname.toUpperCase().includes(name.toUpperCase())
      )
  );
  return t.length > 1 ? t : t[0].id;
};

export { getTeamId };
export default teams;
