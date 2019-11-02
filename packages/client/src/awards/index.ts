import { get, throwError, Options } from "../util";

export default async function getAwards(options?: Options): Promise<void> {
  try {
    const response = await get("awards", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getAwards", err);
  }
}
