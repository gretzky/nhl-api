import getConferences from "./index";

test("gets all conferences", async () => {
  const t = await getConferences();
  expect(t).toHaveLength(2);
});

test("gets a single conference by id", async () => {
  const t = await getConferences({ id: 6 });
  expect(t).toHaveProperty("abbreviation", "E");
});
