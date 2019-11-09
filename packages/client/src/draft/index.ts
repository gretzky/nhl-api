import { get, throwError, Options, handleUrl } from "../util";

export default async function getDraft(options?: Options): Promise<void> {
  const baseUrl = handleUrl("draft", options);
  let url;

  if (options && options.year) {
    url = `${baseUrl}/${options.year}`;
  } else {
    url = baseUrl;
  }

  if (options && options.year && options.year.toString().length !== 4) {
    throwError("getDraft", "Year must be a full, 4 digit number.");
  }

  try {
    const response = await get("draft", url, options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError("getDraft", err);
  }
}
