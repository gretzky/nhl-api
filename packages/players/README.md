# @nhl-api/players

A list of every NHL player to ever step on the ice*

<sup>*Probably. Some may be missing or duplicated. YMMV.</sup>

```bash
yarn add @nhl-api/players
```

## Usage

`players.json` is an array of objects containing 3 key/value pairs:

- **`id`**: (number) a unique number which you can use to to find more player info with the [NHL API](https://statsapi.web.nhl.com/api/v1).
- **`fullName`**: the player's first and last name
  - this means the players real first name is used (i.e. Irvine Bailey rather than Ace Bailey)
  - players with first names that are commonly shortened are kept shortened if that was their roster name (i.e. Andy Brickley isn't 'Andrew', and on the flipside Donald Brashear isn't 'Don', etc.)
- **`nicknames`**: nicknames the player has/had ([reference](https://en.wikipedia.org/wiki/List_of_ice_hockey_nicknames)). value is an array of strings
  - this also includes abbreviations (i.e. P.J. Axelsson)
  - players that went by a nickname primarily (i.e. Ace Bailey) have a nickname entry that contains their nickname and last name, so that they can easily be searched
  - this is an empty array if player has no nicknames

There's also a helper function available (`getPlayerId`) that matches a passed param to either the player's first/last name or nickname and returns their ID. 

```ts
import players, { getPlayerId } from '@nhl-api/players'
import axios from 'axios' // for http requests

// at its simplest, you can do whatever you want with the list of players
// (players.map(p => p.fullName))

// using the `getPlayerId` helper,
// you can get the player's id from their name
const gretzkyId = getPlayerId("wayne gretzky")
// or part of the players name
const gretzkyId = getPlayerId("gretzky")
// or their nickname
const gretzkyId = getPlayerId("the great one")
// all return the players id - 8447400

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
