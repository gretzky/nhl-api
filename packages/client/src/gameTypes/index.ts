import { get, throwError, Options } from "../util";

export default async function getGameTypes(options?: Options): Promise<void> {
  try {
    const response = await get("gameTypes", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getGameTypes", err);
  }
}
