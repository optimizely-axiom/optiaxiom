import { ProteusElement } from "../proteus-element";
import { getProteusValue } from "./getProteusValue";
import {
  evaluateCondition,
  type ProteusCondition,
} from "./resolveProteusValue";

export function resolveProteusProp(
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

  if ("$type" in value && value.$type === "Zip" && "sources" in value) {
    const sources = (value as Record<string, unknown>).sources as Record<
      string,
      unknown
    >;
    const resolved: Record<string, unknown[]> = {};
    let length = 0;
    for (const [k, v] of Object.entries(sources)) {
      const arr = resolveProteusProp(v, data, parentPath);
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

  if (
    "$type" in value &&
    value.$type === "Show" &&
    "when" in value &&
    "children" in value
  ) {
    const conditions = Array.isArray(value.when) ? value.when : [value.when];
    const shouldShow = conditions.every(
      (condition: ProteusCondition | undefined) =>
        evaluateCondition(condition, data, parentPath),
    );
    if (!shouldShow) {
      return undefined;
    }
    return resolveProteusProp(value.children, data, parentPath);
  }

  return "$type" in value ||
    (Array.isArray(value) &&
      value.some((v) => v && typeof v === "object" && "$type" in v)) ? (
    <ProteusElement element={value} />
  ) : (
    value
  );
}
