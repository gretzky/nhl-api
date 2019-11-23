import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getStandingsTypes(
  options?: BaseOptions
): Promise<void> {
  const url = handleUrl('standingsTypes', options);

  try {
    const response = await get(url, 'standingsTypes', options).then(
      data => data
    );
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getStandingsTypes', err);
  }
}
