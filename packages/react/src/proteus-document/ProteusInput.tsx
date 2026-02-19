import type { ProteusInputProps } from "./schemas";

import { Input } from "../input";
import { useProteusDocumentContext } from "./ProteusDocumentContext";

export function ProteusInput({ onValueChange, ...props }: ProteusInputProps) {
  const { data, onDataChange, onEvent, readOnly } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusInput",
  );

  return (
    <Input
      {...props}
      onValueChange={(value) => {
        if (props.name) {
          onDataChange?.(props.name, value);
        }
        if (onValueChange) {
          onEvent(onValueChange, value);
        }
      }}
      readOnly={readOnly}
      value={props.name ? data[props.name] : ""}
    />
  );
}

ProteusInput.displayName = "@optiaxiom/react/ProteusInput";
