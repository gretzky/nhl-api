import { get, throwError, Options, handleUrl } from "../util";

export default async function getProspects(options?: Options): Promise<void> {
  const baseUrl = handleUrl("draft/prospects", options);

  try {
    const response = await get("draft/prospects", baseUrl, options).then(
      res => res
    );
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getProspects", err);
  }
}
