import { Textarea, type TextareaProps } from "@optiaxiom/react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { useProteusValue } from "../use-proteus-value";

export function ProteusTextarea(props: TextareaProps) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusTextarea",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusTextarea",
  );

  const value = useProteusValue({ path: props.name ?? "" });

  return (
    <Textarea
      {...props}
      onValueChange={(value) => {
        if (props.name) {
          onDataChange?.(`${parentPath}/${props.name}`, value);
        }
      }}
      readOnly={readOnly}
      value={props.name ? String(value ?? "") : undefined}
    />
  );
}

ProteusTextarea.displayName = "@optiaxiom/proteus/ProteusTextarea";
