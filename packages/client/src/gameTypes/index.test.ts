import getGameTypes from "./index";

test("gets game types", async () => {
  const t = await getGameTypes();
  expect(t).toHaveLength(9);
});
