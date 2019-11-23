import { get, throwError, BaseOptions, handleUrl } from '../util';

export default async function getAwards(options?: BaseOptions): Promise<void> {
  const url = handleUrl('awards', options);

  try {
    const response = await get(url, options).then((data: any) => {
      if (data.awards.length > 1) {
        return data.awards;
      }
      return data.awards[0];
    });

    //const response = await get('awards', baseUrl, options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getAwards', err);
  }
}
