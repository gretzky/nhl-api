import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getProspects(
  options?: BaseOptions
): Promise<void> {
  const url = handleUrl('draft/prospects', options);

  try {
    const response = await get(url, options).then(
      (data: any) => data.prospects
    );
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getProspects', err);
  }
}
