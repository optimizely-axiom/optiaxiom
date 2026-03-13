import type { ReactNode } from "react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { resolveProteusValue } from "../proteus-document/resolveProteusValue";

export type ProteusShowProps = {
  children?: ReactNode;
  /**
   * Single condition or array of conditions (AND logic). Each condition is an
   * object with one operator key.
   */
  when: ProteusCondition;
};

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

export function ProteusShow({ children, when }: ProteusShowProps) {
  const { data } = useProteusDocumentContext("@optiaxiom/proteus/ProteusShow");
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusShow",
  );

  const conditions = Array.isArray(when) ? when : [when];
  // All conditions must be true (AND logic)
  const shouldShow = conditions.every((condition) =>
    evaluateCondition(condition, data, parentPath),
  );

  if (!shouldShow) {
    return null;
  }

  return <>{children}</>;
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

ProteusShow.displayName = "@optiaxiom/proteus/ProteusShow";
