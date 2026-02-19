import type { BlockTextareaProps } from "./schemas";

import { Textarea } from "../textarea";
import { useBlockDocumentContext } from "./BlockDocumentContext";

export function BlockTextarea({ onValueChange, ...props }: BlockTextareaProps) {
  const { data, onDataChange, onEvent, readOnly } = useBlockDocumentContext(
    "@optiaxiom/react/BlockTextarea",
  );

  return (
    <Textarea
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
      value={props.name ? data[props.name] : undefined}
    />
  );
}

BlockTextarea.displayName = "@optiaxiom/react/BlockTextarea";
