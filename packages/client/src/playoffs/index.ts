import { get, throwError, BaseOptions, handleUrl } from '../util';

type PlayoffOptions = BaseOptions & {
  season?: string | number;
};

export default async function getPlayoffs(
  options?: PlayoffOptions
): Promise<void> {
  const url = handleUrl('tournaments/playoffs', options);

  try {
    const response = await get(url, options).then(data => data);
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getPlayoffs', err);
  }
}
