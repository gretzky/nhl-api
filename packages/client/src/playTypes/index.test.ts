import getPlayTypes from "./index";

test("gets play types", async () => {
  const t = await getPlayTypes();
  expect(t).toHaveLength(25);
});
