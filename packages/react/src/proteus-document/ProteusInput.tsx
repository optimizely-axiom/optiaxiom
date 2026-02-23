import type { ProteusInputProps } from "./schemas";

import { Input } from "../input";
import { useProteusDocumentContext } from "./ProteusDocumentContext";

export function ProteusInput(props: ProteusInputProps) {
  const { data, onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusInput",
  );

  return (
    <Input
      {...props}
      onValueChange={(value) => {
        if (props.name) {
          onDataChange?.(props.name, value);
        }
      }}
      readOnly={readOnly}
      value={props.name ? data[props.name] : ""}
    />
  );
}

ProteusInput.displayName = "@optiaxiom/react/ProteusInput";
