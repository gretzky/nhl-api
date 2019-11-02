import { get, throwError, Options } from "../util";

export default async function getStandings(options?: Options): Promise<void> {
  try {
    const response = await get("standings", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getStandings", err);
  }
}
