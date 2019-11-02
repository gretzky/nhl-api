import { get, throwError, Options } from "../util";

export default async function getPlayTypes(options?: Options): Promise<void> {
  try {
    const response = await get("playTypes", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getPlayTypes", err);
  }
}
