import { get, throwError, Options, handleUrl } from "../util";

export default async function getVenues(options?: Options): Promise<void> {
  const baseUrl = handleUrl("venues", options);

  try {
    const response = await get("venues", baseUrl, options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getVenues", err);
  }
}
