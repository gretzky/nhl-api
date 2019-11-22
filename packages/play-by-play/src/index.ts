import nhlApi from "@nhl-api/client";

// away: {
//   goals: data.liveData.boxscore.teams.away.teamStats.goals,
//   pim: data.liveData.boxscore.teams.away.teamStats.pim,
//   shots: data.liveData.boxscore.teams.away.teamStats.shots,
//   faceOffWinPercentage:
//     data.liveData.boxscore.teams.away.teamStats.faceOffWinPercentage,
//   blockedShots: data.liveData.boxscore.teams.away.teamStats.blocked,
//   takeaways: data.liveData.boxscore.teams.away.teamStats.takeaways,
//   giveaways: data.liveData.boxscore.teams.away.teamStats.giveaways,
//   hits: data.liveData.boxscore.teams.away.teamStats.hits
// },
// home: {
//   goals: data.liveData.boxscore.teams.home.teamStats.goals,
//   pim: data.liveData.boxscore.teams.home.teamStats.pim,
//   shots: data.liveData.boxscore.teams.home.teamStats.shots,
//   faceOffWinPercentage:
//     data.liveData.boxscore.teams.home.teamStats.faceOffWinPercentage,
//   blockedShots: data.liveData.boxscore.teams.home.teamStats.blocked,
//   takeaways: data.liveData.boxscore.teams.home.teamStats.takeaways,
//   giveaways: data.liveData.boxscore.teams.home.teamStats.giveaways,
//   hits: data.liveData.boxscore.teams.home.teamStats.hits
// }

// simple pbp
// data.liveData.plays.allPlays.map(play => {
//   return {
//     period: play.about.ordinalNum,
//     time: play.about.periodTime,
//     result: play.result.description
//   };
// })

// goals
// data.liveData.plays.allPlays
//   .filter(playType => playType.result.event === "Goal")
//   .map(play => {
//     let assists;
//     if (play.players.length === 3) {
//       assists = play.players[1].player.fullName;
//     } else if (play.players.length === 4) {
//       assists = [
//         play.players[1].player.fullName,
//         play.players[2].player.fullName
//       ];
//     } else {
//       assists = "Unassisted";
//     }
//     return {
//       scorer: play.players[0].player.fullName,
//       assists: assists,
//       type: play.result.secondaryType,
//       strength: play.result.strength.name,
//       period: play.about.ordinalNum,
//       time: play.about.periodTime,
//       meta: {
//         coordinates: play.coordinates,
//         gwg: play.result.gameWinningGoal,
//         emptyNet: play.result.emptyNet
//       }
//     };
//   });

const getQuickview = async (gameId: number | string) => {
  try {
    const response = await nhlApi
      .getGame({ id: gameId })
      .then((data: any) => data.liveData.linescore)
      .then(linescore => {
        return {
          away: {
            team: {
              name: linescore.teams.away.team.name,
              abbreviation: linescore.teams.away.team.abbreviation
            },
            goals: linescore.teams.away.goals,
            powerPlay: linescore.teams.away.powerPlay,
            emptyNet: linescore.teams.away.goaliePulled
          },
          home: {
            team: {
              name: linescore.teams.home.team.name,
              abbreviation: linescore.teams.home.team.abbreviation
            },
            goals: linescore.teams.home.goals,
            powerPlay: linescore.teams.home.powerPlay,
            emptyNet: linescore.teams.home.goaliePulled
          },
          currentPeriod:
            linescore.currentPeriodTimeRemaining === "Final"
              ? "Final"
              : linescore.currentPeriodOrdinal
        };
      });
    return Promise.resolve(response);
  } catch (err) {
    return err;
  }
};

const nhlPbp = (gameId, arg) => {
  if (arg === "quickview") {
    return getQuickview(gameId);
  }
  return;
};

export default nhlPbp;
