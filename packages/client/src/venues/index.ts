import { get, throwError, Options } from "../util";

export default async function getVenues(options?: Options): Promise<void> {
  try {
    const response = await get("venues", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getVenues", err);
  }
}
