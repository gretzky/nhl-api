import getProspects from "./index";

test("get all draft prospects", async () => {
  const t = await getProspects();
  expect(t).toEqual(
    expect.arrayContaining([expect.objectContaining({ id: expect.anything() })])
  );
});

test("get a prospect by an id", async () => {
  const t = await getProspects({ id: 53727 });
  expect(t).toHaveProperty("fullName", "Zbynek Horak");
});
