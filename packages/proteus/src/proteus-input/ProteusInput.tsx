import { Input, type InputProps } from "@optiaxiom/react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { useProteusValue } from "../proteus-document/useProteusValue";

export function ProteusInput(props: InputProps) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusInput",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusInput",
  );

  const value = useProteusValue({ path: props.name ?? "" });

  return (
    <Input
      {...props}
      onValueChange={(value) => {
        if (props.name) {
          onDataChange?.(`${parentPath}/${props.name}`, value);
        }
      }}
      readOnly={readOnly}
      value={props.name ? String(value ?? "") : ""}
    />
  );
}

ProteusInput.displayName = "@optiaxiom/proteus/ProteusInput";
