import getPlayer from './index';

test('gets a single player by id', async () => {
  const t = await getPlayer({ id: 8447400 });
  expect(t).toHaveProperty('fullName', 'Wayne Gretzky');
});

test('gets a single player by name', async () => {
  const t = await getPlayer({ name: 'tuukka rask' });
  expect(t).toHaveProperty('fullName', 'Tuukka Rask');
});

test('gets a players current stats', async () => {
  const t = await getPlayer({
    name: 'Zdeno Chara',
    stats: 'statsSingleSeason',
  });
  expect(t).toHaveProperty(
    'stat',
    expect.objectContaining({ assists: expect.anything() })
  );
});

test('gets a players stats for a given season', async () => {
  const t = await getPlayer({
    name: 'Andrew Ference',
    stats: 'statsSingleSeason',
    season: '20102011',
  });
  expect(t).toHaveProperty('season', '20102011');
});

test('gets a players stats year by year', async () => {
  const t = await getPlayer({ name: 'ovechkin', stats: 'yearByYear' });
  expect(t).toContainEqual(
    expect.objectContaining({
      league: expect.objectContaining({ name: 'Russia-3' }),
    })
  );
});

test('gets a players stats by win/loss', async () => {
  const t = await getPlayer({
    name: 'brad marchand',
    stats: 'winLoss',
    season: '20182019',
  });
  expect(t).toContainEqual(
    expect.objectContaining({
      stat: expect.objectContaining({ assists: 46 }),
    })
  );
});

test('gets a players stats by home/away', async () => {
  const t = await getPlayer({
    name: 'brad marchand',
    stats: 'homeAndAway',
    season: '20182019',
  });
  expect(t).toContainEqual(
    expect.objectContaining({
      stat: expect.objectContaining({ gameWinningGoals: 7 }),
    })
  );
});

test('gets a players stats by month', async () => {
  const t = await getPlayer({
    name: 'mark recchi',
    stats: 'byMonth',
    season: '20062007',
  });
  expect(t).toContainEqual(
    expect.objectContaining({
      month: 1,
    })
  );
});

test('gets a players stats by day of week', async () => {
  const t = await getPlayer({
    name: 'jaromir jagr',
    stats: 'byDayOfWeek',
    season: '19961997',
  });
  expect(t).toContainEqual(
    expect.objectContaining({
      dayOfWeek: 3,
    })
  );
});

test('gets a players stats vs division', async () => {
  const t = await getPlayer({
    name: 'tim thomas',
    stats: 'vsDivision',
    season: '20082009',
  });
  expect(t).toContainEqual(
    expect.objectContaining({
      opponentDivision: expect.objectContaining({ name: 'Central' }),
    })
  );
});

test('gets a players stats vs conference', async () => {
  const t = await getPlayer({
    name: 'tim thomas',
    stats: 'vsConference',
    season: '20082009',
  });
  expect(t).toContainEqual(
    expect.objectContaining({
      opponentConference: expect.objectContaining({ name: 'Eastern' }),
    })
  );
});

test('gets a players stats vs team', async () => {
  const t = await getPlayer({
    name: 'Roberto Luongo',
    stats: 'vsTeam',
    season: '20172018',
  });
  expect(t).toContainEqual(
    expect.objectContaining({
      opponent: expect.objectContaining({ name: 'Boston Bruins' }),
    })
  );
});

test('gets a players stats for each game', async () => {
  const t = await getPlayer({
    name: 'connor mcdavid',
    stats: 'gameLog',
    season: '20162017',
  });
  expect(t).toContainEqual(expect.objectContaining({ date: '2017-04-06' }));
});

test('gets a players stat rankings', async () => {
  const t = await getPlayer({
    name: 'mario lemieux',
    stats: 'regularSeasonStatRankings',
    season: '19851986',
  });
  expect(t).toHaveProperty(
    'stat',
    expect.objectContaining({ rankPoints: '2nd' })
  );
});

test('gets player goals by game situation', async () => {
  const t = await getPlayer({
    name: 'patrice bergeron',
    stats: 'goalsByGameSituation',
    season: '20102011',
  });
  expect(t).toHaveProperty(
    'stat',
    expect.objectContaining({ gameWinningGoals: expect.anything() })
  );
});

test('gets player projected stats', async () => {
  const t = await getPlayer({
    name: 'david pastrnak',
    stats: 'onPaceRegularSeason',
    season: '20192020',
  });
  expect(t).toHaveProperty(
    'stat',
    expect.objectContaining({ assists: expect.anything() })
  );
});

test("throws an error if an season isn't valid", async () => {
  expect.assertions(1);
  try {
    await getPlayer({
      name: 'brad marchand',
      stats: 'goalsByGameSituation',
      season: '2018',
    });
  } catch (e) {
    expect(e).toEqual(
      new Error(
        "[NHL API]: getPlayer(): Season must be formatted as both full years, i.e. '20192020'."
      )
    );
  }
});
