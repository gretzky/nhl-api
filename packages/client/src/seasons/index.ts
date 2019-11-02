import { get, throwError, Options } from "../util";

export default async function getSeasons(options?: Options): Promise<void> {
  try {
    const response = await get("seasons", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getSeasons", err);
  }
}
