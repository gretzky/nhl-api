# @nhl-api/players

A list of all 16,892 NHL players to ever step on the ice*

<sup>*Probably. Some may be missing or duplicated. YMMV.</sup>

```bash
yarn add @nhl-api/players
```

## Usage

### `players.ts`

The main entree of this package. An array of objects containing 3 key/value pairs:

- **`id`**: (number) a unique number which you can use to to find more player info with the [NHL API](https://statsapi.web.nhl.com/api/v1).
- **`name`**: the player's first and last name as shown on a roster-- i.e. Ace Bailey (not Irving Bailey), Zach Aston-Reese (not Zachary), etc.

### `getPlayerById(id)`

Gets a player by their ID.

### `getPlayerId(name)`

Gets a player's ID by first name, last name, both, or a nickname.

If multiple players match the queried name param, an array of matching players is returned.

### `getPlayerMugshot(options)`

Gets a URL to an image of a given player by season and team. **Note:** This only works for **currently active** players.

Params:

- `id`: ID of a player to find _or_ `name`: name/nickname of player
- `season`: the season to get the headshot from (optional, defaults to current season)
- `team`: the team (abbreviation) that the player is on during the season specified. This may default to a particular headshot for the player if they were on multiple teams. 

```ts
import players, { getPlayerId, getPlayerMugshot } from '@nhl-api/players'
import axios from 'axios' // for http requests

// at its simplest, you can do whatever you want with the list of players
// (players.map(p => p.fullName))

// you can get a url to an image of the player with this fn
// note: only works with currently active players
const kovy = getPlayerMugshot({ name: "ilya kovalchuk", team: "atl", season: "20062007" })

// using the `getPlayerId` helper,
// you can get the player's id from their name
const gretzkyId = getPlayerId("wayne gretzky")
// or part of the players name
const gretzkyId = getPlayerId("gretzky")
// all return the players id - 8447400
// or an array of players if more than 1 player matches a name

// you can then use the id to make api calls to endpoints related to player stats/info
axios
  .get(`https://statsapi.web.nhl.com/api/v1/people/${gretzkyId}`)
  .then(response => response.data)
  .then(data => (data))
```

## Props

All this made possible by [Drew Hynes' NHL API Documentation](https://gitlab.com/dword4/nhlapi).

## Contributing

Please open an issue if you find that there's a player missing/duplicated, or the ID mapped to a particular player is incorrect.

---
built with [skeletor](https://github.com/gretzky/skeletor) 💀
