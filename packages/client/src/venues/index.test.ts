import getVenues from "./index";

test("get all venues", async () => {
  const t = await getVenues();
  expect(t).toHaveLength(17);
});

test("get a venue by id", async () => {
  const t = await getVenues({ id: 5064 });
  expect(t).toHaveProperty("name", "Pepsi Center");
});
