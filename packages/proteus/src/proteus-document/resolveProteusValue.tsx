import { getProteusValue } from "./getProteusValue";

export function resolveProteusValue(
  value: unknown,
  data: Record<string, unknown>,
  parentPath: string,
): unknown {
  if (typeof value !== "object" || value === null) {
    return value;
  }

  if (
    "$type" in value &&
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

  if (
    "$type" in value &&
    value.$type === "Map" &&
    "path" in value &&
    typeof value.path === "string" &&
    "children" in value
  ) {
    const array = getProteusValue(
      data,
      { path: value.path as string },
      parentPath,
    );
    if (!Array.isArray(array)) {
      return value;
    }
    const resolvedPath = (value.path as string).startsWith("/")
      ? (value.path as string)
      : `${parentPath}/${value.path as string}`;
    return array.map((_, index) =>
      resolveProteusValue(value.children, data, `${resolvedPath}/${index}`),
    );
  }

  return value;
}
