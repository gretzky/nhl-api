import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getVenues(options?: BaseOptions): Promise<void> {
  const url = handleUrl('venues', options);

  try {
    const response = await get(url, 'venues', options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getVenues', err);
  }
}
