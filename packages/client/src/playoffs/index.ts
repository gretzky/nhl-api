import { get, throwError, Options } from "../util";

export default async function getPlayoffs(options?: Options): Promise<void> {
  try {
    const response = await get("tournaments/playoffs", options).then(
      res => res
    );
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getPlayoffs", err);
  }
}
