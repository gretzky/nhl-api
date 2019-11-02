import { get, throwError, Options } from "../util";

export default async function getPlayer(options?: Options): Promise<void> {
  if (!options || (!options.id && !options.name)) {
    throwError(
      "getPlayer",
      "Must include a player ID, name, or nickname as a param."
    );
  }
  if (options.season && options.season.toString().length !== 8) {
    throwError(
      "getPlayer",
      `Season must be formatted as both full years, i.e. '20192020'.`
    );
  }
  try {
    const response = await get("people", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getPlayer", err);
  }
}
