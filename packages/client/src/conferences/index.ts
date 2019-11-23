import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getConferences(
  options?: BaseOptions
): Promise<void> {
  const url = handleUrl('conferences', options);

  try {
    const response = await get(url, options).then((data: any) => {
      if (data.conferences.length > 1) {
        return data.conferences;
      }
      return data.conferences[0];
    });
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getConferences', err);
  }
}
