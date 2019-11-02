import { get, throwError, Options } from "../util";

export default async function getConferences(options?: Options): Promise<void> {
  try {
    const response = await get("conferences", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getConferences", err);
  }
}
