import { get, throwError, Options, handleUrl } from "../util";

export default async function getAwards(options?: Options): Promise<void> {
  const baseUrl = handleUrl("awards", options);

  try {
    const response = await get("awards", baseUrl, options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getAwards", err);
  }
}
