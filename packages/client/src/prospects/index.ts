import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getProspects(
  options?: BaseOptions
): Promise<void> {
  const url = handleUrl('draft/prospects', options);

  try {
    const response = await get(url, options).then((data: any) => {
      if (data.prospects.length > 1) {
        return data.prospects;
      }
      return data.prospects[0];
    });
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getProspects', err);
  }
}
