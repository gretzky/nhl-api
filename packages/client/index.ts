import axios, { AxiosResponse } from "axios";
import qs from "querystring";
import teams from "@nhl-api/teams";
import players from "@nhl-api/players";

class NHLApi {
  private baseUrl: string = `https://statsapi.web.nhl.com/api/v1`;

  private throwError = (fn: string, msg?: string, err?: Error): void => {
    throw new Error(`[NHL API]: ${fn}(): ${msg ? msg : err}`);
  };

  private isInvalidSeason = (season: string): boolean =>
    season.toString().length !== 8;

  private throwSeasonFormattingError = (fn: string): void => {
    this.throwError(
      fn,
      `Season must be formatted as both full years, i.e. '20192020'.`
    );
  };

  private getId = (resource: any, name: string): number | any[] => {
    const data = resource.filter(
      res =>
        res.name.includes(name.toUpperCase()) ||
        res.nicknames.some(nickname => nickname === name.toUpperCase())
    );

    if (!data.length) {
      const fnName = resource === teams ? "getTeams" : "getPlayer";
      this.throwError(
        fnName,
        `'${name}' not found, please try another search.\nIf you're searching by nickname, make sure it's exact.\nIf you think this is a bug, please open an issue: https://github.com/gretzky/nhl-api/issues`
      );
    }

    if (data.length === 1) {
      return data[0].id;
    }

    return data;
  };

  private getUrl = (resource: any, options?: any): string => {
    let baseUrl;

    if (options) {
      if (options.id && resource !== "schedule") {
        baseUrl = `${this.baseUrl}/${resource}/${options.id}`;
      } else if (!options.id && options.name) {
        const res = resource === "teams" ? teams : players;
        baseUrl = `${this.baseUrl}/${resource}/${this.getId(
          res,
          options.name
        )}`;
      }
    } else {
      baseUrl = `${this.baseUrl}/${resource}`;
    }

    return baseUrl;
  };

  private parseData = (prop: any): any => {
    if (prop && Array.isArray(prop) && prop.length === 1) {
      return prop[0];
    }
    return prop;
  };

  public async getTeams(options?: any): Promise<void> {
    const baseUrl = this.getUrl("teams", options);

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
      this.throwError(
        "getTeams",
        "ID must be a number. If you want to get a team by name/nickname, use the 'name' key."
      );
    }

    try {
      const response = await axios
        .get(url)
        .then((response: AxiosResponse) => response.data)
        .then(data =>
          data.stats ? this.parseData(data.stats) : this.parseData(data.teams)
        );
      return Promise.resolve(response);
    } catch (err) {
      this.throwError("getTeams", err);
    }
  }

  public async getPlayer(options?: any): Promise<void> {
    const baseUrl = this.getUrl("people", options);

    if (!options.id && !options.name) {
      this.throwError(
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

      if (options.season && this.isInvalidSeason(options.season)) {
        this.throwSeasonFormattingError("getPlayer");
      }
    }

    if (options && typeof options.id === "string") {
      this.throwError(
        "getPlayer",
        "ID must be a number. If you want to get a player by name/nickname, use the 'name' key."
      );
    }

    try {
      const response = await axios
        .get(url)
        .then((response: AxiosResponse) => response.data)
        .then(data =>
          data.stats
            ? this.parseData(data.stats[0].splits)
            : this.parseData(data.people)
        );
      return Promise.resolve(response);
    } catch (err) {
      this.throwError("getPlayer", err);
    }
  }

  public async getGame(options?: any): Promise<void> {
    const baseUrl = this.getUrl("game", options);

    if (!options.id) {
      this.throwError("getGame", "Must include a game ID as an option param.");
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
      const response = await axios
        .get(url)
        .then((response: AxiosResponse) => response.data)
        .then(data => {
          delete data.copyright;
          return data;
        });
      return Promise.resolve(response);
    } catch (err) {
      this.throwError("getGame", err);
    }
  }

  public async getSchedule(options?: any): Promise<void> {
    const baseUrl = this.getUrl("schedule", options);

    let url: string;

    if (options) {
      if (options.expand) {
        options.expand = `schedule.${options.expand}`;
      }
      if (options.team) {
        if (typeof options.team === "string") {
          options.team = this.getId(teams, options.team);
        }
        delete Object.assign(options, { ["teamId"]: options["team"] })["team"];
      }
      url = `${baseUrl}?${qs.stringify(options)}`;
    } else {
      url = baseUrl;
    }

    try {
      const response = await axios
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
      this.throwError("getSchedule", err);
    }
  }

  public async getSeasons(options?: any): Promise<void> {
    const baseUrl = this.getUrl("seasons", options);

    let url: string;

    if (options && options.season) {
      if (
        options.season !== "current" &&
        this.isInvalidSeason(options.season)
      ) {
        this.throwSeasonFormattingError("getSeasons");
      }
      url = `${baseUrl}?${qs.stringify(options)}`;
    } else {
      url = baseUrl;
    }

    try {
      const response = await axios
        .get(url)
        .then(response => response.data)
        .then(data => this.parseData(data.seasons));
      return Promise.resolve(response);
    } catch (err) {
      this.throwError("getSeasons", err);
    }
  }

  public async getStandings(options?: any): Promise<void> {
    const baseUrl = this.getUrl("standings", options);

    let url: string;

    if (options) {
      const { type, season, expand, ...rest } = options;

      if (options.expand) {
        options.expand = `standings.${options.expand}`;
      }
      if (options.season && options.season.toString().length !== 8) {
        this.throwSeasonFormattingError("getStandings");
      }
      if (options.type) {
        url = `${baseUrl}/${options.type}?${qs.stringify(rest)}`;
      }
      url = `${baseUrl}/?${qs.stringify(options)}`;
    } else {
      url = baseUrl;
    }

    try {
      const response = await axios
        .get(url)
        .then(response => response.data)
        .then(data => this.parseData(data.records));
      return Promise.resolve(response);
    } catch (err) {
      this.throwError("getStandings", err);
    }
  }

  public async getStandingsTypes(): Promise<void> {
    try {
      const response = await axios
        .get(`${this.baseUrl}/standingsTypes`)
        .then(response => response.data)
        .then(data => data);
      return Promise.resolve(response);
    } catch (err) {
      this.throwError("getStandingsTypes", err);
    }
  }

  public async getDraft(options?: any): Promise<void> {
    const baseUrl = this.getUrl("draft", options);

    let url: string;

    if (options && options.year) {
      if (options.year.toString().length !== 4) {
        this.throwError("getDraft", "Year must be a full, 4 digit number.");
      }
      url = `${baseUrl}/${options.year}`;
    } else {
      url = `${baseUrl}/draft`;
    }

    try {
      const response = await axios
        .get(url)
        .then(response => response.data)
        .then(data => this.parseData(data.drafts));
      return Promise.resolve(response);
    } catch (err) {
      this.throwError("getDraft", err);
    }
  }

  public async getProspects(options?: any): Promise<void> {
    const url = this.getUrl("draft/prospects", options);

    try {
      const response = await axios
        .get(url)
        .then(response => response.data)
        .then(data => this.parseData(data.prospects));
      return Promise.resolve(response);
    } catch (err) {
      this.throwError("getProspects", err);
    }
  }

  public async getAwards(options?: any): Promise<void> {
    const url = this.getUrl("awards", options);

    try {
      const response = await axios
        .get(url)
        .then(response => response.data)
        .then(data => this.parseData(data.awards));
      return Promise.resolve(response);
    } catch (err) {
      this.throwError("getAwards", err);
    }
  }

  public async getVenues(options?: any): Promise<void> {
    const url = this.getUrl("venues", options);

    try {
      const response = await axios
        .get(url)
        .then(response => response.data)
        .then(data => this.parseData(data.venues));
      return Promise.resolve(response);
    } catch (err) {
      this.throwError("getVenues", err);
    }
  }

  public async getDivisions(options?: any): Promise<void> {
    const url = this.getUrl("divisions", options);

    try {
      const response = await axios
        .get(url)
        .then(response => response.data)
        .then(data => this.parseData(data.divisions));
      return Promise.resolve(response);
    } catch (err) {
      this.throwError("getDivisions", err);
    }
  }

  public async getConferences(options?: any): Promise<void> {
    const url = this.getUrl("conferences", options);

    try {
      const response = await axios
        .get(url)
        .then(response => response.data)
        .then(data => this.parseData(data.conferences));
      return Promise.resolve(response);
    } catch (err) {
      this.throwError("getConferences", err);
    }
  }

  public async getPlayoffs(options?: any): Promise<void> {
    let url: string;
    if (options) {
      if (options.season && this.isInvalidSeason(options.season)) {
        this.throwSeasonFormattingError("getPlayoffs");
      }
      url = `${this.baseUrl}/tournaments/playoffs?${qs.stringify(options)}`;
    } else {
      url = `${this.baseUrl}/tournaments/playoffs`;
    }

    try {
      const response = await axios
        .get(url)
        .then(response => response.data)
        .then(data => {
          delete data.copyright;
          return data;
        });
      return Promise.resolve(response);
    } catch (err) {
      this.throwError("getPlayoffs", err);
    }
  }
}

export default NHLApi;
