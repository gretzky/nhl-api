import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getGameTypes(
  options?: BaseOptions
): Promise<void> {
  const url = handleUrl('gameTypes', options);

  try {
    const response = await get(url, 'gameTypes', options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getGameTypes', err);
  }
}
