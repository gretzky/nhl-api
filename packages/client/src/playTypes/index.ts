import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getPlayTypes(
  options?: BaseOptions
): Promise<void> {
  const url = handleUrl('playTypes', options);

  try {
    const response = await get(url, 'playTypes', options).then(data => data);
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getPlayTypes', err);
  }
}
