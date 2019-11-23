'use strict';

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var axios = _interopDefault(require('axios'));
var players = require('@nhl-api/players');
var teams = _interopDefault(require('@nhl-api/teams'));

// A type of promise-like that resolves synchronously and supports only one observer
var _iteratorSymbol =
  /*#__PURE__*/
  typeof Symbol !== 'undefined'
    ? Symbol.iterator ||
      (Symbol.iterator =
        /*#__PURE__*/
        Symbol('Symbol.iterator'))
    : '@@iterator'; // Asynchronously iterate through an object's values
var _asyncIteratorSymbol =
  /*#__PURE__*/
  typeof Symbol !== 'undefined'
    ? Symbol.asyncIterator ||
      (Symbol.asyncIterator =
        /*#__PURE__*/
        Symbol('Symbol.asyncIterator'))
    : '@@asyncIterator'; // Asynchronously iterate on a value using it's async iterator if present, or its synchronous iterator if missing

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
} // Asynchronously await a promise and pass the result to a finally continuation

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

var get = function get(url, options) {
  return Promise.resolve(
    _catch(
      function() {
        return Promise.resolve(
          api
            .get(
              url,
              options
                ? {
                    params: _extends({}, options),
                  }
                : undefined
            )
            .then(function(response) {
              return response.data;
            })
        ).then(Promise.resolve);
      },
      function(err) {
        return err;
      }
    )
  );
};
var api =
  /*#__PURE__*/
  axios.create({
    baseURL: 'https://statsapi.web.nhl.com/api/v1',
  });
var throwError = function throwError(fn, msg, err) {
  throw new Error('[NHL API]: ' + fn + '(): ' + (msg ? msg : err));
};
var handleUrl = function handleUrl(res, options) {
  if (options && options.id) {
    return '/' + res + '/' + options.id;
  }

  return '/' + res;
};

var getAwards = function getAwards(options) {
  try {
    var response;
    var url = handleUrl('awards', options);
    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url, options).then(function(data) {
              if (data.awards.length > 1) {
                return data.awards;
              }

              return data.awards[0];
            })
          ).then(function(_get$then) {
            response = _get$then;
            //const response = await get('awards', baseUrl, options).then(res => res);
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getAwards', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getConferences = function getConferences(options) {
  try {
    var response;
    var url = handleUrl('conferences', options);
    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url, options).then(function(data) {
              if (data.conferences.length > 1) {
                return data.conferences;
              }

              return data.conferences[0];
            })
          ).then(function(_get$then) {
            response = _get$then;
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getConferences', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getDivisions = function getDivisions(options) {
  try {
    var response;
    var url = handleUrl('divisions', options);
    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url, options).then(function(data) {
              if (data.divisions.length > 1) {
                return data.divisions;
              }

              return data.divisions[0];
            })
          ).then(function(_get$then) {
            response = _get$then;
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getDivisions', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getDraft = function getDraft(options) {
  try {
    var response;
    var baseUrl = handleUrl('draft', options);

    var url = function url() {
      return options && options.year ? baseUrl + '/' + options.year : baseUrl;
    };

    if (options && options.year && options.year.toString().length !== 4) {
      throwError('getDraft', 'Year must be a full, 4 digit number.');
    }

    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url(), options).then(function(data) {
              return data.drafts[0];
            })
          ).then(function(_get$then) {
            response = _get$then;
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getDraft', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getGame = function getGame(options) {
  try {
    var response;
    var baseUrl = handleUrl('game', options);
    var isFeed = options.type.includes('feed') || options.type.includes('live');

    var url = function url() {
      if (isFeed) {
        return baseUrl + '/feed/live';
      }

      return baseUrl + '/' + options.type;
    };

    if (!options || !options.id) {
      throwError('getGame', 'Must include a game ID.');
    }

    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url(), options).then(function(data) {
              if (isFeed) {
                return {
                  gamePk: data.gamePk,
                  link: data.link,
                  liveData: data.liveData,
                  gameData: data.gameData,
                };
              }

              return data;
            })
          ).then(function(_get$then) {
            response = _get$then;
            //const response = await get('game', url(), options).then(res => res);
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getGame', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getGameTypes = function getGameTypes(options) {
  try {
    var response;
    var url = handleUrl('gameTypes', options);
    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url, options).then(function(data) {
              return data;
            })
          ).then(function(_get$then) {
            response = _get$then;
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getGameTypes', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getPlayer = function getPlayer(options) {
  try {
    var response;

    if (!options.id && !options.name) {
      throwError('getPlayer', 'Must include a player name or ID as a param.');
    }

    if (options.season && options.season.toString().length !== 8) {
      throwError(
        'getPlayer',
        "Season must be formatted as both full years, i.e. '20192020'."
      );
    }

    var baseUrl = function baseUrl() {
      if (options.name) {
        var id = players.getPlayerId(options.name);

        if (Array.isArray(id)) {
          console.log(id);
          throwError(
            'getPlayer',
            'More than 1 player found. Check the console for a list of matching players and their ids.'
          );
        }

        return '/people/' + id;
      }

      return '/people/' + options.id;
    };

    var url = options.stats ? baseUrl() + '/stats' : baseUrl();

    var handleData = function handleData(data) {
      if (options.stats) {
        if (data.stats.length > 1) {
          // if we have more than 1 stat objects, return those
          return data.stats;
        } else if (data.stats[0].splits.length > 1) {
          // if we have 1 stat object, but multiple splits, return those
          return data.stats[0].splits;
        } // otherwise, return the single split object in the single stat array

        return data.stats[0].splits[0];
      }

      return data.people[0];
    };

    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url, options).then(function(data) {
              return handleData(data);
            })
          ).then(function(_get$then) {
            response = _get$then;
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getPlayer', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getPlayTypes = function getPlayTypes(options) {
  try {
    var response;
    var url = handleUrl('playTypes', options);
    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url, options).then(function(data) {
              return data;
            })
          ).then(function(_get$then) {
            response = _get$then;
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getPlayTypes', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getProspects = function getProspects(options) {
  try {
    var response;
    var url = handleUrl('draft/prospects', options);
    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url, options).then(function(data) {
              return data.prospects;
            })
          ).then(function(_get$then) {
            response = _get$then;
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getProspects', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getSchedule = function getSchedule(options) {
  try {
    var response;
    var url = handleUrl('schedule', options);

    if (options && options.expand) {
      options.expand = 'schedule.' + options.expand;
    }

    if (options && options.team) {
      var _Object$assign;

      if (typeof options.team === 'string' && options.team.length > 2) {
        options.team = teams.filter(function(team) {
          return team.name === options.team;
        })[0].id;
      }

      delete Object.assign(
        options,
        ((_Object$assign = {}),
        (_Object$assign['teamId'] = options['team']),
        _Object$assign)
      )['team'];
    }

    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url, options).then(function(data) {
              delete data.wait;
              return data;
            })
          ).then(function(_get$then) {
            response = _get$then;
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getSchedule', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getSeasons = function getSeasons(options) {
  try {
    var response;
    var baseUrl = '/seasons';

    var url = function url() {
      return options && options.season
        ? baseUrl + '/' + options.season
        : baseUrl;
    };

    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url(), options).then(function(data) {
              if (data.seasons.length > 1) {
                return data.seasons;
              }

              return data.seasons[0];
            })
          ).then(function(_get$then) {
            response = _get$then;
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getSeasons', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getStandings = function getStandings(options) {
  try {
    var response;
    var url = '/standings';

    if (options && options.expand) {
      options.expand = 'standings.' + options.expand;
    }

    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url, options).then(function(data) {
              return data.records;
            })
          ).then(function(_get$then) {
            response = _get$then;
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getStandings', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getStandingsTypes = function getStandingsTypes(options) {
  try {
    var response;
    var url = handleUrl('standingsTypes', options);
    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url, options).then(function(data) {
              return data;
            })
          ).then(function(_get$then) {
            response = _get$then;
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getStandingsTypes', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getTeams = function getTeams(options) {
  try {
    var response;

    if (options.season && options.season.toString().length !== 8) {
      throwError(
        'getTeams',
        "Season must be formatted as both full years, i.e. '20192020'."
      );
    }

    var id = options.name
      ? teams.filter(function(team) {
          return team.name === options.name;
        })[0].id
      : options.id;
    var baseUrl = options.id || options.name ? '/teams/' + id : '/teams';
    var url =
      options.expand && options.expand.includes('roster')
        ? baseUrl + '/roster'
        : options.expand && options.expand.includes('stats')
        ? baseUrl + '/stats'
        : baseUrl;

    if (options.expand) {
      options.expand = 'team.' + options.expand;
    }

    var activeTeams = teams.filter(function(team) {
      return team.isActive;
    });
    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url, options).then(function(data) {
              if (data.roster) {
                return data.roster;
              }

              if (data.stats) {
                return data.stats;
              }

              if (
                Array.isArray(data) &&
                data.some(function(d) {
                  return d.abbreviation;
                })
              ) {
                // if we've fetched all teams, merge the payload with the team objects from @nhl-api/teams to include other assets (logos, goal horns, etc.)
                return data.map(function(d, i) {
                  return Object.assign({}, d, activeTeams[i]);
                });
              } else if (data.hasOwnProperty('abbreviation')) {
                // do the same as above but for an individual team
                return Object.assign(
                  {},
                  data,
                  activeTeams.find(function(team) {
                    return team.id === data.id;
                  })
                );
              }

              return data;
            })
          ).then(function(_get$then) {
            response = _get$then;
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getTeams', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var getVenues = function getVenues(options) {
  try {
    var response;
    var url = handleUrl('venues', options);
    return Promise.resolve(
      _catch(
        function() {
          return Promise.resolve(
            get(url, options).then(function(data) {
              if (data.venues.length > 1) {
                return data.venues;
              }

              return data.venues[0];
            })
          ).then(function(_get$then) {
            response = _get$then;
            return Promise.resolve(response);
          });
        },
        function(err) {
          return throwError('getVenues', err);
        }
      )
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

var index = {
  getAwards: getAwards,
  getConferences: getConferences,
  getDivisions: getDivisions,
  getDraft: getDraft,
  getGame: getGame,
  getGameTypes: getGameTypes,
  getPlayer: getPlayer,
  getPlayTypes: getPlayTypes,
  getProspects: getProspects,
  getSchedule: getSchedule,
  getSeasons: getSeasons,
  getStandings: getStandings,
  getStandingsTypes: getStandingsTypes,
  getTeams: getTeams,
  getVenues: getVenues,
};

exports.default = index;
//# sourceMappingURL=client.cjs.development.js.map
