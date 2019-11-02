import { get, throwError, Options } from "../util";

export default async function getDivisions(options?: Options): Promise<void> {
  try {
    const response = await get("divisions", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getDivisions", err);
  }
}
