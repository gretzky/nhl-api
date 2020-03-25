import { get, throwError, Options, handleUrl } from "../util";

export default async function getDivisions(options?: Options): Promise<void> {
  const baseUrl = handleUrl("divisions", options);

  try {
    const response = await get("divisions", baseUrl, options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getDivisions", err);
  }
}
