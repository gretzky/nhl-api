import axios from 'axios';
import { getPlayerId } from '@nhl-api/players';
import teams from '@nhl-api/teams';

// A type of promise-like that resolves synchronously and supports only one observer
var _iteratorSymbol =
/*#__PURE__*/
typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator =
/*#__PURE__*/
Symbol("Symbol.iterator")) : "@@iterator"; // Asynchronously iterate through an object's values
var _asyncIteratorSymbol =
/*#__PURE__*/
typeof Symbol !== "undefined" ? Symbol.asyncIterator || (Symbol.asyncIterator =
/*#__PURE__*/
Symbol("Symbol.asyncIterator")) : "@@asyncIterator"; // Asynchronously iterate on a value using it's async iterator if present, or its synchronous iterator if missing

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
  _extends = Object.assign || function (target) {
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

var get = function get(url, res, options) {
  return Promise.resolve(_catch(function () {
    return Promise.resolve(api.get(url, options ? {
      params: _extends({}, options)
    } : undefined).then(function (response) {
      return response.data;
    }).then(function (data) {
      if (data.hasOwnProperty(res)) {
        return parseData(data[res]);
      }

      return data;
    })).then(Promise.resolve);
  }, function (err) {
    return err;
  }));
};
var api =
/*#__PURE__*/
axios.create({
  baseURL: 'https://statsapi.web.nhl.com/api/v1'
});
var throwError = function throwError(fn, msg, err) {
  throw new Error("[NHL API]: " + fn + "(): " + (msg ? msg : err));
};
var handleUrl = function handleUrl(res, options) {
  if (options && options.id) {
    return "/" + res + "/" + options.id;
  }

  return "/" + res;
};

var parseData = function parseData(res) {
  if (Array.isArray(res) && res.length === 1) {
    return res[0];
  }

  return res;
};

var getAwards = function getAwards(options) {
  try {
    var response;
    var url = handleUrl('awards', options);
    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url, 'awards', options).then(function (res) {
        return res;
      })).then(function (_get$then) {
        response = _get$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getAwards', err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var getConferences = function getConferences(options) {
  try {
    var response;
    var url = handleUrl('conferences', options);
    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url, 'conferences', options).then(function (res) {
        return res;
      })).then(function (_get$then) {
        response = _get$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getConferences', err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var getDivisions = function getDivisions(options) {
  try {
    var response;
    var url = handleUrl('divisions', options);
    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url, 'divisions', options).then(function (res) {
        return res;
      })).then(function (_get$then) {
        response = _get$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getDivisions', err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var getDraft = function getDraft(options) {
  try {
    var response;
    var baseUrl = handleUrl('draft', options);

    var url = function url() {
      return options && options.year ? baseUrl + "/" + options.year : baseUrl;
    };

    if (options && options.year && options.year.toString().length !== 4) {
      throwError('getDraft', 'Year must be a full, 4 digit number.');
    }

    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url(), 'drafts', options).then(function (res) {
        return res;
      })).then(function (_get$then) {
        response = _get$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getDraft', err);
    }));
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
        return baseUrl + "/feed/live";
      }

      return baseUrl + "/" + options.type;
    };

    if (!options || !options.id) {
      throwError('getGame', 'Must include a game ID.');
    }

    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url(), undefined, options).then(function (data) {
        if (isFeed) {
          return {
            gamePk: data.gamePk,
            link: data.link,
            liveData: data.liveData,
            gameData: data.gameData
          };
        }

        return data;
      })).then(function (_get$then) {
        response = _get$then;
        //const response = await get('game', url(), options).then(res => res);
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getGame', err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var getGameTypes = function getGameTypes(options) {
  try {
    var response;
    var url = handleUrl('gameTypes', options);
    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url, 'gameTypes', options).then(function (res) {
        return res;
      })).then(function (_get$then) {
        response = _get$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getGameTypes', err);
    }));
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
      throwError('getPlayer', "Season must be formatted as both full years, i.e. '20192020'.");
    }

    var baseUrl = function baseUrl() {
      if (options.name) {
        var id = getPlayerId(options.name);

        if (Array.isArray(id)) {
          console.log(id);
          throwError('getPlayer', 'More than 1 player found. Check the console for a list of matching players and their ids.');
        }

        return "/people/" + id;
      }

      return "/people/" + options.id;
    };

    var url = options.stats ? baseUrl() + "/stats" : baseUrl();
    var res = options.stats ? 'stats' : 'people';
    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url, res, options).then(function (data) {
        return data;
      })).then(function (_get$then) {
        response = _get$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getPlayer', err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var getPlayTypes = function getPlayTypes(options) {
  try {
    var response;
    var url = handleUrl('playTypes', options);
    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url, 'playTypes', options).then(function (data) {
        return data;
      })).then(function (_get$then) {
        response = _get$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getPlayTypes', err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var getProspects = function getProspects(options) {
  try {
    var response;
    var url = handleUrl('draft/prospects', options);
    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url, 'prospects', options).then(function (res) {
        return res;
      })).then(function (_get$then) {
        response = _get$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getProspects', err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var getSchedule = function getSchedule(options) {
  try {
    var response;
    var url = handleUrl('schedule', options);

    if (options && options.expand) {
      options.expand = "schedule." + options.expand;
    }

    if (options && options.team) {
      var _Object$assign;

      if (typeof options.team === 'string' && options.team.length > 2) {
        options.team = teams.filter(function (team) {
          return team.name === options.team;
        })[0].id;
      }

      delete Object.assign(options, (_Object$assign = {}, _Object$assign['teamId'] = options['team'], _Object$assign))['team'];
    }

    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url, 'dates', options).then(function (data) {
        return data;
      })).then(function (_get$then) {
        response = _get$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getSchedule', err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var getSeasons = function getSeasons(options) {
  try {
    var response;
    var baseUrl = "/seasons";

    var url = function url() {
      return options && options.season ? baseUrl + "/" + options.season : baseUrl;
    };

    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url(), 'seasons', options).then(function (res) {
        return res;
      })).then(function (_get$then) {
        response = _get$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getSeasons', err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var getStandings = function getStandings(options) {
  try {
    var response;
    var url = "/standings";

    if (options && options.expand) {
      options.expand = "standings." + options.expand;
    }

    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url, 'standings', options).then(function (data) {
        return data.records;
      })).then(function (_get$then) {
        response = _get$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getStandings', err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var getStandingsTypes = function getStandingsTypes(options) {
  try {
    var response;
    var url = handleUrl('standingsTypes', options);
    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url, 'standingsTypes', options).then(function (data) {
        return data;
      })).then(function (_get$then) {
        response = _get$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getStandingsTypes', err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var getTeams = function getTeams(options) {
  try {
    var response;

    if (options && options.season && options.season.toString().length !== 8) {
      throwError('getTeams', "Season must be formatted as both full years, i.e. '20192020'.");
    }

    var id = options && options.name ? teams.filter(function (team) {
      return team.name === options.name;
    })[0].id : options && options.id;
    var baseUrl = options && options.id || options && options.name ? "/teams/" + id : "/teams";
    var url = options && options.expand && options.expand.includes('roster') ? baseUrl + "/roster" : options && options.expand && options.expand.includes('stats') ? baseUrl + "/stats" : baseUrl;

    if (options && options.expand) {
      options.expand = "team." + options.expand;
    }

    var activeTeams = teams.filter(function (team) {
      return team.isActive;
    });
    return Promise.resolve(_catch(function () {
      return Promise.resolve(api /// @ts-ignore
      .get(url, options ? {
        params: _extends({}, options)
      } : null).then(function (response) {
        return response.data;
      }).then(function (data) {
        if (data.roster) {
          return data.roster;
        }

        if (data.stats) {
          return data.stats.length > 1 ? data.stats : data.stats[0];
        }

        if (data.teams.length > 1 && data.teams.some(function (d) {
          return d.abbreviation;
        })) {
          return data.teams.map(function (d, i) {
            return Object.assign({}, d, activeTeams[i]);
          });
        }

        if (data.teams[0].hasOwnProperty('abbreviation')) {
          return Object.assign({}, data.teams[0], activeTeams.find(function (team) {
            return team.id === data.teams[0].id;
          }));
        }

        return data;
      })).then(function (_api$get$then$then) {
        response = _api$get$then$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getTeams', err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var getVenues = function getVenues(options) {
  try {
    var response;
    var url = handleUrl('venues', options);
    return Promise.resolve(_catch(function () {
      return Promise.resolve(get(url, 'venues', options).then(function (res) {
        return res;
      })).then(function (_get$then) {
        response = _get$then;
        return Promise.resolve(response);
      });
    }, function (err) {
      return throwError('getVenues', err);
    }));
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
  getVenues: getVenues
};

export default index;
//# sourceMappingURL=client.esm.js.map
