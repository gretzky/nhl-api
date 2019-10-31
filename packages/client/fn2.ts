import axios, { AxiosResponse } from "axios";
import teams from "@nhl-api/teams";
import players from "@nhl-api/players";

const api = axios.create({
  baseURL: "https://statsapi.web.nhl.com/api/v1"
});

const throwError = (fn: string, msg?: string, err?: Error): void => {
  throw new Error(`[NHL API]: ${fn}(): ${msg ? msg : err}`);
};

const catchErrors = (fn: string, options: any): void => {
  if (options.season && options.season.toString().length !== 8) {
    throwError(
      fn,
      `Season must be formatted as both full years, i.e. '20192020'.`
    );
  }
  if (options.id && typeof options.id === "string") {
    throwError(
      fn,
      "ID must be a number. If you want to get a team/player by name, use the 'name' key."
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

const parseData = res => {
  if (Array.isArray(res) && res.length === 1) {
    return res[0];
  }
  return res;
};

const handleUrl = (res, options) => {
  if (options.id || options.name) {
    return `/${res}/${
      options.name
        ? getId(res === "people" ? players : teams, options.name)
        : options.id
    }`;
  }
  return `/${res}`;
};

const handleData = (res, data) => {
  if (data.roster) {
    return parseData(data.roster);
  } else if (data.stats) {
    return parseData(data.stats);
  } else if (data.dates && data.dates.length > 1) {
    return data.dates.map(d => d.games[0]);
  } else if (data.dates) {
    return data.dates[0].games[0];
  } else {
    return parseData(data[res]);
  }
};

async function get(res, options) {
  const getUrl = () => {
    let url;
    const baseUrl = handleUrl(res, options);
    if (options.expand === "roster") {
      url = `${baseUrl}/roster`;
    } else if (options.expand === "stats") {
      url = `${baseUrl}/stats`;
    } else if (res === "game") {
      if (!options.type || options.type === "feed" || options.type === "live") {
        url = `${baseUrl}/feed/live`;
      } else {
        url = `${baseUrl}/${options.type}`;
      }
    } else {
      url = baseUrl;
    }
    return url;
  };

  //const { id, name, expand, stats, season, date, ...rest } = options;

  if (res === "schedule" && options.team) {
    if (typeof options.team === "string") {
      options.team = getId(teams, options.team);
    }
    delete Object.assign(options, { ["teamId"]: options["team"] })["team"];
  }

  if (
    res === "teams" ||
    res === "schedule" ||
    (res === "standings" && options.expand)
  ) {
    options.expand = `${res}.${options.expand}`;
  }

  catchErrors(
    `get${
      res === "people" ? "Player" : res.charAt(0).toUpperCase + res.slice(1)
    }`,
    options
  );

  try {
    const response = await api
      .get(
        getUrl(),
        options
          ? {
              params: {
                ...options
              }
            }
          : null
      )
      .then(response => handleData(res, response.data));
    return Promise.resolve(response);
  } catch (err) {
    return err;
  }
}

async function getTeams(options) {
  try {
    const response = await get("teams", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getTeams", err);
  }
}

async function getPlayer(options) {
  if (!options.id && !options.name) {
    throwError(
      "getPlayer",
      "Must include a player ID, name, or nickname as a param."
    );
  }
  try {
    const response = await get("people", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getPlayer", err);
  }
}

async function getGame(options) {
  if (!options.id) {
    throwError("getGame", "Must include a game ID.");
  }
  try {
    const response = await get("game", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getGame", options);
  }
}

async function getSchedule(options) {
  try {
    const response = await get("schedule", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getSchedule", options);
  }
}

async function getSeasons(options) {
  try {
    const response = await get("seasons", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getSeasons", options);
  }
}

async function getStandings(options) {
  try {
    const response = await get("standings", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getStandings", options);
  }
}

async function getStandingsTypes(options) {
  try {
    const response = await get("standingsTypes", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getStandingsTypes", options);
  }
}

async function getDraft(options) {
  if (options.year && options.year.toString().length !== 4) {
    throwError("getDraft", "Year must be a full, 4 digit number.");
  }
  try {
    const response = await get("draft", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getDraft", options);
  }
}

async function getProspects(options) {
  try {
    const response = await get("prospects", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getProspects", options);
  }
}

async function getAwards(options) {
  try {
    const response = await get("awards", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getAwards", options);
  }
}

async function getVenues(options) {
  try {
    const response = await get("venues", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getVenues", options);
  }
}

async function getDivisions(options) {
  try {
    const response = await get("divisions", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getDivisions", options);
  }
}

async function getConferences(options) {
  try {
    const response = await get("conferences", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getConferences", options);
  }
}

async function getPlayoffs(options) {
  try {
    const response = await get("playoffs", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getPlayoffs", options);
  }
}

const nhlApi = {
  getTeams,
  getPlayer,
  getGame,
  getSchedule,
  getSeasons,
  getStandings,
  getStandingsTypes,
  getDraft,
  getProspects,
  getAwards,
  getVenues,
  getDivisions,
  getConferences,
  getPlayoffs
};

export default nhlApi;
