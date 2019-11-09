import { get, throwError, Options, handleUrl } from "../util";

export default async function getPlayoffs(options?: Options): Promise<void> {
  const baseUrl = handleUrl("tournaments/playoffs", options);

  try {
    const response = await get("tournaments/playoffs", baseUrl, options).then(
      res => res
    );
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getPlayoffs", err);
  }
}
