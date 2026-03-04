import { getProteusValue } from "./getProteusValue";

export function resolveProteusValue(
  value: unknown,
  data: Record<string, unknown>,
  parentPath: string,
): unknown {
  if (
    typeof value === "object" &&
    value !== null &&
    "$type" in value &&
    value.$type === "Value" &&
    "path" in value &&
    typeof value.path === "string"
  ) {
    return getProteusValue(data, value.path, parentPath);
  }
  return value;
}
