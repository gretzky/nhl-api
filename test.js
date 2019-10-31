const axios = require("axios");

const api = axios.create({
  baseURL: "https://statsapi.web.nhl.com/api/v1"
});

const getId = name => {
  if (name === "bruins") {
    return 6;
  }
};

const parseData = res => {
  if (Array.isArray(res) && res.length === 1) {
    return res[0];
  }
  return res;
};

const handleUrl = (res, options) => {
  if (options.id || options.name) {
    return `/${res}/${options.name ? getId(options.name) : options.id}`;
  }
  return `/${res}`;
};

const handleData = (res, data) => {
  if (data.roster) {
    return parseData(data.roster);
  } else if (data.stats) {
    return parseData(data.stats);
  } else {
    return parseData(data[res]);
  }
};

const handleBaseParams = options => {
  return {
    expand: options.expand,
    stats: options.stats,
    season: options.season,
    date: options.date
  };
};

async function getTeams(options) {
  const getUrl = () => {
    let url;
    const baseUrl = handleUrl("teams", options);
    if (options.expand === "roster") {
      url = `${baseUrl}/roster`;
    } else if (options.expand === "stats") {
      url = `${baseUrl}/stats`;
    } else {
      url = baseUrl;
    }
    return url;
  };

  try {
    const response = await api
      .get(
        getUrl(),
        options
          ? {
              params: {
                ...handleBaseParams(options)
              }
            }
          : null
      )
      .then(res => console.log(handleData("teams", res.data)));
    return Promise.resolve(response);
  } catch (e) {
    return e;
  }
}

async function get(res, options) {
  const getUrl = () => {
    let url;
    const baseUrl = handleUrl(res, options);
    if (options.expand === "roster") {
      url = `${baseUrl}/roster`;
    } else if (options.expand === "stats") {
      url = `${baseUrl}/stats`;
    } else {
      url = baseUrl;
    }
    return url;
  };

  const { id, name, expand, stats, season, date, ...rest } = options;

  try {
    const response = await api
      .get(
        getUrl(),
        options
          ? {
              params: {
                ...handleBaseParams(options),
                ...rest
              }
            }
          : null
      )
      .then(response => handleData(res, response.data));
    return Promise.resolve(response);
  } catch (e) {
    return e;
  }
}

async function getPlayer(options) {
  try {
    const response = await get("people", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return err;
  }
}

// async function getPlayer(options) {
//   const getUrl = () => {
//     let url;
//     const baseUrl = handleUrl("people", options);
//     if (options.stats) {
//       url = `${baseUrl}/stats`;
//     } else {
//       url = baseUrl;
//     }
//     return url;
//   };

//   try {
//     const response = await api
//       .get(
//         getUrl(),
//         options
//           ? {
//               params: {
//                 ...handleBaseParams(options)
//               }
//             }
//           : null
//       )
//       .then(res => console.log(handleData("people", res.data)));
//     return Promise.resolve(response);
//   } catch (e) {
//     return e;
//   }
// }

// getTeam({ id: 6, expand: "stats", season: "20102011" }).then(data =>
//   console.log(data)
// );
getPlayer({ id: 8477474 }).then(data => console.log(data));
