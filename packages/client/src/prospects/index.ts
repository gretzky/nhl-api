import { get, throwError, Options } from "../util";

export default async function getProspects(options?: Options): Promise<void> {
  try {
    const response = await get("draft/prospects", options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getProspects", err);
  }
}
