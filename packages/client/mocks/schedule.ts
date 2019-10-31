export const next = [
  {
    id: 6,
    name: "Boston Bruins",
    link: "/api/v1/teams/6",
    venue: {
      id: 5085,
      name: "TD Garden",
      link: "/api/v1/venues/5085",
      city: "Boston",
      timeZone: {
        id: "America/New_York",
        offset: -4,
        tz: "EDT"
      }
    },
    abbreviation: "BOS",
    teamName: "Bruins",
    locationName: "Boston",
    firstYearOfPlay: "1924",
    division: {
      id: 17,
      name: "Atlantic",
      nameShort: "ATL",
      link: "/api/v1/divisions/17",
      abbreviation: "A"
    },
    conference: {
      id: 6,
      name: "Eastern",
      link: "/api/v1/conferences/6"
    },
    franchise: {
      franchiseId: 6,
      teamName: "Bruins",
      link: "/api/v1/franchises/6"
    },
    nextGameSchedule: {
      totalItems: 1,
      totalEvents: 0,
      totalGames: 1,
      totalMatches: 0,
      dates: [
        {
          date: "2019-11-02",
          totalItems: 1,
          totalEvents: 0,
          totalGames: 1,
          totalMatches: 0,
          games: [
            {
              gamePk: 2019020206,
              link: "/api/v1/game/2019020206/feed/live",
              gameType: "R",
              season: "20192020",
              gameDate: "2019-11-02T23:00:00Z",
              status: {
                abstractGameState: "Preview",
                codedGameState: "1",
                detailedState: "Scheduled",
                statusCode: "1",
                startTimeTBD: false
              },
              teams: {
                away: {
                  leagueRecord: {
                    wins: 3,
                    losses: 7,
                    ot: 1,
                    type: "league"
                  },
                  score: 0,
                  team: {
                    id: 9,
                    name: "Ottawa Senators",
                    link: "/api/v1/teams/9"
                  }
                },
                home: {
                  leagueRecord: {
                    wins: 9,
                    losses: 1,
                    ot: 2,
                    type: "league"
                  },
                  score: 0,
                  team: {
                    id: 6,
                    name: "Boston Bruins",
                    link: "/api/v1/teams/6"
                  }
                }
              },
              venue: {
                id: 5085,
                name: "TD Garden",
                link: "/api/v1/venues/5085"
              },
              content: {
                link: "/api/v1/game/2019020206/content"
              }
            }
          ],
          events: [],
          matches: []
        }
      ]
    },
    shortName: "Boston",
    officialSiteUrl: "http://www.bostonbruins.com/",
    franchiseId: 6,
    active: true
  }
];

export const prev = [
  {
    id: 6,
    name: "Boston Bruins",
    link: "/api/v1/teams/6",
    venue: {
      id: 5085,
      name: "TD Garden",
      link: "/api/v1/venues/5085",
      city: "Boston",
      timeZone: {
        id: "America/New_York",
        offset: -4,
        tz: "EDT"
      }
    },
    abbreviation: "BOS",
    teamName: "Bruins",
    locationName: "Boston",
    firstYearOfPlay: "1924",
    division: {
      id: 17,
      name: "Atlantic",
      nameShort: "ATL",
      link: "/api/v1/divisions/17",
      abbreviation: "A"
    },
    conference: {
      id: 6,
      name: "Eastern",
      link: "/api/v1/conferences/6"
    },
    franchise: {
      franchiseId: 6,
      teamName: "Bruins",
      link: "/api/v1/franchises/6"
    },
    previousGameSchedule: {
      totalItems: 1,
      totalEvents: 0,
      totalGames: 1,
      totalMatches: 0,
      dates: [
        {
          date: "2019-10-29",
          totalItems: 1,
          totalEvents: 0,
          totalGames: 1,
          totalMatches: 0,
          games: [
            {
              gamePk: 2019020179,
              link: "/api/v1/game/2019020179/feed/live",
              gameType: "R",
              season: "20192020",
              gameDate: "2019-10-29T23:00:00Z",
              status: {
                abstractGameState: "Final",
                codedGameState: "7",
                detailedState: "Final",
                statusCode: "7",
                startTimeTBD: false
              },
              teams: {
                away: {
                  leagueRecord: {
                    wins: 4,
                    losses: 8,
                    ot: 1,
                    type: "league"
                  },
                  score: 1,
                  team: {
                    id: 28,
                    name: "San Jose Sharks",
                    link: "/api/v1/teams/28"
                  }
                },
                home: {
                  leagueRecord: {
                    wins: 9,
                    losses: 1,
                    ot: 2,
                    type: "league"
                  },
                  score: 5,
                  team: {
                    id: 6,
                    name: "Boston Bruins",
                    link: "/api/v1/teams/6"
                  }
                }
              },
              venue: {
                id: 5085,
                name: "TD Garden",
                link: "/api/v1/venues/5085"
              },
              content: {
                link: "/api/v1/game/2019020179/content"
              }
            }
          ],
          events: [],
          matches: []
        }
      ]
    },
    shortName: "Boston",
    officialSiteUrl: "http://www.bostonbruins.com/",
    franchiseId: 6,
    active: true
  }
];
