import { get, throwError } from '../util';

interface StandingsOptions {
  season?: number | string;
  date?: string;
  expand?: string;
}

export default async function getStandings(
  options?: StandingsOptions
): Promise<void> {
  const url = `/standings`;

  if (options && options.expand) {
    options.expand = `standings.${options.expand}`;
  }

  try {
    const response = await get(url, options).then((data: any) => data.records);
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getStandings', err);
  }
}
