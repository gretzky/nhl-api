import getDraft from "./index";

test("get draft", async () => {
  const t = await getDraft();
  expect(t).toHaveProperty("rounds");
});

test("get draft by a given year", async () => {
  const t = await getDraft({ year: "2008" });
  expect(t).toHaveProperty("draftYear", 2008);
});

test("throws an error if a year isn't 4 digits", async () => {
  expect.assertions(1);
  try {
    await getDraft({
      year: "09"
    });
  } catch (e) {
    expect(e).toEqual(
      new Error("[NHL API]: getDraft(): Year must be a full, 4 digit number.")
    );
  }
});
