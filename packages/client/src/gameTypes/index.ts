import { get, throwError, Options, handleUrl } from "../util";

export default async function getGameTypes(options?: Options): Promise<void> {
  const baseUrl = handleUrl("gameTypes", options);

  try {
    const response = await get("gameTypes", baseUrl, options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getGameTypes", err);
  }
}
