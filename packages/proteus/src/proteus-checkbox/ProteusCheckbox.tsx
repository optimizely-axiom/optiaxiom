import { Checkbox, type CheckboxProps } from "@optiaxiom/react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { useProteusValue } from "../use-proteus-value";

export function ProteusCheckbox(props: CheckboxProps) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusCheckbox",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusCheckbox",
  );

  const dataValue = useProteusValue({ path: props.name ?? "" });

  return (
    <Checkbox
      {...props}
      checked={props.name ? Boolean(dataValue) : false}
      disabled={readOnly}
      onChange={(event) => {
        if (props.name) {
          onDataChange?.(`${parentPath}/${props.name}`, event.target.checked);
        }
      }}
    />
  );
}

ProteusCheckbox.displayName = "@optiaxiom/proteus/ProteusCheckbox";
