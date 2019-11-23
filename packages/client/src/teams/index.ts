import teams from '@nhl-api/teams';
import { throwError, get, RequireAtLeastOne } from '../util';
interface Options {
  id?: string | number;
  name?: string;
  expand?: string;
  season?: string | number;
}

type TeamOptions = RequireAtLeastOne<Options, 'id' | 'name'>;

export default async function getTeams(options: TeamOptions): Promise<any> {
  if (options.season && options.season.toString().length !== 8) {
    throwError(
      'getTeams',
      `Season must be formatted as both full years, i.e. '20192020'.`
    );
  }

  const id = options.name
    ? teams.filter((team: any) => team.name === options.name)[0].id
    : options.id;
  const baseUrl: string =
    options.id || options.name ? `/teams/${id}` : `/teams`;

  const url: string =
    options.expand && options.expand.includes('roster')
      ? `${baseUrl}/roster`
      : options.expand && options.expand.includes('stats')
      ? `${baseUrl}/stats`
      : baseUrl;

  if (options.expand) {
    options.expand = `team.${options.expand}`;
  }

  const activeTeams = teams.filter((team: any) => team.isActive);

  try {
    const response = await get(url, options).then((data: any) => {
      if (data.roster) {
        return data.roster;
      }
      if (data.stats) {
        return data.stats;
      }
      if (Array.isArray(data) && data.some(d => d.abbreviation)) {
        // if we've fetched all teams, merge the payload with the team objects from @nhl-api/teams to include other assets (logos, goal horns, etc.)
        return data.map((d, i) => Object.assign({}, d, activeTeams[i]));
      } else if (data.hasOwnProperty('abbreviation')) {
        // do the same as above but for an individual team
        return Object.assign(
          {},
          data,
          activeTeams.find((team: any) => team.id === data.id)
        );
      }
      return data;
    });
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getTeams', err);
  }
}
