import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getDivisions(
  options?: BaseOptions
): Promise<void> {
  const url = handleUrl('divisions', options);

  try {
    const response = await get(url, options).then((data: any) => {
      if (data.divisions.length > 1) {
        return data.divisions;
      }
      return data.divisions[0];
    });
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getDivisions', err);
  }
}
