import NHLApi from "..";
import "@testing-library/jest-dom/extend-expect";

describe("teams", () => {
  it("gets all teams", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getTeams");
    let nhlApi = new NHLApi();
    await nhlApi.getTeams();
    expect(spy).toHaveBeenCalled();
  });

  it("gets a single team", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getTeams");
    let nhlApi = new NHLApi();
    await nhlApi.getTeams({ id: 6 });
    expect(spy).toHaveBeenCalled();
  });

  it("gets team stats", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getTeams");
    let nhlApi = new NHLApi();
    await nhlApi.getTeams({ id: 6, expand: "stats" });
    expect(spy).toHaveBeenCalled();
  });

  it("gets a team roster", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getTeams");
    let nhlApi = new NHLApi();
    await nhlApi.getTeams({ id: 6, expand: "roster" });
    expect(spy).toHaveBeenCalled();
  });

  it("gets the next game for a team", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getTeams");
    let nhlApi = new NHLApi();
    await nhlApi.getTeams({ id: 6, expand: "schedule.next" });
    expect(spy).toHaveBeenCalled();
  });
});

describe("player", () => {
  it("gets a player", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getPlayer");
    let nhlApi = new NHLApi();
    await nhlApi.getPlayer({ name: "wayne gretzky" });
    expect(spy).toHaveBeenCalled();
  });

  it("gets player stats", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getPlayer");
    let nhlApi = new NHLApi();
    await nhlApi.getPlayer({
      name: "wayne gretzky",
      stats: "statsSingleSeason",
      season: "19841985"
    });
    expect(spy).toHaveBeenCalled();
  });
});

describe("schedule", () => {
  it("gets today's schedule", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getSchedule");
    let nhlApi = new NHLApi();
    await nhlApi.getSchedule();
    expect(spy).toHaveBeenCalled();
  });

  it("gets a team schedule", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getSchedule");
    let nhlApi = new NHLApi();
    await nhlApi.getSchedule({ team: 6 });
    expect(spy).toHaveBeenCalled();
  });

  it("gets a team schedule from a given date", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getSchedule");
    let nhlApi = new NHLApi();
    await nhlApi.getSchedule({
      date: "2019-10-27"
    });
    expect(spy).toHaveBeenCalled();
  });
});

describe("seasons", () => {
  it("gets the current season", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getSchedule");
    let nhlApi = new NHLApi();
    await nhlApi.getSeasons();
    expect(spy).toHaveBeenCalled();
  });

  it("gets a specific season", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getSchedule");
    let nhlApi = new NHLApi();
    await nhlApi.getSeasons({ season: "20022003" });
    expect(spy).toHaveBeenCalled();
  });
});

describe("standings", () => {
  it("gets current standings", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getStandings");
    let nhlApi = new NHLApi();
    await nhlApi.getStandings();
    expect(spy).toHaveBeenCalled();
  });

  it("gets a specific season standings", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getStandings");
    let nhlApi = new NHLApi();
    await nhlApi.getStandings({ season: "20082009" });
    expect(spy).toHaveBeenCalled();
  });

  it("gets a type of standing", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getStandings");
    let nhlApi = new NHLApi();
    await nhlApi.getStandings({
      type: "wildCardWithLeaders",
      date: "2019-01-01"
    });
    expect(spy).toHaveBeenCalled();
  });

  it("gets standings with team records", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getStandings");
    let nhlApi = new NHLApi();
    await nhlApi.getStandings({ expand: "record" });
    expect(spy).toHaveBeenCalled();
  });

  it("gets standings types", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getStandingsTypes");
    let nhlApi = new NHLApi();
    await nhlApi.getStandingsTypes();
    expect(spy).toHaveBeenCalled();
  });
});

describe("draft", () => {
  it("gets the most recent draft", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getDraft");
    let nhlApi = new NHLApi();
    await nhlApi.getDraft();
    expect(spy).toHaveBeenCalled();
  });

  it("gets a draft from a given year", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getDraft");
    let nhlApi = new NHLApi();
    await nhlApi.getDraft({ year: 2010 });
    expect(spy).toHaveBeenCalled();
  });

  it("gets draft prospects", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getProspects");
    let nhlApi = new NHLApi();
    await nhlApi.getProspects();
    expect(spy).toHaveBeenCalled();
  });

  it("gets an individual draft prospect", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getProspects");
    let nhlApi = new NHLApi();
    await nhlApi.getProspects({ id: 53727 });
    expect(spy).toHaveBeenCalled();
  });
});

describe("awards", () => {
  it("gets nhl awards", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getAwards");
    let nhlApi = new NHLApi();
    await nhlApi.getAwards();
    expect(spy).toHaveBeenCalled();
  });

  it("gets a specific award", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getAwards");
    let nhlApi = new NHLApi();
    await nhlApi.getAwards({ id: 1 });
    expect(spy).toHaveBeenCalled();
  });
});

describe("venues", () => {
  it("gets all venues", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getVenues");
    let nhlApi = new NHLApi();
    await nhlApi.getVenues();
    expect(spy).toHaveBeenCalled();
  });

  it("gets a specific venue", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getVenues");
    let nhlApi = new NHLApi();
    await nhlApi.getVenues({ id: 5064 });
    expect(spy).toHaveBeenCalled();
  });
});

describe("divisions", () => {
  it("gets all divisions", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getDivisions");
    let nhlApi = new NHLApi();
    await nhlApi.getDivisions();
    expect(spy).toHaveBeenCalled();
  });

  it("gets a specific division", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getDivisions");
    let nhlApi = new NHLApi();
    await nhlApi.getDivisions({ id: 17 });
    expect(spy).toHaveBeenCalled();
  });
});

describe("conferences", () => {
  it("gets all conferences", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getConferences");
    let nhlApi = new NHLApi();
    await nhlApi.getConferences();
    expect(spy).toHaveBeenCalled();
  });

  it("gets a specific division", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getConferences");
    let nhlApi = new NHLApi();
    await nhlApi.getConferences({ id: 5 });
    expect(spy).toHaveBeenCalled();
  });
});

describe("playoffs", () => {
  it("gets current playoffs", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getPlayoffs");
    let nhlApi = new NHLApi();
    await nhlApi.getPlayoffs();
    expect(spy).toHaveBeenCalled();
  });

  it("gets playoffs from a specific season", async () => {
    const spy = jest.spyOn(NHLApi.prototype, "getPlayoffs");
    let nhlApi = new NHLApi();
    await nhlApi.getPlayoffs({ season: "20182019" });
    expect(spy).toHaveBeenCalled();
  });
});

// it("invokes getGame", async () => {
//   const spy = jest.spyOn(NHLApi.prototype, "getGame");
//   let nhlApi = new NHLApi();
//   await nhlApi.getGame({ id: 2019020174 });
//   expect(spy).toHaveBeenCalled();
// });
