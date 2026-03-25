import type { ReactNode } from "react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import {
  evaluateCondition,
  type ProteusCondition,
} from "../proteus-document/resolveProteusValue";

export type ProteusShowProps = {
  children?: ReactNode;
  /**
   * Single condition or array of conditions (AND logic). Each condition is an
   * object with one operator key.
   */
  when: ProteusCondition;
};

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

ProteusShow.displayName = "@optiaxiom/proteus/ProteusShow";
