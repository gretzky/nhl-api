import axios, { AxiosResponse } from "axios";
import teams from "@nhl-api/teams";
import players from "@nhl-api/players";

export interface Options {
  id?: number | string;
  name?: string;
  season?: number | string;
  stats?: string;
  expand?: string;
  year?: string | number;
  type?: string;
  team?: any;
  startDate?: string;
  endDate?: string;
  date?: string;
}

export const api = axios.create({
  baseURL: "https://statsapi.web.nhl.com/api/v1"
});

export const throwError = (fn: string, msg?: string, err?: Error): void => {
  throw new Error(`[NHL API]: ${fn}(): ${msg ? msg : err}`);
};

export const getId = (resource: any, name: string): number | any[] => {
  const data = resource.filter(
    res =>
      res.name.includes(name.toUpperCase()) ||
      res.nicknames.some(nickname => nickname === name.toUpperCase())
  );

  if (!data.length) {
    const fnName = resource === teams ? "getTeams" : "getPlayer";
    throwError(
      fnName,
      `'${name}' not found, please try another search.\nIf you're searching by nickname, make sure it's exact.\nIf you think this is a bug, please open an issue: https://github.com/gretzky/nhl-api/issues`
    );
  }

  if (data.length === 1) {
    return data[0].id;
  }

  return data;
};

const parseData = (res: string): any => {
  if (Array.isArray(res) && res.length === 1) {
    return res[0];
  }
  return res;
};

export const handleUrl = (res: string, options?: Options): string => {
  if ((options && options.id) || (options && options.name)) {
    return `/${res}/${
      options.name
        ? getId(res === "people" ? players : teams, options.name)
        : options.id
    }`;
  }
  return `/${res}`;
};

export const handleData = (res: string, data: any): any => {
  if (data.roster) {
    return parseData(data.roster);
  } else if (data.stats) {
    return parseData(data.stats);
  } else if (data.dates) {
    return parseData(data.dates);
  } else if (data.records) {
    return parseData(data.records);
  } else if (data[res]) {
    return parseData(data[res]);
  } else if (data.drafts) {
    return parseData(data.drafts);
  } else if (data.prospects) {
    return parseData(data.prospects);
  } else {
    delete data.copyright;
    return data;
  }
};

export async function get(
  res: string,
  url: string,
  options?: Options
): Promise<void> {
  try {
    const response = await api
      .get(
        url,
        options
          ? {
              params: {
                ...options
              }
            }
          : null
      )
      .then((response: AxiosResponse) => handleData(res, response.data));
    return Promise.resolve(response);
  } catch (err) {
    return err;
  }
}
