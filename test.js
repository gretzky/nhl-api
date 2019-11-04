const fs = require("fs");
const players = require("./n");

const s = fs.createWriteStream("./p.json", { flags: "a" });
const f = players.map(t => {
  return {
    id: t.id,
    name: t.name.toUpperCase(),
    nicknames: t.nicknames ? t.nicknames.map(n => n.toUpperCase()) : []
  };
});

const getPlayerId = name => {
  const p = players.filter(
    player =>
      player.name.includes(name.toUpperCase()) ||
      // match the exact nickname here instead of grabbing parts of a nickname to narrow down the search as much as we can
      player.nicknames.some(nickname => nickname === name.toUpperCase())
  );
  if (p.length > 1) {
    // if the query matches more than 1 player, return the array of players
    return p;
  } else {
    // player found, return the id
    return p[0].id;
  }
};

const getPlayerMugshot = options => {
  if (!options.id && !options.name) {
    throw new Error("Must provide a player name or id.");
  }
  return `https://assets.nhle.com/mugs/nhl/${
    options.season ? options.season : "20192020"
  }/${options.team.toUpperCase()}/${
    options.id ? options.id : getPlayerId(options.name)
  }.png`;
};

// s.write(JSON.stringify(f));

console.log(
  getPlayerMugshot({
    name: "ray emery",
    team: "phi",
    season: "20112012"
  })
);
