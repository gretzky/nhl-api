import { getTeamId } from "..";

const mockTeams = [
  {
    id: 10,
    name: "TORONTO MAPLE LEAFS",
    abbrev: "TOR",
    nicknames: ["LEAFS", "CRY BABIES"],
    colors: ["#00205B", "#FFF"]
  },
  {
    id: 58,
    name: "TORONTO ST. PATRICKS",
    abbrev: "TSP",
    nicknames: [],
    colors: ["#046A38", "#FFF"]
  },
  {
    id: 57,
    name: "TORONTO ARENAS",
    abbrev: "TAN",
    nicknames: [],
    colors: ["#003087"]
  }
];

describe("getTeamId", () => {
  it("gets a team by a name", () => {
    const t = getTeamId("bruins");
    expect(t).toBe(6);
  });

  it("gets all teams that match a query", () => {
    const t = getTeamId("toronto");
    expect(t).toStrictEqual(mockTeams);
  });
});
