import { AxiosResponse } from "axios";
import qs from "querystring";
import teams from "@nhl-api/teams";
import players from "@nhl-api/players";
import {
  api,
  throwError,
  throwSeasonFormattingError,
  getId,
  getUrl,
  parseData
} from "./util";

async function getTeams(options?: any): Promise<void> {
  const baseUrl = getUrl("teams", options);

  let url: string;

  if (options) {
    const { id, name, ...rest } = options;

    if (options.expand === "stats") {
      url = `${baseUrl}/stats`;
    } else if (options.expand === "roster") {
      url = `${baseUrl}/roster`;
    } else {
      rest.expand = `team.${rest.expand}`;
      url = `${baseUrl}?${qs.stringify(rest)}`;
    }
  } else {
    url = baseUrl;
  }

  if (options && typeof options.id === "string") {
    throwError(
      "getTeams",
      "ID must be a number. If you want to get a team by name/nickname, use the 'name' key."
    );
  }

  try {
    const response = await api
      .get(url)
      .then((response: AxiosResponse) => response.data)
      .then(data =>
        data.stats ? parseData(data.stats) : parseData(data.teams)
      );
    return Promise.resolve(response);
  } catch (err) {
    throwError("getTeams", err);
  }
}

async function getPlayer(options?: any): Promise<void> {
  const baseUrl = getUrl("people", options);

  if (!options.id && !options.name) {
    throwError(
      "getPlayer",
      "Must include a player ID, name, or nickname as an option param."
    );
  }

  let url: string;

  if (options) {
    const { id, name, ...rest } = options;
    if (options.stats) {
      url = `${baseUrl}/stats?${qs.stringify(rest)}`;
    } else {
      url = `${baseUrl}?${qs.stringify(rest)}`;
    }

    throwSeasonFormattingError(options.season, "getPlayer");
  }

  if (options && typeof options.id === "string") {
    throwError(
      "getPlayer",
      "ID must be a number. If you want to get a player by name/nickname, use the 'name' key."
    );
  }

  try {
    const response = await api
      .get(url)
      .then((response: AxiosResponse) => response.data)
      .then(data =>
        data.stats ? parseData(data.stats[0].splits) : parseData(data.people)
      );
    return Promise.resolve(response);
  } catch (err) {
    throwError("getPlayer", err);
  }
}

async function getGame(options?: any): Promise<void> {
  const baseUrl = getUrl("game", options);

  if (!options.id) {
    throwError("getGame", "Must include a game ID as an option param.");
  }

  let url: string;

  if (options.type) {
    if (options.type === "feed" || options.type === "live") {
      url = `${baseUrl}/feed/live`;

      if (options.startTime) {
        url = `${baseUrl}/feed/live/diffPatch?startTimecode=${options.startTime}`;
      }
    }

    url = `${baseUrl}/${options.type}`;
  }

  if (!options.type) {
    url = `${baseUrl}/feed/live`;
  }

  try {
    const response = await api
      .get(url)
      .then((response: AxiosResponse) => response.data)
      .then(data => {
        delete data.copyright;
        return data;
      });
    return Promise.resolve(response);
  } catch (err) {
    throwError("getGame", err);
  }
}

async function getSchedule(options?: any): Promise<void> {
  const baseUrl = getUrl("schedule", options);

  let url: string;

  if (options) {
    if (options.expand) {
      options.expand = `schedule.${options.expand}`;
    }
    if (options.team) {
      if (typeof options.team === "string") {
        options.team = getId(teams, options.team);
      }
      delete Object.assign(options, { ["teamId"]: options["team"] })["team"];
    }
    url = `${baseUrl}?${qs.stringify(options)}`;
  } else {
    url = baseUrl;
  }

  try {
    const response = await api
      .get(url)
      .then(response => response.data)
      .then(data => {
        delete data.copyright;
        if (Array.isArray(data.dates) && data.dates.length > 1) {
          return data.dates.map(d => d.games[0]);
        } else {
          return data.dates[0].games[0];
        }
      });
    return Promise.resolve(response);
  } catch (err) {
    throwError("getSchedule", err);
  }
}

async function getSeasons(options?: any): Promise<void> {
  const baseUrl = getUrl("seasons", options);

  let url: string;

  if (options && options.season) {
    throwSeasonFormattingError(options.season, "getSeasons");

    url = `${baseUrl}?${qs.stringify(options)}`;
  } else {
    url = baseUrl;
  }

  try {
    const response = await api
      .get(url)
      .then(response => response.data)
      .then(data => parseData(data.seasons));
    return Promise.resolve(response);
  } catch (err) {
    throwError("getSeasons", err);
  }
}

async function getStandings(options?: any): Promise<void> {
  const baseUrl = getUrl("standings", options);

  let url: string;

  if (options) {
    const { type, season, expand, ...rest } = options;

    if (options.expand) {
      options.expand = `standings.${options.expand}`;
    }

    throwSeasonFormattingError(options.season, "getStandings");

    if (options.type) {
      url = `${baseUrl}/${options.type}?${qs.stringify(rest)}`;
    }
    url = `${baseUrl}/?${qs.stringify(options)}`;
  } else {
    url = baseUrl;
  }

  try {
    const response = await api
      .get(url)
      .then(response => response.data)
      .then(data => parseData(data.records));
    return Promise.resolve(response);
  } catch (err) {
    throwError("getStandings", err);
  }
}

async function getStandingsTypes(): Promise<void> {
  try {
    const response = await api
      .get(`/standingsTypes`)
      .then(response => response.data)
      .then(data => data);
    return Promise.resolve(response);
  } catch (err) {
    throwError("getStandingsTypes", err);
  }
}

async function getDraft(options?: any): Promise<void> {
  const baseUrl = getUrl("draft", options);

  let url: string;

  if (options && options.year) {
    if (options.year.toString().length !== 4) {
      throwError("getDraft", "Year must be a full, 4 digit number.");
    }
    url = `${baseUrl}/${options.year}`;
  } else {
    url = `${baseUrl}/draft`;
  }

  try {
    const response = await api
      .get(url)
      .then(response => response.data)
      .then(data => parseData(data.drafts));
    return Promise.resolve(response);
  } catch (err) {
    throwError("getDraft", err);
  }
}

async function getProspects(options?: any): Promise<void> {
  const url = getUrl("draft/prospects", options);

  try {
    const response = await api
      .get(url)
      .then(response => response.data)
      .then(data => parseData(data.prospects));
    return Promise.resolve(response);
  } catch (err) {
    throwError("getProspects", err);
  }
}

async function getAwards(options?: any): Promise<void> {
  const url = getUrl("awards", options);

  try {
    const response = await api
      .get(url)
      .then(response => response.data)
      .then(data => parseData(data.awards));
    return Promise.resolve(response);
  } catch (err) {
    throwError("getAwards", err);
  }
}

async function getVenues(options?: any): Promise<void> {
  const url = getUrl("venues", options);

  try {
    const response = await api
      .get(url)
      .then(response => response.data)
      .then(data => parseData(data.venues));
    return Promise.resolve(response);
  } catch (err) {
    throwError("getVenues", err);
  }
}

async function getDivisions(options?: any): Promise<void> {
  const url = getUrl("divisions", options);

  try {
    const response = await api
      .get(url)
      .then(response => response.data)
      .then(data => parseData(data.divisions));
    return Promise.resolve(response);
  } catch (err) {
    throwError("getDivisions", err);
  }
}

async function getConferences(options?: any): Promise<void> {
  const url = getUrl("conferences", options);

  try {
    const response = await api
      .get(url)
      .then(response => response.data)
      .then(data => parseData(data.conferences));
    return Promise.resolve(response);
  } catch (err) {
    throwError("getConferences", err);
  }
}

async function getPlayoffs(options?: any): Promise<void> {
  let url: string;
  if (options) {
    throwSeasonFormattingError(options.season, "getPlayoffs");

    url = `/tournaments/playoffs?${qs.stringify(options)}`;
  } else {
    url = `/tournaments/playoffs`;
  }

  try {
    const response = await api
      .get(url)
      .then(response => response.data)
      .then(data => {
        delete data.copyright;
        return data;
      });
    return Promise.resolve(response);
  } catch (err) {
    throwError("getPlayoffs", err);
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
