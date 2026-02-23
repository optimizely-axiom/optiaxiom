import { get } from "jsonpointer";

export function getProteusValue(
  data: Record<string, unknown>,
  path: string,
  parentPath: string,
) {
  try {
    return get(data, path.startsWith("/") ? path : `${parentPath}/${path}`);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        `[optiaxiom][react][useProteusValue] Invalid path "${path}":`,
        error,
      );
    }
    return null;
  }
}
