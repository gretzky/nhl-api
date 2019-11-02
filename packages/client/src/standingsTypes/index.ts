import { get, throwError, Options } from "../util";

export default async function getStandingsTypes(
  options?: Options
): Promise<void> {
  try {
    const response = await get("standingsTypes", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getStandingsTypes", err);
  }
}
