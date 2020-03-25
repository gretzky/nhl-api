import { get, throwError, Options, handleUrl } from "../util";

export default async function getGame(options?: Options): Promise<void> {
  const baseUrl = handleUrl("game", options);
  let url;

  if (
    (options && options.type && options.type.includes("feed")) ||
    (options && options.type && options.type.includes("live"))
  ) {
    url = `${baseUrl}/feed/live`;
  } else if (options && options.type && options.type === "boxscore") {
    url = `${baseUrl}/boxscore`;
  } else if (options && options.type && options.type === "linescore") {
    url = `${baseUrl}/linescore`;
  } else if (options && options.type && options.type === "content") {
    url = `${baseUrl}/content`;
  } else if (options && options.year) {
    url = `${baseUrl}/${options.year}`;
  } else {
    url = baseUrl;
  }

  if (!options || !options.id) {
    throwError("getGame", "Must include a game ID.");
  }

  try {
    const response = await get("game", url, options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getGame", err);
  }
}
