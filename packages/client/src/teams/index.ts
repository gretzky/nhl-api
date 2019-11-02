import { get, throwError, Options } from "../util";

export default async function getTeams(options?: Options): Promise<void> {
  try {
    const response = await get("teams", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getTeams", err);
  }
}
