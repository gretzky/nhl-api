# @nhl-api/client

Async request wrapper around the [NHL API](https://statsapi.web.nhl.com/api/v1).

## Usage

```js
import NhlApi from "@nhl-api/client"

const nhl = new NhlApi()

nhl.getTeams({ name: "boston bruins" }).then(data => console.log(data))

nhl.getPlayer({ name: "wayne gretzky", stats: "statsSingleSeason", season: "19841985" }).then(data => console.log(data))
```

## API

### `getTeams(options)`

Gets either a list of all teams, or individual team data.

By default, it returns a list of all NHL teams.

```js
nhl.getTeams() // returns an array of team objects
```

You can pass in either `id` or `name` as an option to get an individual team.

```js
nhl.getTeams({ id: 20 }) // calgary flames
nhl.getTeams({ name: "boston" }) // boston bruins
nhl.getTeams({ name: "caps" }) // washington capitals

// if you search for a team by location, and  that location has ever had more than 1 team, it will return an array of teams matching the query.
nhl.getTeams({ name: "toronto" }) // returns an array with the Maple Leafs, St. Pats, and Arenas.
```

#### Modifiers

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#teams).

Expand modifiers don't require the `team.` prefix.

```js
nhl.getTeams({ id: 6, expand: 'roster' }) // returns the current team roster

nhl.getTeams({ id: 6, expand: 'schedule.next' }) // returns the next game the team plays

nhl.getTeams({ id: 6, expand: 'schedule.previous' }) // returns the last game a team played

nhl.getTeams({ id: 6, expand: 'stats' }) // returns current season stats and rankings
```

### `getPlayer(options)`

Gets data for a specific player. Requires at least 1 option param of either the player's name or ID.

```js
nhl.getPlayer({ id: 8447400 })
nhl.getPlayer({ name: 'wayne gretzky' })
// you can also search by nickname
nhl.getPlayer({ name: 'the great one' })

// searching by just first or last name will probably result in multiple players. 
// these will be returned in an array of player objects.
nhl.getPlayer({ name: 'gretzky' }) // returns brett and wayne

// nickname searches must be exact
nhl.getPlayer({ name: 'ace bailey' })
```

#### Modifiers

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#people).

The only modifier this endpoint accepts is `stats`:

```js
nhl.getPlayer({ name: 'wayne gretzky', stats: 'statsSingleSeason', season: '19801981' })
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
nhl.getSchedule() // by default it returns all games for the current day
```

#### Modifiers

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#schedule).

```js
nhl.getSchedule({ expand: "schedule.broadcasts" }) // shows game broadcasts

nhl.getSchedule({ expand: "schedule.linescore" }) // linescore for completed games

nhl.getSchedule({ id: 6 }) // gets today's games for a given team
nhl.getSchedule({ team: "bruins" }) // same as above

nhl.getSchedule({ date: "2019-10-27" }) // gets games for a given date

nhl.getSchedule({ startDate: "2019-09-30", endDate: "2019-10-14" }) // returns all games between a timeframe

// modifiers can be combined
nhl.getSchedule({
  team: "bruins",
  startDate: "2019-09-30",
  endDate: "2019-10-14"
}) // returns all bruins games between 9/30/19 and 10/14/19
```

### `getGame(options)`

Gets data from a specified game. Requires a game ID which can be retrieved from the [getSchedule](#getscheduleoptions) call, or you can [decipher the game ID yourself](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#game-ids).

```js
nhl.getGame({ id: 2019020174 }) // by default it calls the /feed/live endpoint
```

#### Modifiers

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#game).

```js
// both of these return from the /feed/live endpoint
// same as default
// contains all details from a given game
nhl.getGame({ id: 2019020174, type: "feed" })
nhl.getGame({ id: 2019020174, type: "live" })

nhl.getGame({ id: 2019020174, type: "boxscore" }) // post-game details

nhl.getGame({ id: 2019020174, type: "linescore" }) // less-detailed post-game details

nhl.getGame({ id: 2019020174, type: "content" }) // returns media related to game
```

### `getGameTypes()`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#game-types).

### `getPlayTypes()`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#play-types)

### Playoffs

Returns several playoff-specific details.

```js
nhl.getPlayoffs() // returns default playoff structure info
```

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#tournaments).

### `getSeasons()`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#seasons).

### `getStandings(options)`

Returns standings broken up by division

```js
nhl.getStandings()
```

#### Modifiers

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#standings)

```js
nhl.getStandings({ season: '19911992' }) // standings for specific season

nhl.getStandings({ date: '2019-09-30' }) // standings for a given day

nhl.getStandings({ expand: 'record' }) // gives detailed individual team info
```

You can use the `getStandingsType()` call to retrieve types to query standings by.

```js
nhl.getStandings({ type: 'wildCardWithLeaders', date: '2019-01-01' }) // returns complete wildcard standings for a given day
```

### `getStandingsTypes()`

Returns standings types to use with `getStandings()`.

```js
nhl.getStandingsTypes() // returns an array of all types
```

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#standings-types).

### `getDraft(options)`

Get round-by-round draft data for a given year

```js
nhl.getDraft() // returns current year by default

nhl.getDraft({ year: '1985' }) // returns draft for a given year
```

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#draft).

### `getProspects(options)`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#prospects)

```js
nhl.getProspects() // returns a full list of prospects

nhl.getProspect({ id: 53727 }) // returns an individual prospect
```

**Note:** the `name` param cannot be used here, there's no database of all draft prospects to query.

### `getAwards(options)`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#awards)

```js
nhl.getAwards() // returns all NHL awards
nhl.getAward({ id: 1 }) // returns individual award
```

### `getVenues(options)`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#venues)

```js
nhl.getVenues() // returns all venues
nhl.getVenues({ id: 5064 }) // returns individual venue
```

### `getDivisions(options)`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#divisions)

```js
nhl.getDivisions() // returns all divisons
nhl.getDivisions({ id: 17 }) // returns individual division
```

### `getConferences(options)`

[Info](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#conferences)

```js
nhl.getConferences() // returns all conferences
nhl.getConferences({ id: 5 }) // returns individual conferece
```

## Props

All this made possible by [Drew Hynes' NHL API Documentation](https://gitlab.com/dword4/nhlapi).

## Contributing

Please open an issue if you find anything incorrect / out-of-date / not working, etc.

---
built with [skeletor](https://github.com/gretzky/skeletor) 💀
