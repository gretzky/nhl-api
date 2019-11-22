# @nhl-api/teams

A list of every NHL team that ever existed.

```bash
yarn add @nhl-api/teams
```

## Usage

`teams.json` is an array of objects containing 5 key/value pairs:

- **`id`**: (number) a unique number which you can use to to find more team info with the [NHL API](https://statsapi.web.nhl.com/api/v1).
- **`name`**: full name (location, name) of the team
- **`abbreviation`**: team abbreviation code
- **`nicknames`**: any well-known nicknames the team has
- **`colors`**: color scheme of each team (includes retired or alternate jersey colors)
- **`logo`**: primary team logo (transparent SVG)
- **`goalHorn`**: team goal horn (no song) between 5-10s
- **`goalHornSong`**: team goal horn with song (full track)
- **`isActive**: boolean to filter currently active teams

There's also a helper function available (`getTeamId`) that matches a passed param to either the team's location, name, or nickname and returns the ID.

```ts
import teams, { getTeamId } from "@nhl-api/teams";
import axios from "axios"; // for http requests

// at its simplest, you can do whatever you want with the full list
// (teams.map(t => t.name))

// using the `getTeamId` helper,
// you can get the team id from the team name
const bruinsId = getTeamId("boston bruins");
// or part of the team name
const bruinsId = getTeamId("boston");
// or a nickname
const bruinsId = getTeamId("big bad bruins");
// all return the id - 6

// you can then use the id to make api calls to endpoints related to team stats/info
axios
  .get(`https://statsapi.web.nhl.com/api/v1/teams/${bruinsId}`)
  .then(response => response.data)
  .then(data => data);
```

## Props

All this made possible by [Drew Hynes' NHL API Documentation](https://gitlab.com/dword4/nhlapi).

## Contributing

Please open an issue if you find any discrepancies, or you think something is missing.

---

built with [skeletor](https://github.com/gretzky/skeletor) 💀
