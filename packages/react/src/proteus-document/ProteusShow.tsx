import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { useProteusDocumentPathContext } from "./ProteusDocumentPathContext";
import { ProteusElement } from "./ProteusElement";
import { resolveProteusValue } from "./resolveProteusValue";

type ComparisonValue =
  | boolean
  | null
  | number
  | string
  | { $type: "Value"; path: string };

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

export function ProteusShow({
  children,
  when,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  when: ProteusCondition;
}) {
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
    const value = resolveProteusValue(condition["!!"], data, parentPath);
    return !!value;
  }

  // Handle comparison operators (only one per condition)
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

ProteusShow.displayName = "@optiaxiom/react/ProteusShow";
