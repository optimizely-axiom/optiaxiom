import type { ReactNode } from "react";

import { Group } from "@optiaxiom/react";

import * as styles from "./ProteusChoiceGroup.css";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { useProteusDocumentPathContext } from "./ProteusDocumentPathContext";
import { RadioGroupProvider } from "./RadioGroupContext";
import { useProteusValue } from "./useProteusValue";

export function ProteusChoiceGroup({
  children,
  name,
}: {
  children?: ReactNode;
  name?: string;
}) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusChoiceGroup",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/react/ProteusChoiceGroup",
  );

  const resolved = useProteusValue({ path: name ?? "" });
  const value = name ? String(resolved ?? "") : "";

  return (
    <RadioGroupProvider
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
    </RadioGroupProvider>
  );
}

ProteusChoiceGroup.displayName = "@optiaxiom/react/ProteusChoiceGroup";
