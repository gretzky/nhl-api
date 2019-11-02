import { get, throwError, Options } from "../util";

export default async function getGame(options?: Options): Promise<void> {
  if (!options || !options.id) {
    throwError("getGame", "Must include a game ID.");
  }
  try {
    const response = await get("game", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getGame", err);
  }
}
