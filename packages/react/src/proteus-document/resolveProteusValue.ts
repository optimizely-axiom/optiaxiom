import { getProteusValue } from "./getProteusValue";

export function resolveProteusValue(
  value: unknown,
  data: Record<string, unknown>,
  parentPath: string,
): unknown {
  if (typeof value !== "object" || value === null || !("$type" in value)) {
    return value;
  }

  if (
    value.$type === "Value" &&
    "path" in value &&
    typeof value.path === "string"
  ) {
    return getProteusValue(
      data,
      value as Parameters<typeof getProteusValue>[1],
      parentPath,
    );
  }

  if (value.$type === "Zip" && "sources" in value) {
    const sources = (value as Record<string, unknown>).sources as Record<
      string,
      unknown
    >;
    const resolved: Record<string, unknown[]> = {};
    let length = 0;
    for (const [k, v] of Object.entries(sources)) {
      const arr = resolveProteusValue(v, data, parentPath);
      if (Array.isArray(arr)) {
        resolved[k] = arr;
        length = Math.max(length, arr.length);
      }
    }
    return Array.from({ length }, (_, i) => {
      const row: Record<string, unknown> = {};
      for (const [k, arr] of Object.entries(resolved)) {
        row[k] = arr[i];
      }
      return row;
    });
  }

  return value;
}
