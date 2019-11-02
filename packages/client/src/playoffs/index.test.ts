import getPlayoffs from "./index";

test("gets current season playoff info", async () => {
  const t = await getPlayoffs();
  expect(t).toHaveProperty("season");
});

test("gets playoff info for a given season", async () => {
  const t = await getPlayoffs({ season: "20182019" });
  expect(t).toHaveProperty("rounds");
});
