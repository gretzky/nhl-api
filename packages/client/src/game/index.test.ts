import getGame from "./index";

test("gets a game feed", async () => {
  const t = await getGame({ id: 2019020174, type: "feed" });
  expect(t).toHaveProperty(
    "gameData",
    expect.objectContaining({ game: expect.anything() })
  );
  expect(t).toHaveProperty("metaData", expect.objectContaining({ wait: 10 }));
  expect(t).toHaveProperty(
    "liveData",
    expect.objectContaining({ plays: expect.anything() })
  );
});

test("gets a game boxscore", async () => {
  const t = await getGame({ id: 2019020174, type: "boxscore" });
  expect(t).toHaveProperty("teams");
  expect(t).toHaveProperty("officials");
});

test("gets a game linescore", async () => {
  const t = await getGame({ id: 2019020174, type: "linescore" });
  expect(t).toHaveProperty("currentPeriod");
  expect(t).toHaveProperty("periods");
  expect(t).toHaveProperty("shootoutInfo");
  expect(t).toHaveProperty("teams");
  expect(t).toHaveProperty("powerPlayStrength");
  expect(t).toHaveProperty("hasShootout");
  expect(t).toHaveProperty("intermissionInfo");
  expect(t).toHaveProperty("powerPlayInfo");
});

test("gets a game content", async () => {
  const t = await getGame({ id: 2019020174, type: "content" });
  expect(t).toHaveProperty("editorial");
  expect(t).toHaveProperty("media");
  expect(t).toHaveProperty("highlights");
});

test("throws an error if a game ID isn't provided", async () => {
  expect.assertions(1);
  try {
    await getGame();
  } catch (e) {
    expect(e).toEqual(
      new Error("[NHL API]: getGame(): Must include a game ID.")
    );
  }
});
