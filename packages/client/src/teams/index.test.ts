import getTeams from "./index";

test("gets all teams", async () => {
  const t = await getTeams();
  expect(t).toHaveLength(31);
});

test("gets an individual team", async () => {
  const t = await getTeams({ id: 6 });
  expect(t).toHaveProperty("teamName", "Bruins");
});

test("gets a team roster", async () => {
  const t = await getTeams({ id: 6, expand: "roster" });
  expect(t).toContainEqual(expect.objectContaining({ jerseyNumber: "37" }));
});

test("gets a team roster for a given season", async () => {
  const t = await getTeams({
    id: 6,
    expand: "roster",
    season: "20102011"
  });
  expect(t).toContainEqual(expect.objectContaining({ jerseyNumber: "21" }));
});

test("gets next team game", async () => {
  const t = await getTeams({ id: 6, expand: "schedule.next" });
  expect(t).toHaveProperty("nextGameSchedule");
});

test("gets previous team game", async () => {
  const t = await getTeams({ id: 6, expand: "schedule.previous" });
  expect(t).toHaveProperty("previousGameSchedule");
});

test("gets basic team stats and rankings for current season", async () => {
  const t = await getTeams({ id: 6, expand: "stats" });
  expect(t).toContainEqual(
    expect.objectContaining({ type: { displayName: "statsSingleSeason" } })
  );
  expect(t).toContainEqual(
    expect.objectContaining({
      type: { displayName: "regularSeasonStatRankings" }
    })
  );
});

test("gets basic team stats and rankings for a given season", async () => {
  const t = await getTeams({
    id: 6,
    expand: "stats",
    season: "20102011"
  });
  expect(t).toContainEqual(
    expect.objectContaining({ type: { displayName: "statsSingleSeason" } })
  );
  expect(t).toContainEqual(
    expect.objectContaining({
      type: { displayName: "regularSeasonStatRankings" }
    })
  );
});
