import getSeasons from "./index";

test("gets all seasons", async () => {
  const t = await getSeasons();
  expect(t).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ seasonId: expect.anything() })
    ])
  );
});

test("gets a given season", async () => {
  const t = await getSeasons({ season: "20182019" });
  expect(t).toHaveProperty("seasonId");
});
