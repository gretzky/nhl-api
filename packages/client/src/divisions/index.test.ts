import getDivisions from "./index";

test("gets all divisions", async () => {
  const t = await getDivisions();
  expect(t).toHaveLength(4);
});

test("gets a single division by id", async () => {
  const t = await getDivisions({ id: 17 });
  expect(t).toHaveProperty("nameShort", "ATL");
});
