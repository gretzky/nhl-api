import { get, throwError, BaseOptions, handleUrl } from '../util';

type DraftOptions = BaseOptions & {
  year?: number | string;
};

export default async function getDraft(options?: DraftOptions): Promise<void> {
  const baseUrl = handleUrl('draft', options);

  const url = (): string =>
    options && options.year ? `${baseUrl}/${options.year}` : baseUrl;

  if (options && options.year && options.year.toString().length !== 4) {
    throwError('getDraft', 'Year must be a full, 4 digit number.');
  }

  try {
    const response = await get(url(), options).then(
      (data: any) => data.drafts[0]
    );
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getDraft', err);
  }
}
