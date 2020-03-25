import { get, throwError, Options, handleUrl } from "../util";

export default async function getPlayTypes(options?: Options): Promise<void> {
  const baseUrl = handleUrl("playTypes", options);

  try {
    const response = await get("playTypes", baseUrl, options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getPlayTypes", err);
  }
}
