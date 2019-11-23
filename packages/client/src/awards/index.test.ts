import getAwards from "./index";

test("get all awards", async () => {
  const t = await getAwards();
  expect(t).toEqual(
    expect.arrayContaining([expect.objectContaining({ name: "Vezina Trophy" })])
  );
});

test("get an award by id", async () => {
  const t = await getAwards({ id: 1 });
  expect(t).toHaveProperty("name", "Stanley Cup");
});
