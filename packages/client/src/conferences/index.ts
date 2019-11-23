import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getConferences(
  options?: BaseOptions
): Promise<void> {
  const url = handleUrl('conferences', options);

  try {
    const response = await get(url, 'conferences', options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getConferences', err);
  }
}
