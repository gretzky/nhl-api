import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getVenues(options?: BaseOptions): Promise<void> {
  const url = handleUrl('venues', options);

  try {
    const response = await get(url, options).then((data: any) => {
      if (data.venues.length > 1) {
        return data.venues;
      }
      return data.venues[0];
    });
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getVenues', err);
  }
}
