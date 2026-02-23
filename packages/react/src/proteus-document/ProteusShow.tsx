import { getProteusValue } from "./getProteusValue";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { useProteusDocumentPathContext } from "./ProteusDocumentPathContext";
import { ProteusElement } from "./ProteusElement";
import { type ProteusShowProps, type ProteusValueProps } from "./schemas";

type ComparisonValue = boolean | null | number | ProteusValueProps | string;

type ProteusCondition =
  | { "!!": ComparisonValue }
  | { "!=": ComparisonValue[] }
  | { "<": ComparisonValue[] }
  | { "<=": ComparisonValue[] }
  | { "==": ComparisonValue[] }
  | { ">": ComparisonValue[] }
  | { ">=": ComparisonValue[] }
  | { and: ProteusCondition[] }
  | { or: ProteusCondition[] };

export function ProteusShow({ children, when }: ProteusShowProps) {
  const { data } = useProteusDocumentContext("@optiaxiom/react/ProteusShow");
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/react/ProteusShow",
  );

  const conditions = Array.isArray(when) ? when : [when];
  // All conditions must be true (AND logic)
  const shouldShow = conditions.every((condition) =>
    evaluateCondition(condition, data, parentPath),
  );

  if (!shouldShow) {
    return null;
  }

  return <ProteusElement element={children} />;
}

function evaluateCondition(
  condition: ProteusCondition | undefined,
  data: Record<string, unknown>,
  parentPath: string,
): boolean {
  if (!condition) {
    return true;
  }

  // Handle "and" operator
  if ("and" in condition) {
    return condition.and.every((cond) =>
      evaluateCondition(cond, data, parentPath),
    );
  }

  // Handle "or" operator
  if ("or" in condition) {
    return condition.or.some((cond) =>
      evaluateCondition(cond, data, parentPath),
    );
  }

  // Handle logical NOT operator (truthy check)
  if ("!!" in condition) {
    const value = resolveValue(condition["!!"], data, parentPath);
    return !!value;
  }

  // Handle comparison operators (only one per condition)
  if ("==" in condition) {
    const [left, right] = condition["=="];
    return (
      resolveValue(left, data, parentPath) ===
      resolveValue(right, data, parentPath)
    );
  } else if ("!=" in condition) {
    const [left, right] = condition["!="];
    return (
      resolveValue(left, data, parentPath) !==
      resolveValue(right, data, parentPath)
    );
  } else if ("<" in condition) {
    const [left, right] = condition["<"];
    const leftVal = resolveValue(left, data, parentPath);
    const rightVal = resolveValue(right, data, parentPath);
    return (
      typeof leftVal === "number" &&
      typeof rightVal === "number" &&
      leftVal < rightVal
    );
  } else if ("<=" in condition) {
    const [left, right] = condition["<="];
    const leftVal = resolveValue(left, data, parentPath);
    const rightVal = resolveValue(right, data, parentPath);
    return (
      typeof leftVal === "number" &&
      typeof rightVal === "number" &&
      leftVal <= rightVal
    );
  } else if (">" in condition) {
    const [left, right] = condition[">"];
    const leftVal = resolveValue(left, data, parentPath);
    const rightVal = resolveValue(right, data, parentPath);
    return (
      typeof leftVal === "number" &&
      typeof rightVal === "number" &&
      leftVal > rightVal
    );
  } else if (">=" in condition) {
    const [left, right] = condition[">="];
    const leftVal = resolveValue(left, data, parentPath);
    const rightVal = resolveValue(right, data, parentPath);
    return (
      typeof leftVal === "number" &&
      typeof rightVal === "number" &&
      leftVal >= rightVal
    );
  }

  return false;
}

function resolveValue(
  value: unknown,
  data: Record<string, unknown>,
  parentPath: string,
): unknown {
  // If value is a Proteus.Value reference object
  if (
    typeof value === "object" &&
    value !== null &&
    "$type" in value &&
    value.$type === "Proteus.Value" &&
    "path" in value &&
    typeof value.path === "string"
  ) {
    return getProteusValue(data, value.path, parentPath);
  }
  return value;
}

ProteusShow.displayName = "@optiaxiom/react/ProteusShow";
