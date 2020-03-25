import getStandingsTypes from "./index";

test("get standings types", async () => {
  const t = await getStandingsTypes();
  expect(t).toEqual(
    expect.arrayContaining([expect.objectContaining({ name: "regularSeason" })])
  );
});
