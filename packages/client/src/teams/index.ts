import teams from "@nhl-api/teams";
import { AxiosResponse } from "axios";
import { api, throwError, Options, handleUrl, handleData } from "../util";

export default async function getTeams(options?: Options): Promise<any> {
  const baseUrl = handleUrl("teams", options);
  let url = baseUrl;

  if (options && options.expand) {
    options.expand = `team.${options.expand}`;
  }

  const toTitleCase = (str: string): string =>
    str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
    );

  const formattedTeams = teams.map(team => {
    return {
      ...team,
      name: toTitleCase(team.name)
    };
  });

  try {
    const response = await api
      .get(
        url,
        options
          ? {
              params: {
                ...options
              }
            }
          : null
      )
      .then((response: AxiosResponse) => handleData("teams", response.data))
      .then((data: any) => {
        if (Array.isArray(data) && data.some(d => d.abbreviation)) {
          return data.map((d, i) => Object.assign({}, d, formattedTeams[i]));
        } else if (data.hasOwnProperty("abbreviation")) {
          return Object.assign(
            {},
            data,
            formattedTeams.find(t => t.id === data.id)
          );
        } else {
          return data;
        }
      });
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getTeams", err);
  }
}
