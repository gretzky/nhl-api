import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import nhlApi from "../fn";
import { mockTeams, mockTeam, mockStats } from "../mocks";

const mock = new MockAdapter(axios);

describe("nhl api", () => {
  describe("getTeams", () => {
    it("gets all teams", async () => {
      const t = await nhlApi.getTeams();
      expect(t).toStrictEqual(mockTeams);
    });

    it("gets a single team by id", async () => {
      const t = await nhlApi.getTeams({ id: 6 });
      expect(t).toStrictEqual(mockTeam);
    });

    it("gets a single team by name", async () => {
      const t = await nhlApi.getTeams({ name: "bruins" });
      expect(t).toStrictEqual(mockTeam);
    });

    it("gets a single team by nickname", async () => {
      const t = await nhlApi.getTeams({ name: "big bad bruins" });
      expect(t).toStrictEqual(mockTeam);
    });

    it("gets team stats", async () => {
      const t = await nhlApi.getTeams({ id: 6, expand: "stats" });
      expect(t).toStrictEqual(mockStats);
    });

    it("gets a team roster", async () => {
      const t = await nhlApi.getTeams({ id: 6, expand: "roster" });
      expect(t).toStrictEqual([]);
    });
  });
});
