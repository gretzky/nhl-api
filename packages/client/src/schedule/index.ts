import teams from "@nhl-api/teams";
import { get, throwError, Options, handleUrl, getId } from "../util";

export default async function getSchedule(options?: Options): Promise<void> {
  const baseUrl = handleUrl("schedule", options);

  if (options && options.expand) {
    options.expand = `schedule.${options.expand}`;
  }

  if (options && options.team) {
    if (typeof options.team === "string" && options.team.length > 2) {
      options.team = getId(teams, options.team);
    }
    delete Object.assign(options, { ["teamId"]: options["team"] })["team"];
  }

  try {
    const response = await get("schedule", baseUrl, options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getSchedule", err);
  }
}
