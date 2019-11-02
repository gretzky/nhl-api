# @nhl-api/client

Async request wrapper around the [NHL API](https://statsapi.web.nhlApi.com/api/v1).

## Usage

```js
import nhlApi from "@nhl-api/client"

nhlApi
  .getTeams({ name: "boston bruins" })
  .then(data => console.log(data))

nhlApi
  .getPlayer({
    name: "wayne gretzky",
    stats: "statsSingleSeason",
    season: "19841985"
  })
  .then(data => console.log(data))
```

## API

### `getTeams(options)`

Gets either a list of all teams, or individual team data.

By default, it returns a list of all NHL teams.

```js
nhlApi.getTeams() // returns an array of team objects
```

You can pass in either `id` or `name` as an option to get an individual team.

```js
nhlApi.getTeams({ id: 20 }) // calgary flames
nhlApi.getTeams({ name: "boston" }) // boston bruins
nhlApi.getTeams({ name: "caps" }) // washington capitals

// if you search for a team by location, and  that location has ever had more than 1 team, it will return an array of teams matching the query.
nhlApi.getTeams({ name: "toronto" }) // returns an array with the Maple Leafs, St. Pats, and Arenas.
```

#### Modifiers

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#teams).

Expand modifiers don't require the `team.` prefix.

```js
nhlApi.getTeams({ id: 6, expand: 'roster' }) // returns the current team roster

nhlApi.getTeams({ id: 6, expand: 'schedule.next' }) // returns the next game the team plays

nhlApi.getTeams({ id: 6, expand: 'schedule.previous' }) // returns the last game a team played

nhlApi.getTeams({ id: 6, expand: 'stats' }) // returns current season stats and rankings
```

### `getPlayer(options)`

Gets data for a specific player. Requires at least 1 option param of either the player's name or ID.

```js
nhlApi.getPlayer({ id: 8447400 })
nhlApi.getPlayer({ name: 'wayne gretzky' })
// you can also search by nickname
nhlApi.getPlayer({ name: 'the great one' })

// searching by just first or last name will probably result in multiple players. 
// these will be returned in an array of player objects.
nhlApi.getPlayer({ name: 'gretzky' }) // returns brett and wayne

// nickname searches must be exact
nhlApi.getPlayer({ name: 'ace bailey' })
```

#### Modifiers

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#people).

The only modifier this endpoint accepts is `stats`:

```js
nhlApi.getPlayer({ name: 'wayne gretzky', stats: 'statsSingleSeason', season: '19801981' })
```

Accepted stat options:
- `statsSingleSeason`
- `yearByYear`
- `homeAndAway`
- `winLoss`
- `byMonth`
- `byDayOfWeek`
- `vsDivision`
- `vsConference`
- `vsTeam`
- `gameLog`
- `regularSeasonStatRanking`
- `goalsByGameSituation`
- `onPaceRegularSeason`

Every stat option (except `yearByYear`) also requires a `season` param be passed. This is an 8 digit number with both years of a season- i.e. '20192020'.

### `getSchedule(options)`

Gets game scheduling information.

```js
nhlApi.getSchedule() // by default it returns all games for the current day
```

#### Modifiers

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#schedule).

```js
nhlApi.getSchedule({ expand: "schedule.broadcasts" }) // shows game broadcasts

nhlApi.getSchedule({ expand: "schedule.linescore" }) // linescore for completed games

nhlApi.getSchedule({ id: 6 }) // gets today's games for a given team
nhlApi.getSchedule({ team: "bruins" }) // same as above

nhlApi.getSchedule({ date: "2019-10-27" }) // gets games for a given date

nhlApi.getSchedule({ startDate: "2019-09-30", endDate: "2019-10-14" }) // returns all games between a timeframe

// modifiers can be combined
nhlApi.getSchedule({
  team: "bruins",
  startDate: "2019-09-30",
  endDate: "2019-10-14"
}) // returns all bruins games between 9/30/19 and 10/14/19
```

### `getGame(options)`

Gets data from a specified game. Requires a game ID which can be retrieved from the [getSchedule](#getscheduleoptions) call, or you can [decipher the game ID yourself](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#game-ids).

```js
nhlApi.getGame({ id: 2019020174 }) // by default it calls the /feed/live endpoint
```

#### Modifiers

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#game).

```js
// both of these return from the /feed/live endpoint
// same as default
// contains all details from a given game
nhlApi.getGame({ id: 2019020174, type: "feed" })
nhlApi.getGame({ id: 2019020174, type: "live" })

nhlApi.getGame({ id: 2019020174, type: "boxscore" }) // post-game details

nhlApi.getGame({ id: 2019020174, type: "linescore" }) // less-detailed post-game details

nhlApi.getGame({ id: 2019020174, type: "content" }) // returns media related to game
```

### `getGameTypes()`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#game-types).

### `getPlayTypes()`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#play-types)

### Playoffs

Returns several playoff-specific details.

```js
nhlApi.getPlayoffs() // returns default playoff structure info
```

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#tournaments).

### `getSeasons()`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#seasons).

### `getStandings(options)`

Returns standings broken up by division

```js
nhlApi.getStandings()
```

#### Modifiers

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#standings)

```js
nhlApi.getStandings({ season: '19911992' }) // standings for specific season

nhlApi.getStandings({ date: '2019-09-30' }) // standings for a given day

nhlApi.getStandings({ expand: 'record' }) // gives detailed individual team info
```

You can use the `getStandingsType()` call to retrieve types to query standings by.

```js
nhlApi.getStandings({ type: 'wildCardWithLeaders', date: '2019-01-01' }) // returns complete wildcard standings for a given day
```

### `getStandingsTypes()`

Returns standings types to use with `getStandings()`.

```js
nhlApi.getStandingsTypes() // returns an array of all types
```

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#standings-types).

### `getDraft(options)`

Get round-by-round draft data for a given year

```js
nhlApi.getDraft() // returns current year by default

nhlApi.getDraft({ year: '1985' }) // returns draft for a given year
```

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#draft).

### `getProspects(options)`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#prospects)

```js
nhlApi.getProspects() // returns a full list of prospects

nhlApi.getProspect({ id: 53727 }) // returns an individual prospect
```

**Note:** the `name` param cannot be used here, there's no database of all draft prospects to query.

### `getAwards(options)`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#awards)

```js
nhlApi.getAwards() // returns all NHL awards
nhlApi.getAward({ id: 1 }) // returns individual award
```

### `getVenues(options)`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#venues)

```js
nhlApi.getVenues() // returns all venues
nhlApi.getVenues({ id: 5064 }) // returns individual venue
```

### `getDivisions(options)`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#divisions)

```js
nhlApi.getDivisions() // returns all divisons
nhlApi.getDivisions({ id: 17 }) // returns individual division
```

### `getConferences(options)`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#conferences)

```js
nhlApi.getConferences() // returns all conferences
nhlApi.getConferences({ id: 5 }) // returns individual conferece
```

## Props

All this made possible by [Drew Hynes' NHL API Documentation](https://gitlab.com/dword4/nhlapi).

## Contributing

Please open an issue if you find anything incorrect / out-of-date / not working, etc.

---
built with [skeletor](https://github.com/gretzky/skeletor) 💀
