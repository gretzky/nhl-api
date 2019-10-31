import axios, { AxiosResponse } from "axios";
import teams from "@nhl-api/teams";
import players from "@nhl-api/players";

const api = axios.create({
  baseURL: "https://statsapi.web.nhl.com/api/v1"
});

const throwError = (fn: string, msg?: string, err?: Error): void => {
  throw new Error(`[NHL API]: ${fn}(): ${msg ? msg : err}`);
};

const isInvalidSeason = (season: string): boolean =>
  season.toString().length !== 8;

const throwSeasonFormattingError = (season: string, fn: string): void => {
  if (isInvalidSeason(season)) {
    throwError(
      fn,
      `Season must be formatted as both full years, i.e. '20192020'.`
    );
  }
};

const getId = (resource: any, name: string): number | any[] => {
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

const getUrl = (resource: any, options?: any): string => {
  let baseUrl;

  if (options) {
    if (options.id && resource !== "schedule") {
      baseUrl = `/${resource}/${options.id}`;
    } else if (!options.id && options.name) {
      const res = resource === "teams" ? teams : players;
      baseUrl = `/${resource}/${getId(res, options.name)}`;
    }
  } else {
    baseUrl = `/${resource}`;
  }

  return baseUrl;
};

const parseData = (prop: any): any => {
  if (prop && Array.isArray(prop) && prop.length === 1) {
    return prop[0];
  }
  return prop;
};

export {
  api,
  throwError,
  throwSeasonFormattingError,
  getId,
  getUrl,
  parseData
};
