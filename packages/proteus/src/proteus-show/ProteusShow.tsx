import type { ReactNode } from "react";

import { useProteusDataTableRowContext } from "../proteus-document/ProteusDataTableRowContext";
import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import {
  evaluateCondition,
  type ProteusCondition,
} from "../proteus-document/resolveProteusValue";

export type ProteusShowProps = {
  children?: ReactNode;
  /**
   * Content to render when the condition is false. Omitting it renders nothing.
   */
  else?: ReactNode;
  /**
   * Single condition or array of conditions (AND logic). Each condition is an
   * object with one operator key.
   */
  when: ProteusCondition;
};

export function ProteusShow({
  children,
  else: fallback,
  when,
}: ProteusShowProps) {
  const { data } = useProteusDocumentContext("@optiaxiom/proteus/ProteusShow");
  const { mapIndices, path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusShow",
  );
  const { row: dataTableRow } = useProteusDataTableRowContext(
    "@optiaxiom/proteus/ProteusShow",
  );

  const conditions = Array.isArray(when) ? when : [when];
  // All conditions must be true (AND logic)
  const shouldShow = conditions.every((condition) =>
    evaluateCondition(condition, data, parentPath, mapIndices, dataTableRow),
  );

  return <>{shouldShow ? children : fallback}</>;
}

ProteusShow.displayName = "@optiaxiom/proteus/ProteusShow";
