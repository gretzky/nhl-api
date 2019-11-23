import getStandings from "./index";

test("get standings", async () => {
  const t = await getStandings();
  expect(t).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ teamRecords: expect.anything() })
    ])
  );
});

test("get standings for a given season", async () => {
  const t = await getStandings({ season: "20102011" });
  expect(t).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ teamRecords: expect.anything() })
    ])
  );
  expect(t).toEqual(
    expect.arrayContaining([expect.objectContaining({ season: "20102011" })])
  );
});
