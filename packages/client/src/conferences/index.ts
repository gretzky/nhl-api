import { get, throwError, Options, handleUrl } from "../util";

export default async function getConferences(options?: Options): Promise<void> {
  const baseUrl = handleUrl("conferences", options);

  try {
    const response = await get("conferences", baseUrl, options).then(
      res => res
    );
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getConferences", err);
  }
}
