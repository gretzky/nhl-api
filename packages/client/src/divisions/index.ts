import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getDivisions(
  options?: BaseOptions
): Promise<void> {
  const url = handleUrl('divisions', options);

  try {
    const response = await get(url, 'divisions', options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getDivisions', err);
  }
}
