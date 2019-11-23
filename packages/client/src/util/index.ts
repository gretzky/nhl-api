import axios, { AxiosResponse } from 'axios';

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type BaseOptions = {
  id?: number | string;
};

export const api = axios.create({
  baseURL: 'https://statsapi.web.nhl.com/api/v1',
});

export const throwError = (fn: string, msg?: string, err?: Error): void => {
  throw new Error(`[NHL API]: ${fn}(): ${msg ? msg : err}`);
};

export const handleUrl = (res: string, options?: BaseOptions): string => {
  if (options && options.id) {
    return `/${res}/${options.id}`;
  }
  return `/${res}`;
};

const parseData = (res: string): any => {
  if (Array.isArray(res) && res.length === 1) {
    return res[0];
  }
  return res;
};

export async function get(url: string, res?: any, options?: any): Promise<any> {
  try {
    const response = await api
      .get(
        url,
        options
          ? {
              params: {
                ...options,
              },
            }
          : undefined
      )
      .then((response: AxiosResponse) => response.data)
      .then((data: any) => {
        if (data.hasOwnProperty(res)) {
          return parseData(data[res]);
        }
        return data;
      });
    return Promise.resolve(response);
  } catch (err) {
    return err;
  }
}
