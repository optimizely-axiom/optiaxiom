import type { BlockInputProps } from "./schemas";

import { Input } from "../input";
import { useBlockDocumentContext } from "./BlockDocumentContext";

export function BlockInput({ onValueChange, ...props }: BlockInputProps) {
  const { data, onDataChange, onEvent, readOnly } = useBlockDocumentContext(
    "@optiaxiom/react/BlockInput",
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

BlockInput.displayName = "@optiaxiom/react/BlockInput";
