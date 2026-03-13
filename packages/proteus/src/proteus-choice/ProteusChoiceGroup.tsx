import type { ReactNode } from "react";

import { Group } from "@optiaxiom/react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { useProteusValue } from "../proteus-document/useProteusValue";
import * as styles from "./ProteusChoiceGroup.css";
import { ProteusChoiceGroupProvider } from "./ProteusChoiceGroupContext";

export type ProteusChoiceGroupProps = {
  children?: ReactNode;
  /**
   * Data field name for the selected value.
   */
  name?: string;
};

export function ProteusChoiceGroup({
  children,
  name,
}: ProteusChoiceGroupProps) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusChoiceGroup",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusChoiceGroup",
  );

  const resolved = useProteusValue({ path: name ?? "" });
  const value = name ? String(resolved ?? "") : "";

  return (
    <ProteusChoiceGroupProvider
      disabled={readOnly ?? false}
      name={name}
      onChange={(event) => {
        if (name) {
          onDataChange?.(`${parentPath}/${name}`, event.target.value);
        }
      }}
      value={value}
    >
      <Group {...styles.choiceGroup()}>{children}</Group>
    </ProteusChoiceGroupProvider>
  );
}

ProteusChoiceGroup.displayName = "@optiaxiom/proteus/ProteusChoiceGroup";
