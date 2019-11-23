import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getAwards(options?: BaseOptions): Promise<void> {
  const url = handleUrl('awards', options);

  try {
    const response = await get(url, 'awards', options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getAwards', err);
  }
}
