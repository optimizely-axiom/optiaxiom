import { getDataTableRowValue } from "../proteus-data-table-row/ProteusDataTableRow";
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
  | { $type: "DataTableRow"; path?: string }
  | { $type: "Length"; path: string }
  | { $type: "MapIndex" }
  | { $type: "Value"; path: string };

export function evaluateCondition(
  condition: ProteusCondition | undefined,
  data: Record<string, unknown>,
  parentPath: string,
  mapIndices: number[] = [],
  dataTableRow?: Record<string, unknown>,
): boolean {
  if (!condition) {
    return true;
  }

  if ("and" in condition) {
    return condition.and.every((cond) =>
      evaluateCondition(cond, data, parentPath, mapIndices, dataTableRow),
    );
  }

  if ("or" in condition) {
    return condition.or.some((cond) =>
      evaluateCondition(cond, data, parentPath, mapIndices, dataTableRow),
    );
  }

  if ("!!" in condition) {
    const value = resolveProteusValue(
      condition["!!"],
      data,
      parentPath,
      mapIndices,
      dataTableRow,
    );
    return !!value;
  }

  if ("!" in condition) {
    const value = resolveProteusValue(
      condition["!"],
      data,
      parentPath,
      mapIndices,
      dataTableRow,
    );
    return !value;
  }

  if ("==" in condition) {
    const [left, right] = condition["=="];
    return (
      resolveProteusValue(left, data, parentPath, mapIndices, dataTableRow) ===
      resolveProteusValue(right, data, parentPath, mapIndices, dataTableRow)
    );
  } else if ("!=" in condition) {
    const [left, right] = condition["!="];
    return (
      resolveProteusValue(left, data, parentPath, mapIndices, dataTableRow) !==
      resolveProteusValue(right, data, parentPath, mapIndices, dataTableRow)
    );
  } else if ("<" in condition) {
    const [left, right] = condition["<"];
    const leftVal = resolveProteusValue(
      left,
      data,
      parentPath,
      mapIndices,
      dataTableRow,
    );
    const rightVal = resolveProteusValue(
      right,
      data,
      parentPath,
      mapIndices,
      dataTableRow,
    );
    return (
      typeof leftVal === "number" &&
      typeof rightVal === "number" &&
      leftVal < rightVal
    );
  } else if ("<=" in condition) {
    const [left, right] = condition["<="];
    const leftVal = resolveProteusValue(
      left,
      data,
      parentPath,
      mapIndices,
      dataTableRow,
    );
    const rightVal = resolveProteusValue(
      right,
      data,
      parentPath,
      mapIndices,
      dataTableRow,
    );
    return (
      typeof leftVal === "number" &&
      typeof rightVal === "number" &&
      leftVal <= rightVal
    );
  } else if (">" in condition) {
    const [left, right] = condition[">"];
    const leftVal = resolveProteusValue(
      left,
      data,
      parentPath,
      mapIndices,
      dataTableRow,
    );
    const rightVal = resolveProteusValue(
      right,
      data,
      parentPath,
      mapIndices,
      dataTableRow,
    );
    return (
      typeof leftVal === "number" &&
      typeof rightVal === "number" &&
      leftVal > rightVal
    );
  } else if (">=" in condition) {
    const [left, right] = condition[">="];
    const leftVal = resolveProteusValue(
      left,
      data,
      parentPath,
      mapIndices,
      dataTableRow,
    );
    const rightVal = resolveProteusValue(
      right,
      data,
      parentPath,
      mapIndices,
      dataTableRow,
    );
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
  mapIndices: number[] = [],
  dataTableRow?: Record<string, unknown>,
): unknown {
  if (typeof value !== "object" || value === null) {
    return value;
  }

  if ("$type" in value) {
    if (value.$type === "MapIndex") {
      return mapIndices.at(-1);
    }

    if (value.$type === "DataTableRow") {
      return getDataTableRowValue(
        dataTableRow,
        "path" in value && typeof value.path === "string"
          ? value.path
          : undefined,
      );
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

    if (
      value.$type === "Length" &&
      "path" in value &&
      typeof value.path === "string"
    ) {
      const arr = getProteusValue(data, { path: value.path }, parentPath);
      return Array.isArray(arr) ? arr.length : 0;
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
      const items = array
        .map((_, index) =>
          resolveProteusValue(
            value.children,
            data,
            `${resolvedPath}/${index}`,
            [...mapIndices, index],
            dataTableRow,
          ),
        )
        .filter((v: unknown) => v !== undefined);
      const result = "flat" in value && value.flat ? items.flat() : items;
      if ("separator" in value) {
        const sep = resolveProteusValue(
          value.separator,
          data,
          parentPath,
          mapIndices,
          dataTableRow,
        );
        return result.join(typeof sep === "string" ? sep : "");
      }
      return result;
    }

    if (value.$type === "Show" && "when" in value && "children" in value) {
      const conditions = Array.isArray(value.when) ? value.when : [value.when];
      const shouldShow = conditions.every(
        (condition: ProteusCondition | undefined) =>
          evaluateCondition(
            condition,
            data,
            parentPath,
            mapIndices,
            dataTableRow,
          ),
      );
      if (!shouldShow) {
        return undefined;
      }
      return resolveProteusValue(
        value.children,
        data,
        parentPath,
        mapIndices,
        dataTableRow,
      );
    }

    if (value.$type === "Concat" && "children" in value) {
      if (!Array.isArray(value.children)) {
        return value;
      }
      return value.children
        .map((child: unknown) =>
          resolveProteusValue(
            child,
            data,
            parentPath,
            mapIndices,
            dataTableRow,
          ),
        )
        .filter((v: unknown) => v !== undefined)
        .join("");
    }

    return value;
  }

  if (Array.isArray(value)) {
    return value
      .map((v) =>
        resolveProteusValue(v, data, parentPath, mapIndices, dataTableRow),
      )
      .filter((v) => v !== undefined);
  }

  const resolved: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value)) {
    const r = resolveProteusValue(
      v,
      data,
      parentPath,
      mapIndices,
      dataTableRow,
    );
    if (r !== undefined) resolved[k] = r;
  }
  return resolved;
}
