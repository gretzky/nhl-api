const axios = require("axios");
const getPlayerById = require("@nhl-api/players").getPlayerById;

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// livePbpQuickview {
//   [home/away]: {
//      id,
//      name,
//      abbrev,
//      skaters: [],
//      goalie: {},
//      scratches: [],
//      goals,
//      pim,
//      shots,
//      powerPlay: {percentage,goals,opportunities},
//      faceOffWins,
//      blocked,
//      takeaways,
//      giveaways,
//      hits,
//      coach: {}
//   },
//   meta: {
//    refs,
//    linesman,
//    venue
//   }
//   currentPeriodOrdinal,
//   currentPeriodTimeRemaining,
//   isIntermission,
//   intermissionTimeRemaining,
//   isPowerPlay,
//   powerPlayTimeRemaining,
//   isShootout,
//   stars: []
// }

async function main() {
  try {
    const response = await axios
      .get("https://statsapi.web.nhl.com/api/v1/game/2019020320/feed/live")
      .then(response => response.data)
      .then(data =>
        console.log({
          away: {
            id: data.liveData.boxscore.teams.away.team.id,
            name: data.liveData.boxscore.teams.away.team.name,
            abbreviation: data.liveData.boxscore.teams.away.team.abbreviation,
            goalie: {
              id: data.liveData.boxscore.teams.away.goalies[0],
              name: toTitleCase(
                getPlayerById(data.liveData.boxscore.teams.away.goalies[0]).name
              )
            },
            skaters: data.liveData.boxscore.teams.away.skaters.map(skater => {
              return {
                id: skater,
                name: toTitleCase(getPlayerById(skater).name)
              };
            }),
            scratches: data.liveData.boxscore.teams.away.scratches.map(
              scratch => {
                return {
                  id: scratch,
                  name: toTitleCase(getPlayerById(scratch).name)
                };
              }
            ),
            coach: data.liveData.boxscore.teams.away.coaches[0].person.fullName,
            stats: data.liveData.boxscore.teams.away.teamStats.teamSkaterStats
          }
        })
      );
    return Promise.resolve(response);
  } catch (err) {
    console.error(err);
  }
}

main();
