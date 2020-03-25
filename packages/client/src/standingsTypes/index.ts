import { get, throwError, Options, handleUrl } from "../util";

export default async function getStandingsTypes(
  options?: Options
): Promise<void> {
  const baseUrl = handleUrl("standingsTypes", options);

  try {
    const response = await get("standingsTypes", baseUrl, options).then(
      res => res
    );
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getStandingsTypes", err);
  }
}
