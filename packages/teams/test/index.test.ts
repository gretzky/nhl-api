import { getTeamId } from "../src";

const mockTeams = [
  {
    id: 10,
    name: "TORONTO MAPLE LEAFS",
    abbrev: "TOR",
    nicknames: ["LEAFS", "CRY BABIES"],
    colors: ["#00205B", "#FFF"],
    logo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Toronto_Maple_Leafs_2016_logo.svg/440px-Toronto_Maple_Leafs_2016_logo.svg.png"
  },
  {
    id: 58,
    name: "TORONTO ST. PATRICKS",
    abbrev: "TSP",
    nicknames: [],
    colors: ["#046A38", "#FFF"],
    logo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Toronto_St._Patricks_logo.svg/440px-Toronto_St._Patricks_logo.svg.png"
  },
  {
    id: 57,
    name: "TORONTO ARENAS",
    abbrev: "TAN",
    nicknames: [],
    colors: ["#003087"],
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Toronto_Arenas_Logo.svg/440px-Toronto_Arenas_Logo.svg.png"
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
