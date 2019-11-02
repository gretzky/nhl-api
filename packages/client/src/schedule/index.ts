import { get, throwError, Options } from "../util";

export default async function getSchedule(options?: Options): Promise<void> {
  try {
    const response = await get("schedule", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getSchedule", err);
  }
}
