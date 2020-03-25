import { get, throwError, Options, handleUrl } from "../util";

export default async function getSeasons(options?: Options): Promise<void> {
  const baseUrl = handleUrl("seasons", options);

  try {
    const response = await get("seasons", baseUrl, options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getSeasons", err);
  }
}
