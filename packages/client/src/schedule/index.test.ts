import getSchedule from "./index";

test("gets game schedule for the current day", async () => {
  const t = await getSchedule();
  expect(t).toHaveProperty("games");
});

test("gets game schedule for a given date", async () => {
  const t = await getSchedule({
    date: "2018-01-09"
  });
  expect(t).toHaveProperty("date", "2018-01-09");
});

test("gets game schedule for a given date range", async () => {
  const t = await getSchedule({
    startDate: "2018-01-09",
    endDate: "2018-01-12"
  });
  expect(t).toEqual(
    expect.arrayContaining([expect.objectContaining({ date: "2018-01-09" })])
  );
});

test("gets game schedule with broadcast info", async () => {
  const t = await getSchedule({ expand: "broadcasts" });
  expect(t).toHaveProperty(
    "games",
    expect.arrayContaining([
      expect.objectContaining({ broadcasts: expect.anything() })
    ])
  );
});

test("gets game schedule with linescore", async () => {
  const t = await getSchedule({ expand: "linescore" });
  expect(t).toHaveProperty(
    "games",
    expect.arrayContaining([
      expect.objectContaining({ linescore: expect.anything() })
    ])
  );
});

test("gets game schedule with ticket info", async () => {
  const t = await getSchedule({ expand: "ticket" });
  expect(t).toHaveProperty(
    "games",
    expect.arrayContaining([
      expect.objectContaining({ tickets: expect.anything() })
    ])
  );
});
