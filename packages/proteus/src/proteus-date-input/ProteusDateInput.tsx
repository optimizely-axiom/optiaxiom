import { DateInput, type DateInputProps } from "@optiaxiom/react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { useProteusValue } from "../use-proteus-value";

export function ProteusDateInput(props: DateInputProps) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusDateInput",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusDateInput",
  );

  const value = useProteusValue({ path: props.name ?? "" });

  return (
    <DateInput
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

ProteusDateInput.displayName = "@optiaxiom/proteus/ProteusDateInput";
