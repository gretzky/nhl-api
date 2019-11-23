import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getProspects(
  options?: BaseOptions
): Promise<void> {
  const url = handleUrl('draft/prospects', options);

  try {
    const response = await get(url, 'prospects', options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getProspects', err);
  }
}
