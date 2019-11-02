import { get, throwError, Options } from "../util";

export default async function getDraft(options?: Options): Promise<void> {
  if (options && options.year && options.year.toString().length !== 4) {
    throwError("getDraft", "Year must be a full, 4 digit number.");
  }
  try {
    const response = await get("draft", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getDraft", err);
  }
}
