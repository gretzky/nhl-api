import teams from '@nhl-api/teams';
import { throwError, get } from '../util';
interface TeamOptions {
  id?: string | number;
  name?: string;
  expand?: string;
  season?: string | number;
}

export default async function getTeams(options?: TeamOptions): Promise<any> {
  if (options && options.season && options.season.toString().length !== 8) {
    throwError(
      'getTeams',
      `Season must be formatted as both full years, i.e. '20192020'.`
    );
  }

  const id =
    options && options.name
      ? teams.filter((team: any) => team.name === options.name)[0].id
      : options && options.id;
  const baseUrl: string =
    (options && options.id) || (options && options.name)
      ? `/teams/${id}`
      : `/teams`;

  const url: string =
    options && options.expand && options.expand.includes('roster')
      ? `${baseUrl}/roster`
      : options && options.expand && options.expand.includes('stats')
      ? `${baseUrl}/stats`
      : baseUrl;

  if (options && options.expand) {
    options.expand = `team.${options.expand}`;
  }

  const activeTeams = teams.filter((team: any) => team.isActive);

  try {
    const response = await get(url, options).then((data: any) => {
      if (data.roster) {
        return data.roster;
      }
      if (data.stats) {
        return data.stats.length > 1 ? data.stats : data.stats[0];
      }
      if (
        data.teams.length > 1 &&
        data.teams.some((d: any) => d.abbreviation)
      ) {
        return data.teams.map((d: any, i: number) =>
          Object.assign({}, d, activeTeams[i])
        );
      }
      if (data.teams[0].hasOwnProperty('abbreviation')) {
        return Object.assign(
          {},
          data.teams[0],
          activeTeams.find((team: any) => team.id === data.teams[0].id)
        );
      }
      return data;
    });
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getTeams', err);
  }
}
