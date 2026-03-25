import { getProteusValue } from "./getProteusValue";

export type ProteusCondition =
  | { "!!": ComparisonValue }
  | { "!": ComparisonValue }
  | { "!=": ComparisonValue[] }
  | { "<": ComparisonValue[] }
  | { "<=": ComparisonValue[] }
  | { "==": ComparisonValue[] }
  | { ">": ComparisonValue[] }
  | { ">=": ComparisonValue[] }
  | { and: ProteusCondition[] }
  | { or: ProteusCondition[] };

type ComparisonValue =
  | boolean
  | null
  | number
  | string
  | { $type: "Value"; path: string };

export function evaluateCondition(
  condition: ProteusCondition | undefined,
  data: Record<string, unknown>,
  parentPath: string,
): boolean {
  if (!condition) {
    return true;
  }

  if ("and" in condition) {
    return condition.and.every((cond) =>
      evaluateCondition(cond, data, parentPath),
    );
  }

  if ("or" in condition) {
    return condition.or.some((cond) =>
      evaluateCondition(cond, data, parentPath),
    );
  }

  if ("!!" in condition) {
    const value = resolveProteusValue(condition["!!"], data, parentPath);
    return !!value;
  }

  if ("!" in condition) {
    const value = resolveProteusValue(condition["!"], data, parentPath);
    return !value;
  }

  if ("==" in condition) {
    const [left, right] = condition["=="];
    return (
      resolveProteusValue(left, data, parentPath) ===
      resolveProteusValue(right, data, parentPath)
    );
  } else if ("!=" in condition) {
    const [left, right] = condition["!="];
    return (
      resolveProteusValue(left, data, parentPath) !==
      resolveProteusValue(right, data, parentPath)
    );
  } else if ("<" in condition) {
    const [left, right] = condition["<"];
    const leftVal = resolveProteusValue(left, data, parentPath);
    const rightVal = resolveProteusValue(right, data, parentPath);
    return (
      typeof leftVal === "number" &&
      typeof rightVal === "number" &&
      leftVal < rightVal
    );
  } else if ("<=" in condition) {
    const [left, right] = condition["<="];
    const leftVal = resolveProteusValue(left, data, parentPath);
    const rightVal = resolveProteusValue(right, data, parentPath);
    return (
      typeof leftVal === "number" &&
      typeof rightVal === "number" &&
      leftVal <= rightVal
    );
  } else if (">" in condition) {
    const [left, right] = condition[">"];
    const leftVal = resolveProteusValue(left, data, parentPath);
    const rightVal = resolveProteusValue(right, data, parentPath);
    return (
      typeof leftVal === "number" &&
      typeof rightVal === "number" &&
      leftVal > rightVal
    );
  } else if (">=" in condition) {
    const [left, right] = condition[">="];
    const leftVal = resolveProteusValue(left, data, parentPath);
    const rightVal = resolveProteusValue(right, data, parentPath);
    return (
      typeof leftVal === "number" &&
      typeof rightVal === "number" &&
      leftVal >= rightVal
    );
  }

  return false;
}

export function resolveProteusValue(
  value: unknown,
  data: Record<string, unknown>,
  parentPath: string,
): unknown {
  if (typeof value !== "object" || value === null) {
    return value;
  }

  if ("$type" in value) {
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

    if (
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
      const items = array.map((_, index) =>
        resolveProteusValue(value.children, data, `${resolvedPath}/${index}`),
      );
      if ("separator" in value) {
        const sep = resolveProteusValue(value.separator, data, parentPath);
        return items.join(typeof sep === "string" ? sep : "");
      }
      return items;
    }

    if (value.$type === "Show" && "when" in value && "children" in value) {
      const conditions = Array.isArray(value.when) ? value.when : [value.when];
      const shouldShow = conditions.every(
        (condition: ProteusCondition | undefined) =>
          evaluateCondition(condition, data, parentPath),
      );
      if (!shouldShow) {
        return undefined;
      }
      return resolveProteusValue(value.children, data, parentPath);
    }

    if (value.$type === "Concat" && "children" in value) {
      if (!Array.isArray(value.children)) {
        return value;
      }
      return value.children
        .map((child: unknown) => resolveProteusValue(child, data, parentPath))
        .filter((v: unknown) => v !== undefined)
        .join("");
    }
  }

  return value;
}
