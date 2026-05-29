import { Input, type InputProps } from "@optiaxiom/react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { useProteusValue } from "../use-proteus-value";

export function ProteusInput(props: InputProps) {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusInput",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusInput",
  );

  const value = useProteusValue({ path: props.name ?? "" });
  const writePath = props.name ? `${parentPath}/${props.name}` : parentPath;

  return (
    <Input
      {...props}
      onValueChange={(value) => {
        if (writePath) {
          onDataChange?.(writePath, value);
        }
      }}
      readOnly={readOnly}
      value={String(value ?? "")}
    />
  );
}

ProteusInput.displayName = "@optiaxiom/proteus/ProteusInput";
