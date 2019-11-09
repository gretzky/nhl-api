import { get, throwError, Options, handleUrl } from "../util";

export default async function getStandings(options?: Options): Promise<void> {
  const baseUrl = handleUrl("standings", options);

  if (options && options.expand) {
    options.expand = `standings.${options.expand}`;
  }

  try {
    const response = await get("standings", baseUrl, options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getStandings", err);
  }
}
