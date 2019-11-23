import { get, throwError } from '../util';

type SeasonOptions = {
  season?: string | number;
};

export default async function getSeasons(
  options?: SeasonOptions
): Promise<void> {
  const baseUrl = `/seasons`;
  const url = () =>
    options && options.season ? `${baseUrl}/${options.season}` : baseUrl;

  try {
    const response = await get(url(), options).then((data: any) => {
      if (data.seasons.length > 1) {
        return data.seasons;
      }
      return data.seasons[0];
    });
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getSeasons', err);
  }
}
